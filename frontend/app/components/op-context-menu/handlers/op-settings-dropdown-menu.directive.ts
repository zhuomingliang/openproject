//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

import {Directive, ElementRef, Inject, Input, OnDestroy} from '@angular/core';
import {I18nToken} from 'core-app/angular4-transition-utils';
import {AuthorisationService} from 'core-components/common/model-auth/model-auth.service';
import {OpContextMenuTrigger} from 'core-components/op-context-menu/handlers/op-context-menu-trigger.directive';
import {OPContextMenuService} from 'core-components/op-context-menu/op-context-menu.service';
import {States} from 'core-components/states.service';
import {WorkPackagesListService} from 'core-components/wp-list/wp-list.service';
import {componentDestroyed} from 'ng2-rx-componentdestroyed';
import {takeUntil} from 'rxjs/operators';
import {QueryFormResource} from 'core-app/modules/hal/resources/query-form-resource';
import {QueryResource} from 'core-app/modules/hal/resources/query-resource';
import {OpModalService} from "core-components/op-modals/op-modal.service";
import {WpTableExportModal} from "core-components/modals/export-modal/wp-table-export.modal";
import {SaveQueryModal} from "core-components/modals/save-modal/save-query.modal";
import {QuerySharingModal} from "core-components/modals/share-modal/query-sharing.modal";
import {RenameQueryModal} from "core-components/modals/rename-query-modal/rename-query.modal";

@Directive({
  selector: '[opSettingsContextMenu]'
})
export class OpSettingsMenuDirective extends OpContextMenuTrigger implements OnDestroy {
  @Input('opSettingsContextMenu-query') public query:QueryResource;
  private form:QueryFormResource;
  private loadingPromise:PromiseLike<any>;

  constructor(readonly elementRef:ElementRef,
              readonly opContextMenu:OPContextMenuService,
              readonly opModalService:OpModalService,
              readonly wpListService:WorkPackagesListService,
              readonly authorisationService:AuthorisationService,
              readonly states:States,
              @Inject(I18nToken) readonly I18n:op.I18n) {

    super(elementRef, opContextMenu);
  }

  ngOnDestroy():void {
    // Nothing to do
  }

  ngAfterViewInit():void {
    super.ngAfterViewInit();

    this.states.query.resource.values$()
      .pipe(
        takeUntil(componentDestroyed(this))
      )
      .subscribe(queryUpdate => {
        this.query = queryUpdate;
      });

    this.loadingPromise = this.states.query.form.valuesPromise();

    this.states.query.form.values$()
      .pipe(
        takeUntil(componentDestroyed(this))
      )
      .subscribe(formUpdate => {
        this.form = formUpdate;
      });
  }

  protected open(evt:Event) {
    this.loadingPromise.then(() => {
      this.buildItems();
      this.opContextMenu.show(this, evt);
    });
  }

  public get locals() {
    return {
      contextMenuId: 'settingsDropdown',
      items: this.items
    };
  }

  /**
   * Positioning args for jquery-ui position.
   *
   * @param {Event} openerEvent
   */
  public positionArgs(openerEvent:Event) {
    return {
      my: 'right top',
      at: 'right bottom',
      of: this.$element
    };
  }

  private allowQueryAction(event:JQueryEventObject, action:any) {
    return this.allowAction(event, 'query', action);
  }

  private allowWorkPackageAction(event:JQueryEventObject, action:any) {
    return this.allowAction(event, 'work_packages', action);
  }

  private allowFormAction(event:JQueryEventObject, action:string) {
    if (this.form.$links[action]) {
      return true;
    } else {
      event.stopPropagation();
      return false;
    }
  }

  private allowAction(event:JQueryEventObject, modelName:string, action:any) {
    if (this.authorisationService.can(modelName, action)) {
      return true;
    } else {
      event.stopPropagation();
      return false;
    }
  }

  private buildItems() {
    this.items = [
      {
        // Query save modal
        disabled: this.authorisationService.cannot('query', 'updateImmediately'),
        linkText: this.I18n.t('js.toolbar.settings.save'),
        icon: 'icon-save',
        onClick: ($event:JQueryEventObject) => {
          const query = this.query;
          if (!query.id && this.allowQueryAction($event, 'updateImmediately')) {
            this.opModalService.show(SaveQueryModal);
          } else if (query.id && this.allowQueryAction($event, 'updateImmediately')) {
            this.wpListService.save(query);
          }

          return true;
        }
      },
      {
        // Query save as modal
        disabled: this.authorisationService.cannot('query', 'updateImmediately'),
        linkText: this.I18n.t('js.toolbar.settings.save_as'),
        icon: 'icon-save',
        onClick: ($event:JQueryEventObject) => {
          if (this.allowFormAction($event, 'commit')) {
            this.opModalService.show(SaveQueryModal);
          }

          return true;
        }
      },
      {
        // Delete query
        disabled: this.authorisationService.cannot('query', 'delete'),
        linkText: this.I18n.t('js.toolbar.settings.delete'),
        icon: 'icon-delete',
        onClick: ($event:JQueryEventObject) => {
          if (this.allowQueryAction($event, 'delete') &&
            window.confirm(this.I18n.t('js.text_query_destroy_confirmation'))) {
            this.wpListService.delete();
          }

          return true;
        }
      },
      {
        // Export query
        disabled: this.authorisationService.cannot('work_packages', 'representations'),
        linkText: this.I18n.t('js.toolbar.settings.export'),
        icon: 'icon-export',
        onClick: ($event:JQueryEventObject) => {
          if (this.allowWorkPackageAction($event, 'representations')) {
            this.opModalService.show(WpTableExportModal);
          }

          return true;
        }
      },
      {
        // Sharing modal
        disabled: this.authorisationService.cannot('query', 'unstar') && this.authorisationService.cannot('query', 'star'),
        linkText: this.I18n.t('js.toolbar.settings.publish'),
        icon: 'icon-publish',
        onClick: ($event:JQueryEventObject) => {
          if (this.allowQueryAction($event, 'unstar') || this.allowQueryAction($event, 'star')) {
            this.opModalService.show(QuerySharingModal);
          }

          return true;
        }
      },
      {
        // Settings modal
        disabled: !this.query.id || this.authorisationService.cannot('query', 'update'),
        linkText: this.I18n.t('js.toolbar.settings.page_settings'),
        icon: 'icon-settings',
        onClick: ($event:JQueryEventObject) => {
          if (this.allowQueryAction($event, 'update')) {
            this.opModalService.show(RenameQueryModal);
          }

          return true;
        }
      },
      {
        divider: true,
        hidden: !(this.query.results.customFields && this.form.configureForm)
      },
      {
        // Settings modal
        disabled: !this.query.results.customFields,
        href: this.query.results.customFields && this.query.results.customFields.href,
        linkText: this.query.results.customFields && this.query.results.customFields.name,
        icon: 'icon-custom-fields',
        onClick: () => false
      }
    ];
  }
}


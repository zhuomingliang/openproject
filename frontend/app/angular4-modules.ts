///<reference path="components/wp-custom-actions/wp-custom-actions.component.ts"/>
// -- copyright
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
// ++

import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {UpgradeModule} from '@angular/upgrade/static';
import {AccessibleByKeyboardDirectiveUpgraded} from 'core-app/ui_components/accessible-by-keyboard-directive-upgraded';
import {SimpleTemplateRenderer} from 'core-components/angular/simple-template-renderer';
import {GonRef} from 'core-components/common/gon-ref/gon-ref';
import {AddSectionDropdownComponent} from 'core-components/common/hide-section/add-section-dropdown/add-section-dropdown.component';
import {HideSectionLinkComponent} from 'core-components/common/hide-section/hide-section-link/hide-section-link.component';
import {HideSectionComponent} from 'core-components/common/hide-section/hide-section.component';
import {HideSectionService} from 'core-components/common/hide-section/hide-section.service';
import {OpIcon} from 'core-components/common/icon/op-icon';
import {LoadingIndicatorService} from 'core-components/common/loading-indicator/loading-indicator.service';
import {AuthorisationService} from 'core-components/common/model-auth/model-auth.service';
import {ContextMenuService} from 'core-components/context-menus/context-menu.service';
import {HasDropdownMenuDirective} from 'core-components/context-menus/has-dropdown-menu/has-dropdown-menu-directive';
import {WorkPackageFilterContainerComponent} from 'core-components/filters/filter-container/filter-container.directive';
import {Ng1QueryFiltersComponentWrapper} from 'core-components/filters/query-filters/query-filters-ng1-wrapper.component';
import {WorkPackageFiltersService} from 'core-components/filters/wp-filters/wp-filters.service';
import {WorkPackagesListComponent} from 'core-components/routing/wp-list/wp-list.component';
import {States} from 'core-components/states.service';
import {PaginationService} from 'core-components/table-pagination/pagination-service';
import {TablePaginationComponent} from 'core-components/table-pagination/table-pagination.component';
import {WorkPackageCacheService} from 'core-components/work-packages/work-package-cache.service';
import {WorkPackageCreateButtonComponent} from 'core-components/wp-buttons/wp-create-button/wp-create-button.component';
import {WorkPackageDetailsViewButtonComponent} from 'core-components/wp-buttons/wp-details-view-button/wp-details-view-button.component';
import {WorkPackageFilterButtonComponent} from 'core-components/wp-buttons/wp-filter-button/wp-filter-button.directive';
import {WorkPackageTimelineButtonComponent} from 'core-components/wp-buttons/wp-timeline-toggle-button/wp-timeline-toggle-button.component';
import {WorkPackageZenModeButtonComponent} from 'core-components/wp-buttons/wp-zen-mode-toggle-button/wp-zen-mode-toggle-button.component';
import {WpCustomActionsComponent} from 'core-components/wp-custom-actions/wp-custom-actions.component';
import {WpCustomActionComponent} from 'core-components/wp-custom-actions/wp-custom-actions/wp-custom-action.component';
import {WorkPackageDisplayFieldService} from 'core-components/wp-display/wp-display-field/wp-display-field.service';
import {WorkPackageEditingService} from 'core-components/wp-edit-form/work-package-editing-service';
import {WorkPackageNotificationService} from 'core-components/wp-edit/wp-notification.service';
import {WorkPackageTableColumnsService} from 'core-components/wp-fast-table/state/wp-table-columns.service';
import {WorkPackageTableFiltersService} from 'core-components/wp-fast-table/state/wp-table-filters.service';
import {WorkPackageTableFocusService} from 'core-components/wp-fast-table/state/wp-table-focus.service';
import {WorkPackageTableGroupByService} from 'core-components/wp-fast-table/state/wp-table-group-by.service';
import {WorkPackageTableHierarchiesService} from 'core-components/wp-fast-table/state/wp-table-hierarchy.service';
import {WorkPackageTablePaginationService} from 'core-components/wp-fast-table/state/wp-table-pagination.service';
import {WorkPackageTableRelationColumnsService} from 'core-components/wp-fast-table/state/wp-table-relation-columns.service';
import {WorkPackageTableSelection} from 'core-components/wp-fast-table/state/wp-table-selection.service';
import {WorkPackageTableSortByService} from 'core-components/wp-fast-table/state/wp-table-sort-by.service';
import {WorkPackageTableSumService} from 'core-components/wp-fast-table/state/wp-table-sum.service';
import {WorkPackageTableTimelineService} from 'core-components/wp-fast-table/state/wp-table-timeline.service';
import {WpInlineCreateDirectiveUpgraded} from 'core-components/wp-inline-create/wp-inline-create.directive';
import {WorkPackagesListChecksumService} from 'core-components/wp-list/wp-list-checksum.service';
import {WorkPackagesListService} from 'core-components/wp-list/wp-list.service';
import {KeepTabService} from 'core-components/wp-panels/keep-tab/keep-tab.service';
import {WorkPackageRelationsService} from 'core-components/wp-relations/wp-relations.service';
import {WpResizerDirectiveUpgraded} from 'core-components/wp-resizer/wp-resizer.directive';
import {SortHeaderDirective} from 'core-components/wp-table/sort-header/sort-header.directive';
import {WorkPackageTablePaginationComponent} from 'core-components/wp-table/table-pagination/wp-table-pagination.component';
import {WorkPackageTimelineTableController} from 'core-components/wp-table/timeline/container/wp-timeline-container.directive';
import {WorkPackageTableTimelineRelations} from 'core-components/wp-table/timeline/global-elements/wp-timeline-relations.directive';
import {WorkPackageTableTimelineStaticElements} from 'core-components/wp-table/timeline/global-elements/wp-timeline-static-elements.directive';
import {WorkPackageTableTimelineGrid} from 'core-components/wp-table/timeline/grid/wp-timeline-grid.directive';
import {WorkPackageTimelineHeaderController} from 'core-components/wp-table/timeline/header/wp-timeline-header.directive';
import {WorkPackageTableRefreshService} from 'core-components/wp-table/wp-table-refresh-request.service';
import {WorkPackageTableSumsRowController} from 'core-components/wp-table/wp-table-sums-row/wp-table-sums-row.directive';
import {WorkPackagesTableController,} from 'core-components/wp-table/wp-table.directive';
import {
  $qToken,
  $rootScopeToken,
  $stateToken,
  $timeoutToken,
  columnsModalToken,
  FocusHelperToken,
  halRequestToken,
  I18nToken,
  NotificationsServiceToken,
  PathHelperToken,
  upgradeService,
  upgradeServiceWithToken
} from './angular4-transition-utils';


@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    FormsModule
  ],
  providers: [
    GonRef,
    HideSectionService,
    upgradeServiceWithToken($rootScopeFactory, $rootScopeToken),
    upgradeServiceWithToken(I18nFactory, I18nToken),
    upgradeServiceWithToken($stateFactory, $stateToken),
    upgradeServiceWithToken($qFactory, $qToken),
    upgradeServiceWithToken($timeoutFactory, $timeoutToken),
    upgradeServiceWithToken(NotificationsServiceFactory, NotificationsServiceToken),
    upgradeServiceWithToken(columnsModalFactory, columnsModalToken),
    upgradeServiceWithToken(FocusHelperFactory, FocusHelperToken),
    upgradeServiceWithToken(PathHelperFactory, PathHelperToken),
    upgradeServiceWithToken(halRequestFactory, halRequestToken),
    upgradeService(wpRelationsFactory, WorkPackageRelationsService),
    upgradeService(wpCacheServiceFactory, WorkPackageCacheService),
    upgradeService(wpEditingFactory, WorkPackageEditingService),
    upgradeService(statesFactory, States),
    upgradeService(paginationServiceFactory, PaginationService),
    upgradeService(keepTabFactory, KeepTabService),
    upgradeService(wpTableSelectionFactory, WorkPackageTableSelection),
    upgradeService(wpTableFocusFactory, WorkPackageTableFocusService),
    upgradeService(wpTablePaginationFactory, WorkPackageTablePaginationService),
    upgradeService(templateRendererFactory, SimpleTemplateRenderer),
    upgradeService(wpTableRefreshFactory, WorkPackageTableRefreshService),
    upgradeService(wpDisplayFieldFactory, WorkPackageDisplayFieldService),
    upgradeService(wpTableTimelineFactory, WorkPackageTableTimelineService),
    upgradeService(wpNotificationsServiceFactory, WorkPackageNotificationService),
    upgradeService(wpTableHierarchiesFactory, WorkPackageTableHierarchiesService),
    upgradeService(wpTableSortByFactory, WorkPackageTableSortByService),
    upgradeService(wpTableFiltersFactory, WorkPackageTableFiltersService),
    upgradeService(wpTableSumFactory, WorkPackageTableSumService),
    upgradeService(wpListServiceFactory, WorkPackagesListService),
    upgradeService(wpListChecksumServiceFactory, WorkPackagesListChecksumService),
    upgradeService(wpFiltersServiceFactory, WorkPackageFiltersService),
    upgradeService(loadingIndicatorFactory, LoadingIndicatorService),
    upgradeService(wpTableRelationColumnsFactory, WorkPackageTableRelationColumnsService),
    upgradeService(wpTableGroupByFactory, WorkPackageTableGroupByService),
    upgradeService(wpTableColumnsFactory, WorkPackageTableColumnsService),
    upgradeService(contextMenuFactory, ContextMenuService),
    upgradeService(authorisationServiceFactory, AuthorisationService),
  ],
  declarations: [
    WorkPackagesListComponent,
    OpIcon,
    AccessibleByKeyboardDirectiveUpgraded,
    TablePaginationComponent,
    WorkPackageTablePaginationComponent,
    WorkPackageTimelineHeaderController,
    WorkPackageTableTimelineRelations,
    WorkPackageTableTimelineStaticElements,
    WorkPackageTableTimelineGrid,
    WorkPackageTimelineTableController,
    WorkPackagesTableController,
    WorkPackageCreateButtonComponent,
    WorkPackageFilterButtonComponent,
    WorkPackageDetailsViewButtonComponent,
    WorkPackageTimelineButtonComponent,
    WorkPackageZenModeButtonComponent,
    WorkPackageFilterContainerComponent,
    Ng1QueryFiltersComponentWrapper,
    WpResizerDirectiveUpgraded,
    WpCustomActionComponent,
    WpCustomActionsComponent,
    WorkPackageTableSumsRowController,
    SortHeaderDirective,
    HasDropdownMenuDirective,
    WpInlineCreateDirectiveUpgraded,
    HideSectionComponent,
    HideSectionLinkComponent,
    AddSectionDropdownComponent
  ],
  entryComponents: [
    WorkPackagesListComponent,
    WorkPackageTablePaginationComponent,
    WorkPackagesTableController,
    TablePaginationComponent,
    WpCustomActionsComponent,
    HideSectionComponent,
    HideSectionLinkComponent,
    AddSectionDropdownComponent
  ]
})
export class OpenProjectModule {
  constructor(private upgrade:UpgradeModule) {
  }

  // noinspection JSUnusedGlobalSymbols
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['openproject'], {strictDi: false});
  }
}

export function $rootScopeFactory(i:any) {
  return i.get('$rootScope');
}

export function I18nFactory(i:any) {
  return i.get('I18n');
}

export function $stateFactory(i:any) {
  return i.get('$state');
}

export function $qFactory(i:any) {
  return i.get('$q');
}

export function $timeoutFactory(i:any) {
  return i.get('$timeout');
}

export function NotificationsServiceFactory(i:any) {
  return i.get('NotificationsService');
}

export function columnsModalFactory(i:any) {
  return i.get('columnsModal');
}

export function FocusHelperFactory(i:any) {
  return i.get('FocusHelper');
}

export function PathHelperFactory(i:any) {
  return i.get('PathHelper');
}

export function halRequestFactory(i:any) {
  return i.get('halRequest');
}


export function wpRelationsFactory(i:any) {
  return i.get('wpRelations');
}

export function wpCacheServiceFactory(i:any) {
  return i.get('wpCacheService');
}

export function wpEditingFactory(i:any) {
  return i.get('wpEditing');
}

export function statesFactory(i:any) {
  return i.get('states');
}

export function paginationServiceFactory(i:any) {
  return i.get('paginationService');
}

export function keepTabFactory(i:any) {
  return i.get('keepTab');
}

export function wpTableSelectionFactory(i:any) {
  return i.get('wpTableSelection');
}

export function wpTableFocusFactory(i:any) {
  return i.get('wpTableFocus');
}

export function wpTablePaginationFactory(i:any) {
  return i.get('wpTablePagination');
}

export function templateRendererFactory(i:any) {
  return i.get('templateRenderer');
}

export function wpTableRefreshFactory(i:any) {
  return i.get('wpTableRefresh');
}

export function wpDisplayFieldFactory(i:any) {
  return i.get('wpDisplayField');
}

export function wpTableTimelineFactory(i:any) {
  return i.get('wpTableTimeline');
}

export function wpNotificationsServiceFactory(i:any) {
  return i.get('wpNotificationsService');
}

export function wpTableHierarchiesFactory(i:any) {
  return i.get('wpTableHierarchies');
}

export function wpTableSortByFactory(i:any) {
  return i.get('wpTableSortBy');
}

export function wpTableFiltersFactory(i:any) {
  return i.get('wpTableFilters');
}

export function wpTableSumFactory(i:any) {
  return i.get('wpTableSum');
}

export function wpListServiceFactory(i:any) {
  return i.get('wpListService');
}

export function wpListChecksumServiceFactory(i:any) {
  return i.get('wpListChecksumService');
}

export function wpFiltersServiceFactory(i:any) {
  return i.get('wpFiltersService');
}

export function loadingIndicatorFactory(i:any) {
  return i.get('loadingIndicator');
}

export function wpTableRelationColumnsFactory(i:any) {
  return i.get('wpTableRelationColumns');
}

export function wpTableGroupByFactory(i:any) {
  return i.get('wpTableGroupBy');
}

export function wpTableColumnsFactory(i:any) {
  return i.get('wpTableColumns');
}

export function contextMenuFactory(i:any) {
  return i.get('contextMenu');
}

export function authorisationServiceFactory(i:any) {
  return i.get('authorisationService');
}


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

import {WorkPackageCacheService} from '../../work-packages/work-package-cache.service';
import {WorkPackageResource} from 'core-app/modules/hal/resources/work-package-resource';
import {WorkPackageNotificationService} from 'core-components/wp-edit/wp-notification.service';
import {States} from '../../states.service';
import {WorkPackageTableRefreshService} from '../../wp-table/wp-table-refresh-request.service';
import {StateService} from '@uirouter/core';
import {$stateToken} from 'core-app/angular4-transition-utils';
import {Inject, Injectable} from '@angular/core';
import {PathHelperService} from 'core-components/common/path-helper/path-helper.service';
import {opServicesModule} from 'core-app/angular-modules';
import {downgradeInjectable} from '@angular/upgrade/static';

@Injectable()
export class WorkPackageRelationsHierarchyService {
  constructor(@Inject($stateToken) protected $state:StateService,
              protected states:States,
              protected wpTableRefresh:WorkPackageTableRefreshService,
              protected wpNotificationsService:WorkPackageNotificationService,
              protected pathHelper:PathHelperService,
              protected wpCacheService:WorkPackageCacheService) {

  }

  public async changeParent(workPackage:WorkPackageResource, parentId:string | null) {
    let payload:any = {
      lockVersion: workPackage.lockVersion
    };

    if (parentId) {
      payload['_links'] = {
        parent: {
            href: this.pathHelper.api.v3.work_packages.id(parentId).toString()
        }
      };
    } else {
      payload['_links'] = {
        parent: {
            href: null
        }
      };
    }

    return workPackage
      .changeParent(payload)
      .then((wp:WorkPackageResource) => {
        this.wpCacheService.updateWorkPackage(wp);
        this.wpNotificationsService.showSave(wp);
        this.wpTableRefresh.request(`Changed parent of ${workPackage.id} to ${parentId}`, true);
        return wp;
      })
      .catch(async (error) => {
        this.wpNotificationsService.handleErrorResponse(error, workPackage);
        return Promise.reject(error);
      });
  }

  public async removeParent(workPackage:WorkPackageResource) {
    return this.changeParent(workPackage, null);
  }

  public async addExistingChildWp(workPackage:WorkPackageResource, childWpId:string):Promise<WorkPackageResource> {
    const state = this.wpCacheService.loadWorkPackage(childWpId);

    return new Promise<WorkPackageResource>((resolve, reject) => {
      state.valuesPromise().then(async (wpToBecomeChild:WorkPackageResource|undefined) => {
        this.wpTableRefresh.request(`Added new child to ${workPackage.id}`, true);

        return this.changeParent(wpToBecomeChild!, workPackage.id)
          .then(wp => resolve(wp))
          .catch(reject);
      });
    });
  }

  public addNewChildWp(workPackage:WorkPackageResource) {
    workPackage.project.$load()
      .then(() => {
        const args = [
          'work-packages.list.new',
          {
            parent_id: workPackage.id
          }
        ];

        if (this.$state.includes('work-packages.show')) {
          args[0] = 'work-packages.new';
        }

        (<any>this.$state).go(...args);
      });
  }

  public async removeChild(childWorkPackage:WorkPackageResource) {
    return childWorkPackage.$load().then(async () => {
      return childWorkPackage.changeParent({
        _links: {
          parent: {
              href: null
          }
        },
        lockVersion: childWorkPackage.lockVersion
      }).then(wp => {
        this.wpCacheService.updateWorkPackage(wp);
      })
      .catch(async (error) => {
        this.wpNotificationsService.handleErrorResponse(error, childWorkPackage);
        return Promise.reject(error);
      });
    });
  }
}

opServicesModule.service('wpRelationsHierarchyService', downgradeInjectable(WorkPackageRelationsHierarchyService));

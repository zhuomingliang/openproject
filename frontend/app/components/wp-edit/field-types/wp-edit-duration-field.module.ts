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

import {EditField} from "../wp-edit-field/wp-edit-field.module";
import moment = require('moment');
import {I18nToken} from 'core-app/angular4-transition-utils';
import {TimezoneService} from 'core-components/datetime/timezone.service';

export class DurationEditField extends EditField {

  readonly TimezoneService:TimezoneService = this.$injector.get(TimezoneService);

  protected parseValue(val:moment.Moment|null) {
    return val === null ? null : val.toISOString();
  }

  public template:string = '/components/wp-edit/field-types/wp-edit-duration-field.directive.html';
}

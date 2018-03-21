import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Managers } from '@platform/resources';

@Injectable()

export class ManagersResolver implements Resolve<any> {

    constructor(
      private managers: Managers,
    ) {}

    resolve(): Observable<any> {
      return this.managers.getList();
    }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Services } from '@platform/resources';

@Injectable()

export class ServicesResolver implements Resolve<any> {

    constructor(
      private services: Services,
    ) {}

    resolve(): Observable<any> {
      return this.services.getList();
    }
}

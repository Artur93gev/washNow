import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Cars } from '@platform/resources';

@Injectable()

export class CarsResolver implements Resolve<any> {

    constructor(
      private cars: Cars,
    ) {}

    resolve(): Observable<any> {
      return this.cars.getList();
    }
}

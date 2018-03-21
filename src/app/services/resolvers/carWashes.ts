import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import {
  CarWashes,
  Managers,
} from '@platform/resources';

@Injectable()

export class CarWashesResolver implements Resolve<any> {

    constructor(
      private carWashes: CarWashes,
      private managers: Managers,
    ) {}

    resolve(): Observable<any> {
      return Observable.forkJoin([this.carWashes.getList(), this.managers.getList()]);
    }
}

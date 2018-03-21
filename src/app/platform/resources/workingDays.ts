import { Injectable } from '@angular/core';
import { Connection } from '../services';

import { Observable } from 'rxjs/Rx';

import { CarWashes } from './carWashes';
import { CRUDRelated } from '../common';

@Injectable()
export class WorkingDays extends CRUDRelated {

  constructor(
    connection: Connection,
    private carWashes: CarWashes,
  ) {
    super(connection, 'car_washes', 'working_days');
  }

  public getList(id: string): Observable<any> {
    return this.carWashes.getItem(id).map((res) => res && res.value && res.value.working_days || []);
  }
}

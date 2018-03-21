import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Washers } from '@platform/resources';

import { CarWashesService } from '../index';

@Injectable()

export class CarWashWashersResolver implements Resolve<any> {
  
  constructor(
    private washers: Washers,
    private carWashesService: CarWashesService,
  ) {}
  
  resolve(): Observable<any> {
    return this.washers.getList(this.carWashesService.activeCarWash._id);
  }
}
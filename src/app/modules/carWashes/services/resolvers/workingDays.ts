import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { WorkingDays } from '@platform/resources';

import { CarWashesService } from '../index';

@Injectable()

export class CarWashWorkingDaysResolver implements Resolve<any> {
  
  constructor(
    private workingDays: WorkingDays,
    private carWashesService: CarWashesService,
  ) {}
  
  resolve(): Observable<any> {
    return this.workingDays.getList(this.carWashesService.activeCarWash._id);
  }
}
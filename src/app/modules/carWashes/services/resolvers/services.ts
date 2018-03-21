import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { WasherServices } from '@platform/resources';

import { CarWashesService } from '../index';

@Injectable()

export class CarWashServicesResolver implements Resolve<any> {
  
  constructor(
    private washerServices: WasherServices,
    private carWashesService: CarWashesService,
  ) {}
  
  resolve(): Observable<any> {
    return this.washerServices.getList(this.carWashesService.activeCarWash._id);
  }
}
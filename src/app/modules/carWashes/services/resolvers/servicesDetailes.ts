import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { Services } from '@platform/resources';

import { CarWashesService } from '../index';

@Injectable()
export class CarWashServicesDetailesResolver implements Resolve<any> {
  
  constructor(
    private services: Services,
    private carWashesService: CarWashesService,
  ) {}
  
  resolve(): Observable<any> {
    return this.services.getList();
  }
}
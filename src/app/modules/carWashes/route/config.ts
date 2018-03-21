import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CarWashWashersResolver,
  CarWashDetailesResolver,
  CarWashServicesResolver,
  CarWashWorkingDaysResolver,
  CarWashServicesDetailesResolver,
} from '../services/resolvers';
import { CarWashes } from '../controller';
import { CarWashDetailes } from '../components/detailes';
import { CarWashServices } from '../components/washServices';
import { CarWashServicesDetailes } from '../components/washServices/components/detailes';
import { CarWashWashers } from '../components/washers';
import { CarWashWashesDetailes } from '../components/washers/components/detailes';
import { CarWashWorkingDays } from '../components/workingDays';
import { CarWashWorkingDaysDetailes } from '../components/workingDays/components/detailes';

const routes: Routes = [
  {
    path : '',
    children: [
      {
        path: '',
        component : CarWashes,
      },
      {
        path: ':id',
        component: CarWashDetailes,
        resolve: {
          data: CarWashDetailesResolver,
        },
      },
      {
        path: 'create',
        component: CarWashDetailes,
        resolve: {
          data: CarWashDetailesResolver,
        },
      },
      {
        path: ':id/services',
        component: CarWashServices,
        resolve: {
          data: CarWashServicesResolver,
        },
      },
      {
        path: ':id/services/:id',
        component: CarWashServicesDetailes,
        resolve: {
          data: CarWashServicesDetailesResolver,
        },
      },
      {
        path: ':id/services/create',
        component: CarWashServicesDetailes,
        resolve: {
          data: CarWashServicesDetailesResolver,
        },
      },
      {
        path: ':id/washers',
        component: CarWashWashers,
        resolve: {
          data: CarWashWashersResolver,
        },
      },
      {
        path: ':id/washers/:id',
        component: CarWashWashesDetailes,
      },
      {
        path: ':id/washers/create',
        component: CarWashWashesDetailes,
      },
      {
        path: ':id/working-days',
        component: CarWashWorkingDays,
        resolve: {
          data: CarWashWorkingDaysResolver,
        },
      },
      {
        path: ':id/working-days/:id',
        component: CarWashWorkingDaysDetailes,
      },
      {
        path: ':id/working-days/create',
        component: CarWashWorkingDaysDetailes,
      },
    ],
  },
];

@NgModule({
  imports : [
    RouterModule.forChild(routes),
  ],
  exports : [
    RouterModule,
  ],
})

export class Router {
}

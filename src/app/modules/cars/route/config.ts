import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Cars } from '../controller';
import { CarDetailes } from '../components/detailes';

const routes: Routes = [
  {
    path : '',
    children: [
      {
        path: '',
        component : Cars,
      },
      {
        path: ':id',
        component: CarDetailes,
      },
      {
        path: 'create',
        component: CarDetailes,
      }
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

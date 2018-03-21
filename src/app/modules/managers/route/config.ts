import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Managers } from '../controller';
import { ManagerDetailes } from '../components/detailes';

const routes: Routes = [
  {
    path : '',
    children: [
      {
        path: '',
        component : Managers,
      },
      {
        path: ':id',
        component: ManagerDetailes,
      },
      {
        path: 'create',
        component: ManagerDetailes,
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

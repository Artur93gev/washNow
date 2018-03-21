import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Services } from '../controller';
import { ServicesDetailes } from '../components/detailes';

const routes: Routes = [
  {
    path : '',
    children: [
      {
        path: '',
        component : Services,
      },
      {
        path: ':id',
        component: ServicesDetailes,
      },
      {
        path: 'create',
        component: ServicesDetailes,
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

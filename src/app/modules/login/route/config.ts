import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from '../controller';

const routes: Routes = [
  {
    path : '',
    component : Login
  }
];

@NgModule({
  imports : [
    RouterModule.forChild(routes)
  ],
  exports : [
    RouterModule
  ]
})

export class Router {

}
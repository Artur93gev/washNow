import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
} from '@angular/material';

import { Router } from './route/config';
import { Cars } from './controller';
import { CarDetailes } from './components/detailes';
import { CarsService } from './services';

@NgModule({
  imports: [
    Router,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    Router,
  ],
  declarations: [
    Cars,
    CarDetailes,
  ],
  providers: [
    CarsService,
  ],
})

export class CarsModule {

}

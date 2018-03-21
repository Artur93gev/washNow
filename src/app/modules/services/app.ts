import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
} from '@angular/material';

import { Router } from './route/config';
import { Services } from './controller';
import { ServicesDetailes } from './components/detailes';
import { ServicesService } from './services';

@NgModule({
  imports: [
    Router,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    Router,
  ],
  declarations: [
    Services,
    ServicesDetailes,
  ],
  providers: [
    ServicesService,
  ]
})

export class ServicesModule {

}

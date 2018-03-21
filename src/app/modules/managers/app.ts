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

import { FileUploaderModule } from '@platform/sharedModules';

import { Router } from './route/config';
import { Managers } from './controller';
import { ManagerDetailes } from './components/detailes';
import { ManagersService } from './services';

@NgModule({
  imports: [
    Router,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FileUploaderModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    Router,
  ],
  declarations: [
    Managers,
    ManagerDetailes,
  ],
  providers: [
    ManagersService,
  ],
})

export class ManagersModule {

}

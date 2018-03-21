import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatAutocompleteModule,
} from '@angular/material';

import { Router } from './route/config';
import { Login } from './controller';

@NgModule({
  imports: [
    Router,
    FormsModule,
    CommonModule,

    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatAutocompleteModule,
  ],
  exports: [
    Router,
  ],
  declarations: [
    Login,
  ]
})

export class LoginModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSelectModule,
  MatMenuModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatExpansionModule,
} from '@angular/material';

import { Search } from '../components/search/index';
// import { TranslateSharedModule } from "./translate";

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
      // TranslateSharedModule,
  ],
  exports: [
    Search,
  ],
  declarations : [
    Search,
  ]
})
export class SearchModule {
}

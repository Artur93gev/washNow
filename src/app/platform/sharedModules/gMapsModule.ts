import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GMaps } from '../components/gmaps';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    GMaps,
  ],
  declarations : [
    GMaps,
  ],
})

export class GMapsModule {
}

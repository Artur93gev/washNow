import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Loader } from '../components/loader';

@NgModule({
  imports: [
    MatProgressSpinnerModule
  ],
  exports: [
    Loader
  ],
  declarations : [
    Loader
  ]
})

export class LoaderModule {

}
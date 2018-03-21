import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileUploader } from '../components/fileUpload';
// import {TranslateSharedModule} from './translate'
import {
    MatButtonModule,
} from '@angular/material'
@NgModule({
  imports: [
    CommonModule,
      MatButtonModule,
      // TranslateSharedModule,
  ],
  exports: [
    FileUploader,
  ],
  declarations : [
    FileUploader,
  ],
})

export class FileUploaderModule {
}

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

import {
  FileUploaderModule,
  GMapsModule,
} from '@platform/sharedModules';

import { Router } from './route/config';
import { CarWashes } from './controller';
import { CarWashDetailes } from './components/detailes';
import { CarWashServices } from './components/washServices';
import { CarWashWashers } from './components/washers';
import { CarWashWorkingDays } from './components/workingDays';
import { CarWashServicesDetailes } from './components/washServices/components/detailes';
import { CarWashWashesDetailes } from './components/washers/components/detailes';
import { CarWashWorkingDaysDetailes } from './components/workingDays/components/detailes';

import { CarWashesService } from './services';
import {
  CarWashWashersResolver,
  CarWashDetailesResolver,
  CarWashServicesResolver,
  CarWashWorkingDaysResolver,
  CarWashServicesDetailesResolver,
} from './services/resolvers';

@NgModule({
  imports: [
    Router,
    GMapsModule,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FileUploaderModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    Router,
  ],
  declarations: [
    CarWashes,
    CarWashWashers,
    CarWashServices,
    CarWashDetailes,
    CarWashWorkingDays,
    CarWashWashesDetailes,
    CarWashServicesDetailes,
    CarWashWorkingDaysDetailes,
  ],
  providers: [
    CarWashesService,
    CarWashWashersResolver,
    CarWashDetailesResolver,
    CarWashServicesResolver,
    CarWashWorkingDaysResolver,
    CarWashServicesDetailesResolver,
  ],
})

export class CarWashesModule {

}

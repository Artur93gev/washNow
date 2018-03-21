import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

import { Dispatcher } from '@platform/services';
import { WasherServices } from '@platform/resources';
import { carTypes } from '@platform/constants';
import { unsubscriber } from '@platform/helpers';

import { CarWashesService } from '../../../../services';

@Component({
  templateUrl: './view/index.html',
  styleUrls: ['./sass/index.scss']
})

export class CarWashServicesDetailes implements OnInit, OnDestroy {
  public isEdit: boolean;
  public washService: any = {};
  public formGroup: FormGroup;
  public carTypes = carTypes;
  public services: Array<any> = new Array();
  private channels: Array<Subscription> = new Array();

  constructor(
    private washerServices: WasherServices,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dispatcher: Dispatcher,
    private carWashesService: CarWashesService,
    private formBuilder: FormBuilder,
  ) {
    this.isEdit = !!this.carWashesService.activeWasherService;
    if (this.isEdit) {
      this.washService = this.carWashesService.activeWasherService;
    }

    this.channels.push(
      this.activatedRoute.data.subscribe((res: any) => {
        if (res && res.data && res.data.value) {
          this.services = res.data.value;
        }
      })
    );
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [
        this.washService.name || '',
        Validators.required,
      ],
      car_type: [
        this.washService.car_type || '',
        Validators.required,
      ],
      price: [
        this.washService.price || '',
        Validators.compose([
          Validators.required,
          Validators.min(0),
        ]),
      ]
    });
  }

  public goBackToCarsWashes(event?: Event): void {
    event && event.stopPropagation();
    this.router.navigate([`car-washes/${this.carWashesService.activeCarWash._id}/services`]);
  }

  public submit(event?: Event): void {
    event && event.stopPropagation();
    const callBack = this.isEdit ?
      this.washerServices.updateItem(this.carWashesService.activeCarWash._id, this.washService._id, this.formGroup.value) :
      this.washerServices.create(this.carWashesService.activeCarWash._id, this.formGroup.value);

    callBack.subscribe((res: any) => {
      if (res && res.value) {
        this.goBackToCarsWashes();
      }
    });
  }

  ngOnDestroy() {
    unsubscriber(this.channels);
  }
}
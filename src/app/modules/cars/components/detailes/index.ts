import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Dispatcher } from '@platform/services';
import { Cars } from '@platform/resources';

import { CarsService } from '../../services';

@Component({
  templateUrl: './view/index.html',
  styleUrls: ['./sass/index.scss']
})

export class CarDetailes implements OnInit {
  public isEdit: boolean;
  public car: any = {};
  public formGroup: FormGroup;

  constructor(
    private cars: Cars,
    private router: Router,
    private dispatcher: Dispatcher,
    private carsService: CarsService,
    private formBuilder: FormBuilder,
  ) {
    this.isEdit = !!this.carsService.activeCar;
    if (this.isEdit) {
      this.car = this.carsService.activeCar;
    }
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      make: [
        this.car.make || '',
        Validators.required,
      ],
      images: [
        []
      ]
    });
  }


  public goBackToCarsCards(event?: Event): void {
    event && event.stopPropagation();
    this.router.navigate(['cars']);
  }

  public submit(event?: Event): void {
    event && event.stopPropagation();
    const callBack = this.isEdit ?
      this.cars.updateItem(this.car._id, this.formGroup.value) :
      this.cars.create(this.formGroup.value);

    callBack.subscribe((res: any) => {
      if (res && res.value) {
        this.goBackToCarsCards();
      }
    });
  }
}
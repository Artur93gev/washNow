import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { Dispatcher } from '@platform/services';
import { WorkingDays } from '@platform/resources';
import { daysOfWeek } from '@platform/constants';

import { CarWashesService } from '../../../../services';

@Component({
  templateUrl: './view/index.html',
  styleUrls: ['./sass/index.scss']
})

export class CarWashWorkingDaysDetailes implements OnInit {
  public isEdit: boolean;
  public workingDay: any = {};
  public formGroup: FormGroup;
  public days = daysOfWeek;

  constructor(
    private workingDays: WorkingDays,
    private router: Router,
    private dispatcher: Dispatcher,
    private carWashesService: CarWashesService,
    private formBuilder: FormBuilder,
  ) {
    this.isEdit = !!this.carWashesService.activeWorkingDays;
    if (this.isEdit) {
      this.workingDay = this.carWashesService.activeWorkingDays;
      console.log(this.workingDay);
    }
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      day: [
        this.workingDay.day || '',
        Validators.required,
      ],
      from: [
        this.workingDay.from || '',
        Validators.required,
        (control: FormGroup): Observable<any> => {
          if (this.formGroup && typeof this.formGroup.value.to === 'number' && this.formGroup.value.to < control.value || control.value < 0) {
            return Observable.of({"number": true});
          }
          return Observable.of(null);
        }
      ],
      to: [
        this.workingDay.to || '',
        Validators.required,
        (control: FormGroup): Observable<any> => {
          if (this.formGroup && typeof this.formGroup.value.from === 'number' && this.formGroup.value.from > control.value || control.value > 23) {
            return Observable.of({"number": true});
          }
          return Observable.of(null);
        }
      ],
    });
  }

  public goBackToCarsWashes(event?: Event): void {
    event && event.stopPropagation();
    this.router.navigate([`car-washes/${this.carWashesService.activeCarWash._id}/working-days`]);
  }

  public submit(event?: Event): void {
    event && event.stopPropagation();

    const callBack = this.isEdit ?
      this.workingDays.updateItem(this.carWashesService.activeCarWash._id, this.workingDay._id, this.formGroup.value) :
      this.workingDays.create(this.carWashesService.activeCarWash._id, this.formGroup.value);

    callBack.subscribe((res: any) => {
      if (res && res.value) {
        this.goBackToCarsWashes();
      }
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import { Dispatcher } from '@platform/services';
import { Washers } from '@platform/resources';

import { CarWashesService } from '../../../../services';

@Component({
  templateUrl: './view/index.html',
  styleUrls: ['./sass/index.scss']
})

export class CarWashWashesDetailes implements OnInit {
  public isEdit: boolean;
  public wash: any = {};
  public formGroup: FormGroup;
  
  public phoneNumber: any;
  public phones: Array<string> = new Array();

  constructor(
    private washers: Washers,
    private router: Router,
    private dispatcher: Dispatcher,
    private carWashesService: CarWashesService,
    private formBuilder: FormBuilder,
  ) {
    this.isEdit = !!this.carWashesService.activeWasher;
    if (this.isEdit) {
      this.wash = this.carWashesService.activeWasher;
    }
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: [
        this.wash.username || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
        ]),
      ],
      password: [
        this.wash.password || '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]{8,30}$/),
        ]),
      ],
      first_name: this.wash.first_name || '',
      last_name: this.wash.last_name || '',
      phoneNumber: [
        this.wash.phones && this.wash.phones[0] || '',
        Validators.compose([
        ]),
        (control: any): Observable<any> => {
          if (!control.value && this.phones.length) {
            return Observable.of(null);
          }
          if (control.value && control.value.match(/^[0-9]{6,9}$/)) {
            return Observable.of(null);
          }
          return Observable.of({"string": true});
        }
      ]
    });
  }

  public goBackToCarsWashes(event?: Event): void {
    event && event.stopPropagation();
    this.router.navigate([`car-washes/${this.carWashesService.activeCarWash._id}/washers`]);
  }

  public addPhoneNumberToPhones(event?: Event): void {
    event && event.stopPropagation();
    this.phones.push(this.formGroup.get('phoneNumber').value);
    this.formGroup.get('phoneNumber').patchValue('');
  }

  public clearPhoneNumberFromPhones(phone: string, event?: Event): void {
    event && event.stopPropagation();
    this.phones = this.phones.filter(phoneItem => phoneItem !== phone);
  }

  public submit(event?: Event): void {
    event && event.stopPropagation();
    this.wash.phones = [this.phoneNumber];
    
    const data = {
      ...this.formGroup.value,
      phones: this.phones.length ? this.phones : [ this.formGroup.get('phoneNumber').value ],
    };
    const { phoneNumber, ...modifiedData } = data;

    const callBack = this.isEdit ?
      this.washers.updateItem(this.wash._id, modifiedData) :
      this.washers.create(this.carWashesService.activeCarWash._id, modifiedData);


    this.dispatcher.broadcast('loaderShow');
    callBack.subscribe((res: any) => {
      if (res && res.value) {
        this.goBackToCarsWashes();
      }
      this.dispatcher.broadcast('loaderHide');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import { Observable } from 'rxjs/Rx';

import {
  Connection,
  Dispatcher,
  Toaster,
} from '@platform/services';
import { Managers } from '@platform/resources';

import { ManagersService } from '../../services';

@Component({
  templateUrl: './view/index.html',
  styleUrls: [
    './sass/index.scss',
  ],
})

export class ManagerDetailes implements OnInit {

  public manager: any = {};
  public isEdit: boolean;
  public phoneNumber: any;
  public formGroup: FormGroup;
  public phones: Array<string> = new Array();

  constructor(
    private router: Router,
    private toaster: Toaster,
    private managers: Managers,
    private dispatcher: Dispatcher,
    private connection: Connection,
    private formBuilder: FormBuilder,
    private managersService: ManagersService,
  ) {
    this.isEdit = !!this.managersService.activeManager;
    if (this.isEdit) {
      this.manager = this.managersService.activeManager;
    }
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: [
        this.manager.username || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
        ]),
      ],
      first_name: [
        this.manager.first_name || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ]),
      ],
      last_name: [
        this.manager.last_name || '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
        ]),
      ],
      phoneNumber: [
        this.manager.phones && this.manager.phones[0] || '',
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
      ],
      password: [
        this.manager.password || '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]{8,30}$/),
        ]),
      ]
    });
    if (this.isEdit) {
      this.phones = this.manager.phones;
    }
  }

  // this method is not used now it will be added in next version

  public getAvatar(promise: any): void {
    promise.then(( { files }: any) => {
      this.manager.avatar = files[0];
    });
  }

  public goBackToManagerCards(event?: Event): void {
    event && event.stopPropagation();
    this.router.navigate(['managers']);
  }

  public addPhoneNumberToPhones(event: Event): void {
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
    this.manager.phones = [this.phoneNumber];
    const data = {
      ...this.formGroup.value,
      phones: this.phones.length ? this.phones : [ this.formGroup.get('phoneNumber').value ],
    };

    const { phoneNumber, ...modifiedData } = data;

    let observer = this.isEdit ?
      this.managers.updateItem(this.manager._id, modifiedData) :
      this.managers.create(modifiedData);

    this.dispatcher.broadcast('loaderShow');
    observer.subscribe((res) => {
      if (res && res.value) {
        this.managersService.activeManager = res.value;
        this.goBackToManagerCards();
      }
      this.dispatcher.broadcast('loaderHide');
    });
  }
}

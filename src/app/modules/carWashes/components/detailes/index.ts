import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

import { Observable, Subscription } from 'rxjs/Rx';

import {
  Connection,
  Dispatcher,
  Toaster,
} from '@platform/services';
import { CarWashes } from '@platform/resources';
import { unsubscriber } from '@platform/helpers';
import { GMaps } from '@platform/thirdParty';

import { CarWashesService } from '../../services';

@Component({
  templateUrl: './view/index.html',
  styleUrls: [
    './sass/index.scss',
  ],
})

export class CarWashDetailes implements OnInit, OnDestroy {

  public carWash: any = {};
  public isEdit: boolean;
  public managers: Array<any> = new Array();
  public formGroup: FormGroup;
  private maps: any;
  private channels: Array<Subscription> = new Array();

  constructor(
    private gMaps: GMaps,
    private router: Router,
    private toaster: Toaster,
    private carWashes: CarWashes,
    private dispatcher: Dispatcher,
    private connection: Connection,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private carWashesService: CarWashesService,
  ) {
    this.isEdit = !!this.carWashesService.activeCarWash;
    if (this.isEdit) {
      this.carWash = this.carWashesService.activeCarWash;
    }

    this.channels.push(
      this.activatedRoute.data.subscribe(({ data }: any) => {
        if (data && data.value) {
          this.managers = data.value;          
        }
      })
    )
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      owner: [
        this.carWash.owner && this.carWash.owner || '',
        Validators.required,
      ],
      phones: [
        this.carWash.owner && this.carWash.owner.phones || '',
        Validators.required,
      ],
      capacity: [
        this.carWash.capacity || '',
        Validators.compose([
          Validators.required,
          Validators.min(0),
        ]),
      ],
      // images: [[]],
      location: this.formBuilder.group({
        coordinates: [
          [],
          Validators.required,
        ],
      }),
      address: this.formBuilder.group({
        city: [
          this.carWash.address && this.carWash.address.city || '',
          Validators.required,
        ],
        street: [
          this.carWash.address && this.carWash.address.street || '',
          Validators.required,
        ],
      }),
    });
    if (this.isEdit) {
      this.getLocationInformation();
    }
  }

  public getPhones(): Array<string> {
    const selectedManagerId = this.formGroup.get('owner').value;
    if (selectedManagerId) {
      const phones = this.managers.find(manager => manager._id == selectedManagerId).phones;
      this.formGroup.get('phones').patchValue(phones);
      return phones;
    }
    return [];
  }

  public gmapsClick(event: any): void {
    this.gMaps.getAddressByCoordinates(event.latLng)
      .then(({ results, showOnTheMap }) => {
        this.gMaps.removeMarkers();
        const location = results[0].formatted_address.split(',');
        const address = this.formGroup.get('address');
        address.get('city').patchValue(location[1]);
        address.get('street').patchValue(location[0]);
        const coordinates = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
        this.formGroup.get('location').get('coordinates').patchValue(coordinates);

        showOnTheMap(this.maps, true);
      });
  }

  public getMapObject(map: any): void {
    this.maps = map;
  }

  public getLocationInformation(event?: Event): void {
    event && event.stopPropagation();
    const address = this.formGroup.get('address').get('city').value + this.formGroup.get('address').get('street').value;
    this.gMaps.getCoordinatesByAddress(address)
      .then(({ results, showOnTheMap }) => {
        this.gMaps.removeMarkers();
        const coordinates = [results[0].geometry.location.lat(), results[0].geometry.location.lng()];
        this.formGroup.get('location').get('coordinates').patchValue(coordinates);
        showOnTheMap(this.maps, true);
      });
  }

  public goBackToCarWashCards(event?: Event): void {
    event && event.stopPropagation();
    this.router.navigate(['car-washes']);
  }

  public submit(event?: Event): void {
    event && event.stopPropagation();
    const callBack = this.isEdit ?
      this.carWashes.updateItem(this.carWash._id, this.formGroup.value) :
      this.carWashes.create(this.formGroup.value);

    callBack.subscribe((res: any) => {
      if (res && res.value) {
        this.goBackToCarWashCards();
      }
    });
  }

  ngOnDestroy() {
    unsubscriber(this.channels);
  }
}

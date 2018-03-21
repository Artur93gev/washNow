import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { Dispatcher } from '@platform/services';
import { Cars as CarsResource } from '@platform/resources';
import { unsubscriber } from '@platform/helpers';

import { CarsService } from '../services';

@Component({
  templateUrl: '../view/index.html',
  styleUrls: [
    '../sass/index.scss',
  ],
})

export class Cars implements OnDestroy {

  private channels: Array<Subscription> = new Array();
  public cars: Array<any> = new Array();
  public selectedCar: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private carsResource: CarsResource,
    private carsService: CarsService,
    private dispatcher: Dispatcher,
    private router: Router,
  ) {
    this.channels.push(
      this.activatedRoute.data.subscribe((res: any): void => {
        if (res.data && res.data.value) {
          this.cars = res.data.value;
        }
      })
    );
  }

  public addCar(event?: Event): void {
    event && event.stopPropagation();

    this.selectedCar = null;
    this.carsService.activeCar = this.selectedCar;
    this.router.navigate(['./create'], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public editCar(event?: Event): void {
    event && event.stopPropagation();

    this.carsService.activeCar = this.selectedCar;
    this.router.navigate([`./${this.selectedCar._id}`], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public deleteCar(event?: Event): void {
    event && event.stopPropagation();
    this.dispatcher.broadcast('loaderShow');
    this.carsResource.deleteItem(this.selectedCar._id)
      .subscribe((res: any) => {
        if (res && res.value) {
          this.cars = this.cars.filter(car => car._id !== res.value._id);
          this.selectedCar = {};
        }
        this.dispatcher.broadcast('loaderHide');
      });
  }

  public selectCar(car: any, event?: Event): void {
    event && event.stopPropagation();
    if (this.selectedCar && this.selectedCar._id === car._id) {
      this.editCar();
    } else {
      this.selectedCar = car;
    }
  }

  ngOnDestroy() {
    unsubscriber(this.channels);
  }
}

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { CarWashesService } from '../services';

import { Dispatcher } from '@platform/services';
import { CarWashes as CarWashesResource } from '@platform/resources';

import { unsubscriber } from '@platform/helpers';

@Component({
  templateUrl: '../view/index.html',
  styleUrls: [
    '../sass/index.scss',
  ],
})

export class CarWashes implements OnDestroy {

  public selectedCarWash: any = {};
  public carWashes: Array<any> = new Array();
  
  private channels: Array<Subscription> = new Array();
  private managers: Array<any> = new Array();

  constructor(
    private router: Router,
    private dispatcher: Dispatcher,
    private activatedRoute: ActivatedRoute,
    private carWashesService: CarWashesService,
    private carWashesResource: CarWashesResource,
  ) {
    this.channels.push(
      this.activatedRoute.data.subscribe((res: any) => {
        if (res.data && res.data.length) {
          this.carWashes = res.data[0].value;
          this.managers = res.data[1].value;
        }
      })
    );
  }

  public selectCarWash(carWash: any, event?: Event): void {
    event && event.stopPropagation();
    if (this.selectedCarWash && this.selectedCarWash._id === carWash._id) {
      this.editCarWash();
    } else {
      this.selectedCarWash = carWash;
    }
  }

  public getOwnerName(id: string): string {
    const manager = this.managers.find(item => item._id === id);
    return manager ? manager.username : 'Unknown';
  }

  public addCarWash(event?: Event): void {
    event && event.stopPropagation();

    this.selectedCarWash = null;
    this.carWashesService.activeCarWash = this.selectedCarWash;
    this.router.navigate(['./create'], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public editCarWash(event?: Event): void {
    event && event.stopPropagation();

    this.carWashesService.activeCarWash = this.selectedCarWash;
    this.router.navigate([`./${this.selectedCarWash._id}`], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public deleteCarWash(event?: Event): void {
    event && event.stopPropagation();
    this.dispatcher.broadcast('loaderShow');
    this.carWashesResource.deleteItem(this.selectedCarWash._id)
      .subscribe((res: any) => {
        if (res && res.value) {
          this.carWashes = this.carWashes.filter(carWash => carWash._id !== res.value._id);
          this.selectedCarWash = {};
        }
        this.dispatcher.broadcast('loaderHide');
      });
  }

  public setWorkingDays(carWash: any, event?: Event): void {
    event && event.stopPropagation();
    this.selectedCarWash = carWash;
    this.carWashesService.activeCarWash = this.selectedCarWash;
    this.router.navigate([`${carWash._id}/working-days`], {
      relativeTo: this.activatedRoute,
    });
  }

  public seeServices(carWash: any, event?: Event): void {
    event && event.stopPropagation();
    this.selectedCarWash = carWash;
    this.carWashesService.activeCarWash = this.selectedCarWash;

    this.router.navigate([`${carWash._id}/services`], {
      relativeTo: this.activatedRoute,
    });
  }
  
  public seeWashers(carWash: any, event?: Event): void {
    event && event.stopPropagation();
    this.selectedCarWash = carWash;
    this.carWashesService.activeCarWash = this.selectedCarWash;
    this.router.navigate([`${carWash._id}/washers`], {
      relativeTo: this.activatedRoute,
    });
  }

  ngOnDestroy() {
    unsubscriber(this.channels);
  }
}

import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { Dispatcher } from '@platform/services';
import { WasherServices as WasherServicesResource } from '@platform/resources';
import { unsubscriber } from '@platform/helpers';

import { CarWashesService } from '../../services';

@Component({
  templateUrl: './view/index.html',
  styleUrls: [ './sass/index.scss', ],
})

export class CarWashServices implements OnDestroy {

  private channels: Array<Subscription> = new Array();
  public washServices: Array<any> = new Array();
  public selectedWashService: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private washerServicesResource: WasherServicesResource,
    private carWashesService: CarWashesService,
    private dispatcher: Dispatcher,
    private router: Router,
  ) {
    this.channels.push(
      this.activatedRoute.data.subscribe((res: any): void => {
        console.log(res)
        if (res && res.data) {
          this.washServices = res.data;
        }
      })
    );
  }

  public addWashService(event?: Event): void {
    event && event.stopPropagation();

    this.selectedWashService = null;
    this.carWashesService.activeWasherService = this.selectedWashService;
    this.router.navigate(['./create'], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public editWashService(event?: Event): void {
    event && event.stopPropagation();

    this.carWashesService.activeWasherService = this.selectedWashService;
    this.router.navigate([`./${this.selectedWashService._id}`], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public deleteWashService(event?: Event): void {
    event && event.stopPropagation();
    this.dispatcher.broadcast('loaderShow');
    this.washerServicesResource.deleteItem(this.carWashesService.activeCarWash._id, this.selectedWashService._id)
      .subscribe((res: any) => {
        if (res && res.value) {
          this.washServices = this.washServices.filter(washService => washService._id !== res.value._id);
          this.selectedWashService = {};
        }
        this.dispatcher.broadcast('loaderHide');
      });
  }

  public selectWashService(washService: any, event?: Event): void {
    event && event.stopPropagation();
    if (this.selectedWashService && this.selectedWashService._id === washService._id) {
      this.editWashService();
    } else {
      this.selectedWashService = washService;
    }
  }

  public goBackToCarWashCards(event?: Event): void {
    event && event.stopPropagation();
    this.router.navigate(['car-washes']);
  }

  ngOnDestroy() {
    unsubscriber(this.channels);
  }
}

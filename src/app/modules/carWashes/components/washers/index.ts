import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { Dispatcher } from '@platform/services';
import { Washers as WashersResource } from '@platform/resources';
import { unsubscriber } from '@platform/helpers';

import { CarWashesService } from '../../services';

@Component({
  templateUrl: './view/index.html',
  styleUrls: [ './sass/index.scss', ],
})

export class CarWashWashers implements OnDestroy {

  private channels: Array<Subscription> = new Array();
  public washers: Array<any> = new Array();
  public selectedWasher: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private washersResource: WashersResource,
    private carWashesService: CarWashesService,
    private dispatcher: Dispatcher,
    private router: Router,
  ) {
    this.channels.push(
      this.activatedRoute.data.subscribe((res: any): void => {
        console.log(res);
        if (res && res.data) {
          this.washers = res.data;
        }
      })
    );
  }

  public addWasher(event?: Event): void {
    event && event.stopPropagation();

    this.selectedWasher = null;
    this.carWashesService.activeWasher = this.selectedWasher;
    this.router.navigate(['./create'], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public editWasher(event?: Event): void {
    event && event.stopPropagation();

    this.carWashesService.activeWasher = this.selectedWasher;
    this.router.navigate([`./${this.selectedWasher._id}`], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public deleteWasher(event?: Event): void {
    event && event.stopPropagation();
    this.dispatcher.broadcast('loaderShow');
    this.washersResource.deleteItem(this.carWashesService.activeCarWash._id, this.selectedWasher._id)
      .subscribe((res: any) => {
        if (res && res.value) {
          this.washers = this.washers.filter(washer => washer._id !== res.value._id);
          this.selectedWasher = {};
        }
        this.dispatcher.broadcast('loaderHide');
      });
  }

  public selectWasher(washer: any, event?: Event): void {
    event && event.stopPropagation();
    if (this.selectedWasher && this.selectedWasher._id === washer._id) {
      this.editWasher();
    } else {
      this.selectedWasher = washer;
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

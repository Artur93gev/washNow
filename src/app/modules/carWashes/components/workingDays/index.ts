import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { Dispatcher } from '@platform/services';
import { WorkingDays as WorkingDaysResource } from '@platform/resources';
import { unsubscriber } from '@platform/helpers';

import { CarWashesService } from '../../services';

@Component({
  templateUrl: './view/index.html',
  styleUrls: [ './sass/index.scss', ],
})

export class CarWashWorkingDays implements OnDestroy {

  private channels: Array<Subscription> = new Array();
  public workingDays: Array<any> = new Array();
  public selectedWorkingDay: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private workingDaysResource: WorkingDaysResource,
    private carWashesService: CarWashesService,
    private dispatcher: Dispatcher,
    private router: Router,
  ) {
    this.channels.push(
      this.activatedRoute.data.subscribe((res: any): void => {
        if (res && res.data) {
          this.workingDays = res.data;
        }
      })
    );
  }

  public addWorkingDay(event?: Event): void {
    event && event.stopPropagation();

    this.selectedWorkingDay = null;
    this.carWashesService.activeWorkingDays = this.selectedWorkingDay;
    this.router.navigate(['./create'], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public editWorkingDay(event?: Event): void {
    event && event.stopPropagation();

    this.carWashesService.activeWorkingDays = this.selectedWorkingDay;
    this.router.navigate([`./${this.selectedWorkingDay._id}`], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public deleteWorkingDay(event?: Event): void {
    event && event.stopPropagation();
    this.dispatcher.broadcast('loaderShow');
    this.workingDaysResource.deleteItem(this.carWashesService.activeCarWash._id, this.selectedWorkingDay._id)
      .subscribe((res: any) => {
        if (res && res.value) {
          this.workingDays = this.workingDays.filter(workingDay => workingDay._id !== res.value._id);
          this.selectedWorkingDay = {};
        }
        this.dispatcher.broadcast('loaderHide');
      });
  }

  public selectWorkingDay(workingDay: any, event?: Event): void {
    event && event.stopPropagation();
    if (this.selectedWorkingDay && this.selectedWorkingDay._id === workingDay._id) {
      this.editWorkingDay();
    } else {
      this.selectedWorkingDay = workingDay;
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

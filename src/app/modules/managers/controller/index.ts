import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { unsubscriber } from '@platform/helpers';
import { Managers as ManagersResource } from '@platform/resources';
import { Dispatcher } from '@platform/services';

import { ManagersService } from '../services';

@Component({
  templateUrl: '../view/index.html',
  styleUrls: [
    '../sass/index.scss',
  ],
})

export class Managers implements OnDestroy {

  private channels: Array<Subscription> = new Array();
  public selectedManager: any = {};
  public managers: Array<any> = new Array();

  constructor(
    private router: Router,
    private dispatcher: Dispatcher,
    private activatedRoute: ActivatedRoute,
    private managersService: ManagersService,
    private managersResource: ManagersResource,
  ) {
    this.channels.push(
      this.activatedRoute.data.subscribe((res: any) => {
        if (res.data && res.data.value) {
          this.managers = res.data.value;
        }
      })
    );
  }

  public selectManager(manager: any, event?: Event): void {
    event && event.stopPropagation();
    if (this.selectedManager && this.selectedManager._id === manager._id) {
      this.editManager();
    } else {
      this.selectedManager = manager;
    }
  }

  public addManager(event?: Event): void {
    event && event.stopPropagation();

    this.selectedManager = null;
    this.managersService.activeManager = this.selectedManager;
    this.router.navigate(['./create'], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public editManager(event?: Event): void {
    event && event.stopPropagation();

    this.managersService.activeManager = this.selectedManager;
    this.router.navigate([`./${this.selectedManager._id}`], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public deleteManager(event?: Event): void {
    event && event.stopPropagation();
    this.dispatcher.broadcast('loaderShow');
    this.managersResource.deleteItem(this.selectedManager._id)
      .subscribe((res: any) => {
        if (res && res.value) {
          this.managers = this.managers.filter(manager => manager._id !== res.value._id);
          this.selectedManager = {};
        }
        this.dispatcher.broadcast('loaderHide');
      });
  }

  ngOnDestroy() {
    unsubscriber(this.channels);
  }
}

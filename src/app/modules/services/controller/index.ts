import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Rx';

import { ServicesService } from '../services';

import { Dispatcher } from '@platform/services';
import { Services as ServicesResource } from '@platform/resources';

import { unsubscriber } from '@platform/helpers';

@Component({
  templateUrl: '../view/index.html',
  styleUrls: [
    '../sass/index.scss',
  ],
})

export class Services implements OnDestroy {

  public selectedService: any = {};
  public services: Array<any> = new Array();
  
  private channels: Array<Subscription> = new Array();

  constructor(
    private router: Router,
    private dispatcher: Dispatcher,
    private activatedRoute: ActivatedRoute,
    private servicesService: ServicesService,
    private servicesResource: ServicesResource,
  ) {
    this.channels.push(
      this.activatedRoute.data.subscribe((res: any) => {
        if (res.data && res.data.value) {
          this.services = res.data.value;
        }
      })
    );
  }

  public selectService(service: any, event?: Event): void {
    event && event.stopPropagation();
    if (this.selectedService && this.selectedService._id === service._id) {
      this.editService();
    } else {
      this.selectedService = service;
    }
  }

  // public getOwnerName(id: string): string {
  //   const manager = this.managers.find(item => item._id === id);
  //   return manager ? manager.username : 'Unknown';
  // }

  public addService(event?: Event): void {
    event && event.stopPropagation();

    this.selectedService = null;
    this.servicesService.activeService = this.selectedService;
    this.router.navigate(['./create'], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public editService(event?: Event): void {
    event && event.stopPropagation();

    this.servicesService.activeService = this.selectedService;
    this.router.navigate([`./${this.selectedService._id}`], {
        relativeTo: this.activatedRoute,
    });
  }
  
  public deleteService(event?: Event): void {
    event && event.stopPropagation();
    this.dispatcher.broadcast('loaderShow');
    this.servicesResource.deleteItem(this.selectedService._id)
      .subscribe((res: any) => {
        if (res && res.value) {
          this.services = this.services.filter(service => service._id !== res.value._id);
          this.selectedService = {};
        }
        this.dispatcher.broadcast('loaderHide');
      });
  }

  ngOnDestroy() {
    unsubscriber(this.channels);
  }
}

/*  Observer Pattern Layer(application level)
  ** Disaptcher for whole application
  here are main dispatching channnels that are need by the application
  The dispatcher is making a community between dedicated modules
  that need to share data with sibling modules
*/

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/Rx';

@Injectable()

export class Dispatcher {

  protected systemEvents: BehaviorSubject<string>;

  constructor() {
    this.systemEvents = new BehaviorSubject(null);
  }

  /* System events channel

    All system events that need to be heared
    by all the modules in the application are
    passed only via this channel (channel for broadcasting)

  */

  public get events(): BehaviorSubject<string> {
    return this.systemEvents;
  }

  public broadcast(event: string) {
    this.systemEvents.next(event);
  }
}

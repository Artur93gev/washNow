import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Settings, Dispatcher } from '@platform/services';

import { menuItems, tab } from '@platform/constants';

@Component({
  selector: 'wiseboard',
  templateUrl: './view/index.html',
  styleUrls: ['./sass/index.scss'],
})

export class Wiseboard {

  public menuList: Array<tab> = menuItems;

  constructor(
    public settings: Settings,
    private dispatcher: Dispatcher,
    private router: Router,
  ) {
    this.selectTab(this.settings.tab);
  }

  public selectTab(url: string, event?: Event): void {
    event && event.stopPropagation();
    this.settings.tab = url;
    this.router.navigate([this.settings.tab]);
  }

  public logOut(event: Event): void {
    // missing implenetation in backend
    this.dispatcher.broadcast('logout');
  }
}

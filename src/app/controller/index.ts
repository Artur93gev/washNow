import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Dispatcher } from '@platform/services';

@Component({
  selector: 'app-root',
  templateUrl: '../view/index.html',
  styleUrls: ['../sass/index.scss']
})
export class AppComponent {

  public visible = false;
  public display = true;

  constructor(
    private dispatcher: Dispatcher,
    private router: Router,
   ) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationStart) {
        this.display = true;
      }
      if (e instanceof NavigationEnd) {
        this.display = false;
      }
    });

    this.dispatcher.events
      .filter(event => event === 'loaderShow' || event === 'loaderHide')
      .subscribe(_ => {
        this.display = _ === 'loaderShow';
      });

    this.dispatcher.events
      .filter(event => event === 'login')
      .subscribe(_ => {
        this.visible = true;
      });
  }
}

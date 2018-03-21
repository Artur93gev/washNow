import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  Connection,
  Dispatcher,
  Settings,
} from '@platform/services';

@Component({
  templateUrl: '../view/index.html',
  styleUrls: [
    '../sass/index.scss',
  ],
})
export class Login {

  public user = {
    username: '',
    password: '',
  };

  constructor(
    private connection: Connection,
    private settings: Settings,
    private dispatcher: Dispatcher,
    private router: Router,
  ) {}

  public forgotPassword(event?: Event): void {
    event && event.stopPropagation();
    console.log('in forgot password case');
  }

  public login(event?: Event): void {
    event && event.stopPropagation();
    
    this.connection.serverAPI({
      method: 'Post',
      url: 'partners/signin',
      data: this.user,
    }).subscribe((res: any) => {
      if (res && res.value) {
        this.settings.token = res.value.auth_token.token;
        this.settings.user = res.value.partner;
        this.settings.tab = 'car-washes';
        this.dispatcher.broadcast('login');
        this.router.navigate([this.settings.tab]);
      };
    });
  }
}

import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Dispatcher } from './dispatcher';

@Injectable()

export class Settings {

  protected hostUrl: string = environment.hostUrl;
  private userToken: string;
  private userInfo: any;

  constructor(
    private dispatcher: Dispatcher
  ) {}

  public get url(): string {
    return this.hostUrl;
  }

  public set token(val: string) {
    window.sessionStorage.setItem('token', val);
    this.userToken = val;
  }

  public get token(): string {
    if (!this.userToken) {
      this.userToken = window.sessionStorage.getItem('token');
    }
    return this.userToken;
  }

  public set user(val: any) {
    this.userInfo = val;
    window.sessionStorage.setItem('userInfo', JSON.stringify(val));
  }

  public get user(): any {
    if (!this.userInfo) {
      this.userInfo = window.sessionStorage.getItem('userInfo');
    }
    return this.userInfo;
  }

  public tab: string = '';
}

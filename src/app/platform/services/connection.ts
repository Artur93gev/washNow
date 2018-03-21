import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Headers, Http, RequestOptions, RequestMethod, Request } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Settings } from './settings';
import { ErrorHandler } from './errorHandler';

@Injectable()

export class Connection {

  constructor(
    private http: Http,
    private settings: Settings,
    private errorHandler: ErrorHandler,
  ) {}

  // private methods

  private hostAPIUrl: string = this.settings.url;

  serverAPI(obj: any): Observable<any> {
    
    let helper: any = {
      method: RequestMethod[obj.method],
      url: `${this.hostAPIUrl}${obj.url}`,
    };

    // headers default options

    const HEADERS = new Headers();

    HEADERS.append('Accept', 'application/json');
    HEADERS.append('Content-Type', 'application/json');

    // if url is not /login make a header for token authorization

    this.settings.token && helper.url !== 'token' && HEADERS.append('x-auth-token', this.settings.token);

    if (obj.headersList) {
      for (let i = 0; i < obj.headersList.length; i++) {
        HEADERS.append(obj.headersList[i][0], obj.headersList[i][1]);
      }
    }

    helper = { ...helper, headers: HEADERS, };
    
    if (obj.data) {
      helper.body = obj.url !== 'login' ? JSON.stringify(obj.data) : obj.data;
    }
    
    const OPTIONS = new RequestOptions(helper);

    return this.errorHandler
      .check(this.http.request(new Request(OPTIONS)));
  }
}

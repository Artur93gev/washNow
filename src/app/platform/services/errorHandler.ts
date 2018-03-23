import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators'
import { Dispatcher }   from './dispatcher';
import { Toaster } from './toaster';

@Injectable()

export class ErrorHandler {

  constructor(
    private dispatcher: Dispatcher,
    private toaster: Toaster,
    private router: Router,
  ) {}

  check(data: Observable<any>): Observable<any> {
    return data
    .pipe(
      catchError((err: any, caught:Observable<any>): Observable<any> => {
          try {
            const parsedResult = err._body && JSON.parse(err._body);
            const error = parsedResult.message;
            const message = {
              title: error,
              type: 'danger',
            };
            if (err.status == 401) { // unauthorized
                this.dispatcher.broadcast('logout');
              } else {
                if (err.status == 403) { // forbiden
                  message.type = 'warn';
                  if (this.router.url != '/home') {
                    // this.router.navigate(['home']);
                  }
                } else {
                  if (err.status == 404) { // page not found
                    message.type = 'warn';
                    // this.router.navigate(['not-found']);
                  } else {
                    if (err.status == 400) { // bad request
                      message.type = 'warn';
                      if (this.router.url != '/home') {
                        // this.router.navigate(['home']);
                      }
                    } else {
                      if (err.status == 500) { // internal server error
                        message.type = 'error';
                        if (this.router.url != '/home') {
                          // this.router.navigate(['home']);
                        }
                      }
                    }
                  }
                }
            }
            this.toaster.notify(message);
          } catch (warn) {
              console.log(err, warn);
          }
          return Observable.of(undefined);
        }
      ),
      map((result: any) => {
          if (result && result._body) {
            const parsedResult = JSON.parse(result._body);
            const data = parsedResult || {};
            if (!data.message) {
              return Observable.of(data);
            } else {
              const error = data.message;
              if (error === "Incorrect token") {
                this.dispatcher.broadcast('logout');
              }
              const message = {
                title: error,
                type: 'danger',
              };

              this.toaster.notify(message);
              if (parsedResult.errors) {
                for (const prop in parsedResult.errors) {
                  this.toaster.notify(parsedResult.errors[prop]);
                }
              }
              return Observable.of(undefined);
            }
          }
      })
    );
  }
}

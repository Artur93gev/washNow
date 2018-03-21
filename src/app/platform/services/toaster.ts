/* Toaster API

    Toaster is an JQuery pluggin which is wrapped by Angular provider
    and has to show some message for a few seconds

    @Function - notify
    @params - { { title, type } = Object }

*/

import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material';

@Injectable()

export class Toaster {
  constructor(
    private snackBar: MatSnackBar,
  ) {}

  public notify(obj: any) {
    if (Array.isArray(obj.title)) {
      obj.title.forEach((message: string) => {
        this.publish(message, obj.type);
      });
    } else {
      this.publish(obj.title, obj.type);
    }
  }

  private publish(message: string = '', action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}

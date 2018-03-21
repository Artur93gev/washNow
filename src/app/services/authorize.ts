import { Injectable } from '@angular/core';
import { CanLoad, CanActivate } from '@angular/router';

import { Settings } from '../platform/services/settings';

@Injectable()

export class Authorize implements CanLoad, CanActivate {

  constructor(
    private settings: Settings
  ) {}

  private state = false;

  canActivate(): boolean {
    this.checkState();
    return this.state;
  }

  canLoad(): boolean {
    this.checkState();
    return this.state;
  }

  private checkState(): void {
    this.state = !!this.settings.user;
  }
}
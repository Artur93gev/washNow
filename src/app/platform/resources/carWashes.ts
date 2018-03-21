import { Injectable } from '@angular/core';
import { Connection } from '../services';

import { CRUD } from '../common';

@Injectable()
export class CarWashes extends CRUD {

  constructor(
    connection: Connection,
  ) {
    super(connection, 'car_washes');
  }
}

import { Injectable } from '@angular/core';
import { Connection } from '../services';

import { CRUD } from '../common';

@Injectable()
export class Services extends CRUD {

  constructor(
    connection: Connection,
  ) {
    super(connection, 'wash_services');
  }
}

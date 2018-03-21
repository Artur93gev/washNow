import { Injectable } from '@angular/core';
import { Connection } from '../services';

import { CRUD } from '../common';

@Injectable()
export class Managers extends CRUD {

  constructor(
    connection: Connection,
  ) {
    super(connection, 'partners/managers');
  }
}

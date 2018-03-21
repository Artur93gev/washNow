import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { GMaps as GMapsService } from '@platform/thirdParty';

@Component({
  selector: 'google-maps',
  templateUrl: './view/index.html',
  styleUrls: ['./sass/index.scss'],
  inputs: ['type', 'zoom'],
  outputs: ['onClick', 'mapObject']
})
export class GMaps implements OnChanges {

  map: google.maps.Map;

  @Input() type: any;
  @Input() zoom: number;
  @Output() onClick: EventEmitter<any> = new EventEmitter();
  @Output() mapObject: EventEmitter<any> = new EventEmitter();

  constructor(
    private gMapsService: GMapsService,
  ) {}

  ngOnChanges(changes: any) {
    if (changes.type.currentValue && changes.zoom.currentValue) {

      if (this.gMapsService.typeChecker(changes.type.currentValue)) {
        const options = {
          selector: 'map',
          type: changes.type.currentValue,
          zoom: changes.zoom.currentValue,
        }
        this.map = this.gMapsService.initMap(options);
        this.mapObject.next(this.map);
        this.map.addListener('click', (event: any): void => {
          this.onClick.next(event);
        });
      } else {
        console.error(`there is no ${changes.type.currentValue} type in google maps`);
      }
    }
  }
}

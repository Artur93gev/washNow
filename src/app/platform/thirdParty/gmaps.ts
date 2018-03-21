import { Injectable } from '@angular/core';

import { } from '@types/googlemaps';

@Injectable()
export class GMaps {

  private geoCoder: any;

  private types = ['roadmap', 'satellite', 'hybrid', 'terrain'];

  constructor() {
    this.initGeocoder();
  }

  public getCoordinatesByAddress(address: string): any {
    let promise = new Promise((resolve, reject) => {
      this.geoCoder.geocode({ address, }, (results: any, status: any): void => {
        if (status === google.maps.GeocoderStatus.OK) {
          const resolvationObject = {
            results,
            showOnTheMap: (map: any, setMark: boolean = false) => {
              map.setCenter(results[0].geometry.location);
              if (setMark) {
                var marker = new google.maps.Marker({
                   map,
                   position: results[0].geometry.location,
               });
                this.logger('log', `marker has been set for ${results[0].formatted_address}`);
              }
            }
          }
          resolve(resolvationObject);
         } else {
           reject(results);
         }
      });
    });
    return promise;
  }

  private initGeocoder(): void {
    this.geoCoder = new google.maps.Geocoder();
    this.logger('info', 'geolocator has been initialized');
  }

  public initMap(options: any): google.maps.Map {
    var latlng = new google.maps.LatLng(options.Lat, options.Lng);
    var mapOptions = {
       zoom: options.zoom,
       center: {
         lat: 40.1776945,
         lng: 44.5126510,
       },//latlng
       type: options.type,
       width: 440,
       height: 440,
    }
    const map = new google.maps.Map(document.getElementById(options.selector), mapOptions);
    this.logger('info', 'map is generated');
    return map;
  }

  public typeChecker(type: string): boolean {
    return this.types.includes(type);
  }

  private logger(type: string, message: any): void {
    console[type](`%cGoogle maps: ${message}`, 'color: green');
  }
}

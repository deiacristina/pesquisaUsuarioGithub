import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Githubuser } from 'src/app/interfaces/githubuser';
import { AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { MapsApiService } from 'src/app/services/maps-api.service';
import { UserLocation } from 'src/app/interfaces/userlocation';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit{
  @ViewChild('map')
  mapContainer!: ElementRef;
  map: any;

  public userLocation!: UserLocation;

  constructor(@Inject(MAT_DIALOG_DATA) public user: Githubuser, private mapService: MapsApiService){
    this.getLatLong(user.location);
  }
  ngOnInit(): void {


  }


  public renderMap(userLocation: UserLocation): void{
    const map = L.map('map').setView([Number(userLocation.lat), Number(userLocation.lon)], 13);
    this.map = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.circle([Number(userLocation.lat), Number(userLocation.lon)], {
      color: 'red',
      fillColor: '#158552',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(map);
  }


  public getLatLong(city: string): void{
    this.mapService.getLatLong(city).subscribe((valor: UserLocation[]) => {
      valor.forEach(v => this.renderMap(v))
    })
  }

}

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
// @ts-ignore
import { InfoWindow } from '@agm/core/services/google-maps-types'
import {map, Observable, startWith} from "rxjs";
import {FormControl} from "@angular/forms";
import {GooglePlaceDirective} from "ngx-google-places-autocomplete";
import {Address, DirectionsAgm} from "../models/models";
import {RoadRunnerService} from "../service/road-runner.service"; // option

@Component({
  selector: 'app-navigation',
  templateUrl: './navigationcomponent.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public origin1: Object = { lat: 24.799448, lng: 120.979021 };
  public destination1: Object = { lat: 24.799524, lng: 120.975017 };

  public origin2: Object = { lat: 24.798448, lng: 120.972021 };
  public destination2: Object = { lat: 24.789524, lng: 120.972017 };
  public renderOptions = {
    suppressMarkers: true,
    // polylineOptions: { strokeColor: '#0f0' }
    // polylineOptions: { strokeColor: '#0f0' }
  };
  showMap = false;

  public dirs: Array<DirectionsAgm> = [
    {
      origin: new google.maps.LatLng(10.8298389, 78.66647329999999),
      destination: new google.maps.LatLng(10.8298389, 78.66647329999999),
      renderOptions: { polylineOptions: { strokeColor: '#f00' } },
      waypoints: [
        { location: new google.maps.LatLng(10.8298389, 78.66647329999999) },
      ],
    },

  ];

  myControl = new FormControl('');
  options: any;
  filteredOptions: any;
  currentWarehouse: any;
  public markerOptions = {
    origin: {
      icon: 'https://i.imgur.com/7teZKif.png',
    },
    destination: {
      icon: 'https://i.imgur.com/7teZKif.png',
      infoWindow: `
        <h4>Hello<h4>
        <a href='http://www-e.ntust.edu.tw/home.php' target='_blank'>Taiwan Tech</a>
        `,
    },
  };

  public infoWindow: InfoWindow = undefined;

  origin = { lat: 12.9900181, lng: 80.2165848 };
  destination = { lat: 10.9651497, lng: 78.0329381 };
  waypoints : google.maps.DirectionsWaypoint[];
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  constructor(private roadRunnerService: RoadRunnerService) {}

  ngOnInit(): void {
    this.getAllWarehouses();
  }
  getAllWarehouses() {
    this.roadRunnerService.getAllWarehouses().subscribe((response: any) => {
      console.log(response, 'response');
      this.options = [...response];
      this.filteredOptions = [...response];
      console.log(this.filteredOptions, 'this.filteredOptions');
    });
  }

  _filter(value: any) {
    const filterValue = value.name.toLowerCase();
    this.myControl.setValue(value.name);
    this.currentWarehouse = value;
    console.log(this.myControl);

    return this.options.filter((option: any) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  public obtainInfowindow(window: InfoWindow) {
    this.infoWindow = window;
  }
  getPickup() {
    this.showMap = true;
    this.origin1 = {
      lat: this.currentWarehouse.warehouseLocation.location.x,
      lng: this.currentWarehouse.warehouseLocation.location.y,
    };
    this.destination1 = {
      lat: this.currentWarehouse.warehouseLocation.location.x,
      lng: this.currentWarehouse.warehouseLocation.location.y,
    };
    this.roadRunnerService
      .getStartPickups(this.currentWarehouse.id)
      .subscribe((res: any) => {
        console.log(res, 'response');
        this.dirs = [];
        this.waypoints = [];
        res.filter((routes: any) => {
          if (routes.packageStatuses.length > 0) {
            routes.packageStatuses.filter((waypoints: any) => {
              this.waypoints.push({
                location:
                  new google.maps.LatLng(waypoints.address.location.x,  waypoints.address.location.y)
              });
            });

            let maxVal = 0xffffff; // 16777215
            let randomNumber = Math.random() * maxVal;
            randomNumber = Math.floor(randomNumber);
            let randomColor = randomNumber.toString(16);
            // document.body.style.backgroundColor = "#" + randomColor;
            const color = '#' + randomColor;
            this.dirs.push({
              origin: new google.maps.LatLng(10.8298389, 78.66647329999999),
              destination: new google.maps.LatLng(
                10.8298389,
                78.66647329999999
              ),
              waypoints: this.waypoints,
              renderOptions: {
                polylineOptions: { strokeColor: color },
              },
            });

            console.log(this.dirs, 'rourttes');
          }
        });
        // this.waypoints = [
        //   {location: { lat: res.packageStatuses.address.location.x, lng: res.packageStatuses.address.location.y }},
        //   {location: { lat: 11.6692642, lng: 78.1101747 }},
        //   {location: { lat: 11.775541, lng: 77.7983797 }},
        //   {location: { lat: 10.6475225, lng: 76.9639036 }}
        // ];
      });
  }
  getDelivery() {
    this.showMap = true;
    this.origin1 = {
      lat: this.currentWarehouse.warehouseLocation.location.x,
      lng: this.currentWarehouse.warehouseLocation.location.y,
    };
    this.roadRunnerService
      .getDelivery(this.currentWarehouse.id)
      .subscribe((res: any) => {
        console.log(res, 'response');
        this.dirs = [];
        this.waypoints = [];
        res.filter((routes: any) => {
          if (routes.packageStatuses.length > 0) {
            routes.packageStatuses.filter((waypoints: any) => {
              this.waypoints.push({
                location:
                  new google.maps.LatLng(waypoints.address.location.x,  waypoints.address.location.y)
              });
            });

            let maxVal = 0xffffff; // 16777215
            let randomNumber = Math.random() * maxVal;
            randomNumber = Math.floor(randomNumber);
            let randomColor = randomNumber.toString(16);
            // document.body.style.backgroundColor = "#" + randomColor;
            const color = '#' + randomColor;
            this.dirs.push({
              origin: new google.maps.LatLng(10.8298389, 78.66647329999999),
              destination: new google.maps.LatLng(
                10.8298389,
                78.66647329999999
              ),
              waypoints: this.waypoints,
              renderOptions: {
                polylineOptions: { strokeColor: 'blue' },
              },
            });

            console.log(this.dirs, 'rourttes');
          }
        });

        this.destination1 = {
          lat: res[res.length - 1].packageStatuses[res[res.length - 1].packageStatuses.length - 1].address.location.x,
          lng: res[res.length - 1].packageStatuses[res[res.length - 1].packageStatuses.length - 1].address.location.y,
        };
        console.log(this.destination1, 'destination1');
        // this.waypoints = [
        //   {location: { lat: res.packageStatuses.address.location.x, lng: res.packageStatuses.address.location.y }},
        //   {location: { lat: 11.6692642, lng: 78.1101747 }},
        //   {location: { lat: 11.775541, lng: 77.7983797 }},
        //   {location: { lat: 10.6475225, lng: 76.9639036 }}
        // ];
      });
  }
}

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MapsAPILoader } from '@agm/core';
import { RoadRunnerService } from '../service/road-runner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Drivers, Warehouse} from '../models/models';

@Component({
  selector: 'app-add-warehouse-dialog',
  templateUrl: './add-drivers.component.html',
  styleUrls: ['./add-drivers.component.scss'],
})
export class AddDriversComponent implements OnInit {
  originLat: number;
  originLng: number;

  formattedAddress: string = '';
  private geoCoder: google.maps.Geocoder;

  zoom: number = 10;
  public driverDetailsFormControl: FormGroup;


  @ViewChild('originInputRef')
  private originInputElementRef: GooglePlaceDirective;


  constructor(
    public dialogRef: MatDialogRef<AddDriversComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Warehouse,
    private mapsAPILoader: MapsAPILoader,
    private roadRunnerService: RoadRunnerService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.driverDetailsFormControl = this.fb.group({
      id: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      license:[''],
      dateOfBirth: [''],
      contactNumber: [''],
      address: [''],
      kilometersDriven:[''],
      status: [''],
      driverCurrentLocation: [''],
      rating: [''],
      bloodGroup: [''],
      gender: ['']
  });

  }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });

    setTimeout(() => {
      // this.warehouseAddressFormControl.setValue(this.formattedAddress);
    }, 3000);
  }

  public handleOriginAddressChange(address: Address) {
    this.originLat = address.geometry.location.lat();
    this.originLng = address.geometry.location.lng();
    this.zoom = 15;
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.originLat = position.coords.latitude;
        this.originLng = position.coords.longitude;
        this.getAddress(position.coords.latitude, position.coords.longitude);
      });
    }
  }

  markerDragEnd($event: google.maps.MouseEvent) {
    console.log($event);
    // this.originLat = $event['coords']['lat'];
    // this.originLng = $event.coords.lng;
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results: { formatted_address: any }[], status: string) => {
        if (status === 'OK') {
          if (results[0]) {
            this.formattedAddress = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      }
    );
  }

  saveDriver() {
    let driverData =
    {
      address: this.driverDetailsFormControl.controls['address'].value,
      bloodGroup: this.driverDetailsFormControl.controls['bloodGroup'].value,
      contactNumber: this.driverDetailsFormControl.controls['contactNumber'].value,
      dateOfBirth: this.driverDetailsFormControl.controls['dateOfBirth'].value,
      email: this.driverDetailsFormControl.controls['email'].value,
      firstName: this.driverDetailsFormControl.controls['firstName'].value,
      gender: this.driverDetailsFormControl.controls['gender'].value,
      id: '',
      kilometersDriven: this.driverDetailsFormControl.controls['kilometersDriven'].value,
      lastName: this.driverDetailsFormControl.controls['lastName'].value,
      license: this.driverDetailsFormControl.controls['license'].value,
      location: {
        x: 0, y: 0
      },
      rating: this.driverDetailsFormControl.controls['rating'].value,
      status: this.driverDetailsFormControl.controls['status'].value
    };
    this.roadRunnerService.saveDriver(driverData).subscribe((result) => {
      this._snackBar.open('Data saved successfully', 'close');
      this.dialogRef.close();
      console.log(result);
    });
  }

  isValidForm() {
    // return (
      // this.warehouseNameFormControl.valid &&
      // this.warehouseContactNoFormControl.valid &&
      // this.warehouseAddressFormControl.valid &&
      // this.managerFormControl
    // );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

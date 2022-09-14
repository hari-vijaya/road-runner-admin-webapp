import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MapsAPILoader } from '@agm/core';
import { RoadRunnerService } from '../service/road-runner.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Warehouse } from '../models/models';

@Component({
  selector: 'app-add-warehouse-dialog',
  templateUrl: './add-warehouse-dialog.component.html',
  styleUrls: ['./add-warehouse-dialog.component.scss'],
})
export class AddWarehouseDialogComponent implements OnInit {
  originLat: number;
  originLng: number;

  formattedAddress: string = '';
  private geoCoder: google.maps.Geocoder;

  zoom: number = 10;

  @ViewChild('originInputRef')
  private originInputElementRef: GooglePlaceDirective;

  warehouseNameFormControl = new FormControl(this.data.name, [Validators.required]);
  warehouseContactNoFormControl = new FormControl(this.data.contactNumber, [Validators.required]);
  warehouseAddressFormControl = new FormControl(this.data.address);
  managerFormControl = new FormControl(this.data.manager, [Validators.required]);
  constructor(
    public dialogRef: MatDialogRef<AddWarehouseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Warehouse,
    private mapsAPILoader: MapsAPILoader,
    private roadRunnerService: RoadRunnerService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });

    setTimeout(() => {
      this.warehouseAddressFormControl.setValue(this.formattedAddress);
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

  saveWarehouse() {
    let warehouse: Warehouse = {
      name: this.warehouseNameFormControl.value,
      contactNumber: this.warehouseContactNoFormControl.value,
      address: this.warehouseAddressFormControl.value,
      manager: this.managerFormControl.value,
      location: {
        x: this.originLat,
        y: this.originLng,
      },
    };
    this.roadRunnerService.saveWarehouse(warehouse).subscribe((result) => {
      this._snackBar.open('Data saved successfully', 'close');
      this.dialogRef.close();
      console.log(result);
    });
  }

  isValidForm() {
    return (
      this.warehouseNameFormControl.valid &&
      this.warehouseContactNoFormControl.valid &&
      this.warehouseAddressFormControl.valid &&
      this.managerFormControl
    );
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Capacity, MaterialType, Warehouse } from '../models/models';


@Component({
  selector: 'app-add-vehicle-dialog',
  templateUrl: './add-vehicle-dialog.component.html',
  styleUrls: ['./add-vehicle-dialog.component.scss'],
})
export class AddVehicleDialogComponent implements OnInit {
  vinFormControl = new FormControl('');
  vehicleNumberFormControl = new FormControl('');
  insurancePolicyNumberFormControl = new FormControl('');
  makeFormControl = new FormControl('');
  modelFormControl = new FormControl('');
  yearFormControl = new FormControl('');
  ladenWeightFormControl = new FormControl('');
  unLadenWeightFormControl = new FormControl('');
  fuelTypeFormControl = new FormControl('');
  fuelCapacityFormControl = new FormControl('');
  milageFormControl = new FormControl('');
  currentFuelStatFormControl = new FormControl('');
  capacityFormControl = new FormControl('');
  kilometersRunFormControl = new FormControl('');
  tyresFormControl = new FormControl('');
  materialTypeFormControl = new FormControl('');
  driverIdFormControl = new FormControl('');

  capacities: Capacity[] = [
    { code: 'Small', value: 1 },
    { code: 'Medium', value: 2 },
    { code: 'Large', value: 3 },
    { code: 'Extra large', value: 5 },
  ];
  materialTypes: MaterialType[] = [
    { code: 'Dry', value: 'DRY' },
    { code: 'Refridgerated', value: 'REFRIDGERATED' },
    { code: 'Fragile', value: 'FRAGILE' },
  ];

  constructor(
    public dialogRef: MatDialogRef<AddVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Warehouse
  ) {}

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

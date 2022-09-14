import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWarehouseDialogComponent } from '../add-warehouse-dialog/add-warehouse-dialog.component';
import { MapsAPILoader } from '@agm/core';
import { RoadRunnerService } from '../service/road-runner.service';
import { AddVehicleDialogComponent } from '../add-vehicle-dialog/add-vehicle-dialog.component';

export type Vehicle = {
  assignedDriverId: string;
  capacity: number | null;
  color: string;
  currentLocation: {
    x: number;
    y: number;
  };
  fuelInfo: {
    capacity: number | null;
    currentFuelStat: number | null;
    fuelType: string;
    mileage: number | null;
  };
  insurancePolicyNumber: string;
  isAtWarehouse: boolean | null;
  kilometersDriven: number | null;
  ladenWeight: number | null;
  lastUpdatedWarehouseId: string;
  make: string;
  materialType: string;
  model: string;
  noOfTyres: number | null;
  status: number;
  unladenWeight: number | null;
  vin: string;
  year: string;
};

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
  displayedColumns: string[] = [
    'vin',
    'vehicleNumber',
    'make',
    'model',
    'insurancePolicyNumber',
    'materialType',
  ];

  selectedRow: Vehicle = {
    currentLocation: {
      x: 0,
      y: 0,
    },
    vin: '',
    insurancePolicyNumber: '',
    make: '',
    model: '',
    year: '',
    ladenWeight: null,
    unladenWeight: null,
    fuelInfo: {
      capacity: null,
      currentFuelStat: null,
      fuelType: '',
      mileage: null,
    },
    capacity: null,
    kilometersDriven: null,
    noOfTyres: null,
    color: '',
    materialType: '',
    assignedDriverId: '',
    isAtWarehouse: null,
    lastUpdatedWarehouseId: '',
    status: 0
  };
  dataSource: Vehicle[] = [];
  constructor(
    private dialog: MatDialog,
    private roadRunnerService: RoadRunnerService
  ) {}

  ngOnInit(): void {}

  openDialog(): void {
    const dialogRef = this.dialog.open(AddVehicleDialogComponent, {
      width: '1000px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  selectedRows(row: Vehicle) {
    this.selectedRow = row;
  }
}

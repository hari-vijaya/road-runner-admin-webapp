import { Component, OnInit } from '@angular/core';
import {Vehicle} from "../vehicles/vehicles.component";
import {AddVehicleDialogComponent} from "../add-vehicle-dialog/add-vehicle-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {RoadRunnerService} from "../service/road-runner.service";
import {Drivers} from "../models/models";
import {AddDriversComponent} from "../add-drivers/add-drivers.component";

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  selectedRow =
    {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      license: '',
      dateOfBirth: '',
      contactNumber: '',
      address: '',
      kilometersDriven: null,
      status: '',
      driverCurrentLocation: null,
      rating: null,
      bloodGroup: '',
      gender: '',
      location: ''
    };
  displayedColumns: string[] = [
    'firstName',
    'email',
    'license',
    'contactNumber',
    'kilometersDriven',
    'rating',
  ];
  dataSource: Drivers[] = [];


  constructor(private dialog: MatDialog, public roadRunnerService: RoadRunnerService) {
    this.getAllDriversList();
  }

  ngOnInit(): void {
  }
  getAllDriversList() {
    this.roadRunnerService.getAllDriversList().subscribe((response) => {
      console.log(response, "response");
      this.dataSource = response;
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDriversComponent, {
      width: '800px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.getAllDriversList();
    });
  }
  selectedRows(row: any) {
    console.log(row, "row");
    this.selectedRow = row;
  }
}

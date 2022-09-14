import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddWarehouseDialogComponent } from '../add-warehouse-dialog/add-warehouse-dialog.component';
import { MapsAPILoader } from '@agm/core';
import { RoadRunnerService } from '../service/road-runner.service';
import { WarehouseResponse } from '../models/models';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'contactNumber',
    'address',
    'personIncharge',
  ];

  selectedRow: WarehouseResponse = {
    name: '',
    contactNumber: '',
    manager: '',
    address: '',
    warehouseLocation: {
      locality: '',
      administrativeAreaLevel2: '',
      administrativeAreaLevel1: '',
      country: '',
      postalCode: '',
      route: '',
      location: {
        x: 0,
        y: 0,
        coordinates: [],
        type: 'Point',
      },
    },
  };
  dataSource: any;
  constructor(
    private dialog: MatDialog,
    private roadRunnerService: RoadRunnerService
  ) {}

  ngOnInit(): void {
    this.roadRunnerService
      .getAllWarehouses()
      .subscribe((result) => (this.dataSource = result));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddWarehouseDialogComponent, {
      width: '700px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  selectedRows(row: WarehouseResponse) {
    this.selectedRow = row;
  }
}

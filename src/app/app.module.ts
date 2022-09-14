import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import {MatNativeDateModule, MatOptionModule, MatRippleModule} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { AddWarehouseDialogComponent } from './add-warehouse-dialog/add-warehouse-dialog.component';
import { AgmCoreModule } from '@agm/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AddVehicleDialogComponent } from './add-vehicle-dialog/add-vehicle-dialog.component';
import { DriversComponent } from './drivers/drivers.component';
import {AddDriversComponent} from "./add-drivers/add-drivers.component";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    SideMenuComponent,
    WarehouseComponent,
    AddWarehouseDialogComponent,
    VehiclesComponent,
    AddVehicleDialogComponent,
    DriversComponent,
    AddDriversComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    MatTooltipModule,
    HttpClientModule,
    MatSnackBarModule,
    MatOptionModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBWNCWizzY1UcYKTG8bzSQxV-gSerIojjg',
      libraries: ['places'],
    }),
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

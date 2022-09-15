import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriversComponent } from './drivers/drivers.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import {NavigationComponent} from "./navigation/navigation.component";

const routes: Routes = [
  {
    path: 'warehouse',
    component: WarehouseComponent,
  },
  {
    path: 'vehicles',
    component: VehiclesComponent,
  },
  {
    path: 'drivers',
    component: DriversComponent,
  },
  {
    path: 'navigation',
    component: NavigationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

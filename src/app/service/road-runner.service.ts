import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseResponse, Warehouse, Drivers } from '../models/models';
import { Vehicle } from '../vehicles/vehicles.component';

@Injectable({
  providedIn: 'root',
})
export class RoadRunnerService {
  constructor(private httpClient: HttpClient) {}

  getAllWarehouses(): Observable<WarehouseResponse[]> {
    return this.httpClient.get<WarehouseResponse[]>(
      'https://roadrunnerapi-7zjtqk6yoq-uc.a.run.app/warehouses/getAll'
    );
  }

  saveWarehouse(warehouse: Warehouse) {
    console.log(warehouse);
    return this.httpClient.post(
      'https://roadrunnerapi-7zjtqk6yoq-uc.a.run.app/warehouses',
      warehouse
    );
  }
  saveDriver(driver: any) {
    console.log(driver);
    return this.httpClient.post(
      'https://roadrunnerapi-7zjtqk6yoq-uc.a.run.app/drivers/save',
      driver
    );
  }

  saveVehicles(warehouse: Vehicle) {
    console.log(warehouse);
    return this.httpClient.post(
      'https://roadrunnerapi-7zjtqk6yoq-uc.a.run.app/warehouses',
      warehouse
    );
  }
  getAllDriversList(): Observable<Drivers[]> {
    return this.httpClient.get<Drivers[]>(
      'https://roadrunnerapi-7zjtqk6yoq-uc.a.run.app/drivers/getAll'
    );
  }
  getStartPickups(id: any) {
    return this.httpClient.post(
      'https://vehiclecapacityplanner-7zjtqk6yoq-el.a.run.app:443/vehicle-capacity-service/warehouse/start-pick-ups?warehouseId=' +
        id,
      {}
    );
  }
  getDelivery(id: any) {
    return this.httpClient.post(
      'https://vehiclecapacityplanner-7zjtqk6yoq-el.a.run.app:443/vehicle-capacity-service/warehouse/start-pick-ups-deliveries?warehouseId=' +
        id,
      {}
    );
  }

  getAllVehicles() {
    return this.httpClient.get<Vehicle[]>(
      'https://roadrunnerapi-7zjtqk6yoq-uc.a.run.app/vehicles/getAll'
    );
  }
}

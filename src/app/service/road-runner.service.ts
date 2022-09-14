import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WarehouseResponse, Warehouse } from '../models/models';
import { Vehicle } from '../vehicles/vehicles.component';

@Injectable({
  providedIn: 'root',
})
export class RoadRunnerService {
  constructor(private httpClient: HttpClient) {}

  getAllWarehouses(): Observable<WarehouseResponse[]> {
    return this.httpClient.get<WarehouseResponse[]>(
      'https://roadrunnerapi-7zjtqk6yoq-el.a.run.app:443/warehouses/getAll'
    );
  }

  saveWarehouse(warehouse: Warehouse) {
    console.log(warehouse);
    return this.httpClient.post(
      'https://roadrunnerapi-7zjtqk6yoq-el.a.run.app:443/warehouses',
      warehouse
    );
  }

  saveVehicles(warehouse: Vehicle) {
    console.log(warehouse);
    return this.httpClient.post(
      'https://roadrunnerapi-7zjtqk6yoq-el.a.run.app:443/warehouses',
      warehouse
    );
  }
}

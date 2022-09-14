export type Capacity = {
  code: string;
  value: number;
};
export type MaterialType = {
  code: string;
  value: string;
};

export type Warehouse = {
  location: {
    x: number;
    y: number;
  };
  name: string | null;
  contactNumber: string | null;
  address: string | null;
  manager: string | null;
};

export type WarehouseResponse = {
  warehouseLocation: Address;
  name: string | null;
  contactNumber: string | null;
  address: string | null;
  manager: string | null;
};

export type Address = {
  locality: string;
  administrativeAreaLevel2: string;
  administrativeAreaLevel1: string;
  country: string;
  postalCode: string;
  route: string;
  location: {
    x: number;
    y: number;
    coordinates: number[];
    type: 'Point';
  };
};
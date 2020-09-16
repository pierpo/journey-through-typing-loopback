import { LoopbackModel } from '.';

/* User */

export interface UserEntity {
  name: string;
  age: number;
}

export interface UserModel extends LoopbackModel<UserEntity> {}

/* Vehicles */

export interface VehicleEntity {
  licencePlate: string;
}

export interface VehicleModel extends LoopbackModel<VehicleEntity> {}

import { LoopbackInstance, LoopbackModel } from '.';

/* User */

export interface UserEntity {
  name: string;
  age: number;
  vehicles: VehicleEntity[];
}

export interface UserModel extends LoopbackModel<UserEntity> {}

export type UserInstance = LoopbackInstance<UserEntity>;

/* Vehicles */

export interface VehicleEntity {
  licencePlate: string;
}

export interface VehicleModel extends LoopbackModel<VehicleEntity> {}

export type VehicleInstance = LoopbackInstance<VehicleEntity>;

import { LoopbackInstance, LoopbackModel } from '.';

/* User */

export interface UserEntity {
  name: string;
  age: number;
}

export interface UserEntityWithRelations {
  vehicles: VehicleEntity[];
}

export interface UserModel
  extends LoopbackModel<UserEntity, UserEntityWithRelations> {}

export type UserInstance<
  R extends keyof UserEntityWithRelations | null = null
> = LoopbackInstance<UserEntity, UserEntityWithRelations, R>;

/* Vehicles */

export interface VehicleEntity {
  licencePlate: string;
}

export interface VehicleEntityWithRelations {}

export interface VehicleModel
  extends LoopbackModel<VehicleEntity, VehicleEntityWithRelations> {}

export type VehicleInstance = LoopbackInstance<
  VehicleEntity,
  VehicleEntityWithRelations
>;

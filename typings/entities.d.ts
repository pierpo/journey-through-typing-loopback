import { LoopbackInstance, LoopbackModel } from '.';

/* User */

export interface UserEntity {
  name: string;
  age: number;
}

export interface UserEntityWithRelations {
  vehicles: VehicleEntity[];
  bookings: BookingEntity[];
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

/* Bookings */

export interface BookingEntity {
  id: string;
}

export interface BookingEntityWithRelations {}

export interface BookingModel
  extends LoopbackModel<BookingEntity, BookingEntityWithRelations> {}

export type BookingInstance = LoopbackInstance<
  BookingEntity,
  BookingEntityWithRelations
>;

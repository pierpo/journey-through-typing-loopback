export interface UserEntity {
  name: string;
  age: number;
}

export interface VehicleEntity {
  licencePlate: string;
}

interface LoopbackModel<TEntity> {
  find(): Promise<TEntity[]>;
}

export interface UserModel extends LoopbackModel<UserEntity> {}

export interface VehicleModel extends LoopbackModel<VehicleEntity> {}

declare class Loopback {
  models: {
    User: UserModel;
    Vehicle: VehicleModel;
  };
}

export default Loopback;

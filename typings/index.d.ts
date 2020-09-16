export interface UserEntity {
  name: string;
  age: number;
}

export interface VehicleEntity {
  licencePlate: string;
}

export interface UserModel {
  find(): Promise<UserEntity[]>;
}

export interface VehicleModel {
  find(): Promise<VehicleEntity[]>;
}

declare class Loopback {
  models: {
    User: UserModel;
    Vehicle: VehicleModel;
  };
}

export default Loopback;

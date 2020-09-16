export interface UserEntity {
  name: string;
  age: number;
}

export interface UserModel {
  find(): Promise<UserEntity[]>;
}

declare class Loopback {
  models: {
    User: UserModel;
  };
}

export default Loopback;

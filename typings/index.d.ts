export interface UserEntity {
  name: string;
  age: number;
}

export interface VehicleEntity {
  licencePlate: string;
}

type WhereClause<TEntity> = {
  [field in keyof TEntity]?: TEntity[field];
};

interface QueryFilter<TEntity> {
  where: WhereClause<TEntity>;
}

interface LoopbackModel<TEntity> {
  find(filter?: QueryFilter<TEntity>): Promise<TEntity[]>;
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

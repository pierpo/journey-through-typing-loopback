import { UserModel, VehicleModel } from './entities';
import { QueryFilter } from './query';

export type LoopbackInstance<TEntity> = TEntity & {
  update: (payload: Partial<TEntity>) => void;
};

export interface LoopbackModel<TEntity> {
  find(filter?: QueryFilter<TEntity>): Promise<LoopbackInstance<TEntity>[]>;
  findOne(filter?: QueryFilter<TEntity>): Promise<LoopbackInstance<TEntity>>;
}

declare class Loopback {
  models: {
    User: UserModel;
    Vehicle: VehicleModel;
  };
}

export default Loopback;

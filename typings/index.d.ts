import { UserModel, VehicleModel } from './entities';
import { QueryFilter } from './query';

export interface LoopbackModel<TEntity> {
  find(filter?: QueryFilter<TEntity>): Promise<TEntity[]>;
}

declare class Loopback {
  models: {
    User: UserModel;
    Vehicle: VehicleModel;
  };
}

export default Loopback;

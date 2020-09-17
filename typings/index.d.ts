import { UserModel, VehicleModel } from './entities';
import { QueryFilter } from './query';

export type LoopbackInstance<TEntity, TEntityRelations> = TEntity &
  TEntityRelations & {
    update: (payload: Partial<TEntity>) => void;
  };

export interface LoopbackModel<TEntity, TEntityRelations> {
  find(
    filter?: QueryFilter<TEntity, TEntityRelations>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations>[]>;

  findOne(
    filter?: QueryFilter<TEntity, TEntityRelations>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations>>;
}

declare class Loopback {
  models: {
    User: UserModel;
    Vehicle: VehicleModel;
  };
}

export default Loopback;

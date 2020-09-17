import { UserModel, VehicleModel } from './entities';
import { QueryFilter, QueryFilterWithRelation } from './query';

export type LoopbackInstance<
  TEntity,
  TEntityRelations,
  R extends keyof TEntityRelations | null = null
> = TEntity &
  (R extends keyof TEntityRelations ? Pick<TEntityRelations, R> : {}) & {
    update: (payload: Partial<TEntity>) => void;
  };

export interface LoopbackModel<TEntity, TEntityRelations> {
  find(
    filter?: QueryFilter<TEntity>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations>[]>;

  find<R extends keyof TEntityRelations>(
    filter?: QueryFilterWithRelation<TEntity, TEntityRelations, R>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations, R>[]>;

  findOne(
    filter?: QueryFilter<TEntity>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations>>;

  findOne<R extends keyof TEntityRelations>(
    filter?: QueryFilterWithRelation<TEntity, TEntityRelations, R>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations, R>>;
}

declare class Loopback {
  models: {
    User: UserModel;
    Vehicle: VehicleModel;
  };
}

export default Loopback;

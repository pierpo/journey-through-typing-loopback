import { BookingModel, UserModel, VehicleModel } from './entities';
import {
  QueryFilter,
  QueryFilterWith2Relations,
  QueryFilterWithRelation,
} from './query';

export type LoopbackInstance<
  TEntity,
  TEntityRelations,
  R extends keyof TEntityRelations | null = null,
  R2 extends keyof TEntityRelations | null = null
> = TEntity &
  (R extends keyof TEntityRelations ? Pick<TEntityRelations, R> : {}) &
  (R2 extends keyof TEntityRelations ? Pick<TEntityRelations, R2> : {}) & {
    update: (payload: Partial<TEntity>) => void;
  };

export interface LoopbackModel<TEntity, TEntityRelations, TRemoteMethods = {}> {
  find(
    filter?: QueryFilter<TEntity>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations>[]>;

  find<R extends keyof TEntityRelations>(
    filter?: QueryFilterWithRelation<TEntity, TEntityRelations, R>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations, R>[]>;

  find<R extends keyof TEntityRelations, R2 extends keyof TEntityRelations>(
    filter?: QueryFilterWith2Relations<TEntity, TEntityRelations, R, R2>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations, R, R2>[]>;

  findOne(
    filter?: QueryFilter<TEntity>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations>>;

  findOne<R extends keyof TEntityRelations>(
    filter?: QueryFilterWithRelation<TEntity, TEntityRelations, R>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations, R>>;

  findOne<R extends keyof TEntityRelations, R2 extends keyof TEntityRelations>(
    filter?: QueryFilterWith2Relations<TEntity, TEntityRelations, R, R2>
  ): Promise<LoopbackInstance<TEntity, TEntityRelations, R, R2>>;

  remoteMethod<RemoteMethodKey extends keyof TRemoteMethods>(
    name: RemoteMethodKey
  ): void;
}

declare class Loopback {
  models: {
    User: UserModel;
    Vehicle: VehicleModel;
    Booking: BookingModel;
  };
}

export default Loopback;

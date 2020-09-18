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

/**
 * From a typescript type, returns the string associated to the type that we'd want to declare to loopback
 * Type number has to be declared using the string 'number' in loopback
 */
type ExtractLoopbackStringFromType<
  T extends string | number | object | Array<any>
> = T extends string
  ? 'string'
  : T extends number
  ? 'number'
  : T extends Array<any>
  ? 'array'
  : T extends object
  ? 'object'
  : never;

/**
 * Builds a remote method argument declaration
 * { arg: 'argumentName', type: 'number' }
 */
type RemoteMethodArgumentDeclaration<
  ParamType extends string | number | object | Array<any>
> = {
  arg: string;
  type: ExtractLoopbackStringFromType<ParamType>;
};

export interface LoopbackModel<
  TEntity,
  TEntityRelations,
  TRemoteMethods extends { [key: string]: (...args: any[]) => any } = {}
> {
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

  remoteMethod<TRemoteMethodKey extends keyof TRemoteMethods>(
    name: TRemoteMethodKey,
    args: {
      http: {
        verb: 'get' | 'post';
        status: number;
      };
      accepts: [
        RemoteMethodArgumentDeclaration<
          Parameters<TRemoteMethods[TRemoteMethodKey]>[0]
        >,
        RemoteMethodArgumentDeclaration<
          Parameters<TRemoteMethods[TRemoteMethodKey]>[1]
        >
      ];
      returns: {
        root: boolean;
        type: 'number' | 'string' | 'object' | 'array';
      };
    }
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

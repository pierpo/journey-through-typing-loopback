interface NeqQueryOperator<TFieldType> {
  neq: TFieldType;
}

interface InqQueryOperator<TFieldType> {
  inq: TFieldType[];
}

type WhereQueryArgument<TFieldType> =
  | TFieldType
  | NeqQueryOperator<TFieldType>
  | InqQueryOperator<TFieldType>;

type WhereClause<TEntity> = {
  [field in keyof TEntity]?: WhereQueryArgument<TEntity[field]>;
};

export interface QueryFilter<TEntity> {
  where?: WhereClause<TEntity>;
}

export interface QueryFilterWithRelation<
  TEntity,
  TEntityRelations,
  R extends keyof TEntityRelations
> extends QueryFilter<TEntity> {
  include?: R | [R];
}

export interface QueryFilterWith2Relations<
  TEntity,
  TEntityRelations,
  R extends keyof TEntityRelations,
  R2 extends keyof TEntityRelations
> extends QueryFilter<TEntity> {
  include?: [R, R2];
}

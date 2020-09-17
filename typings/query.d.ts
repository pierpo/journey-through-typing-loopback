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
  include?: keyof TEntity;
}

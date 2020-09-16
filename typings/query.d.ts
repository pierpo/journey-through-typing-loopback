interface NeqQueryOperator<TFieldType> {
  neq: TFieldType;
}

type WhereQueryArgument<TFieldType> = TFieldType | NeqQueryOperator<TFieldType>;

type WhereClause<TEntity> = {
  [field in keyof TEntity]?: WhereQueryArgument<TEntity[field]>;
};

export interface QueryFilter<TEntity> {
  where: WhereClause<TEntity>;
}

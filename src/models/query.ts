export type QueryWhereValues = {
	included: string[];
	excluded: string[];
};

export type QuerySortOrder = 'asc' | 'desc';

export type QuerySortValues = {
	key: string;
	order: QuerySortOrder;
};

export type Query = {
	FIELDS: string[];
	LIMIT: number;
	WHERE: Record<string, QueryWhereValues>;
	SORT: QuerySortValues;
};

import type { QueryWhereValues } from '@constants/queries';

export const queryWhere = (key: string, values: QueryWhereValues) => {
	const queries = [];
	const queryKey = key.toLowerCase();

	if (values.included.length > 0) {
		const queryValues = values.included.join(',');
		queries.push(`${queryKey} = (${queryValues})`);
	}

	if (values.excluded.length > 0) {
		const queryValues = values.excluded.join(',');
		queries.push(`${queryKey} != (${queryValues})`);
	}

	return queries.join(' & ');
};

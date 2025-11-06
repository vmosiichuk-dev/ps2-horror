import type { Query } from '@models/query';

import { queryWhere } from '@utils/query';

const INITIAL_QUERY: Query = {
	FIELDS: [
		'id',
		'genres.name',
		'name',
		'total_rating',
		'rating',
		'aggregated_rating',
		'age_ratings.organization.name',
		'age_ratings.rating_category.rating',
		'cover.image_id',
		'first_release_date',
		'involved_companies.developer',
		'involved_companies.company.name',
		'screenshots.image_id',
		'slug',
		'summary',
		'websites.type.type',
		'websites.url',
	],
	LIMIT: 88,
	SORT: {
		key: 'total_rating',
		order: 'desc'
	},
	WHERE: {
		PLATFORMS: {
			included: ['8'],
			excluded: []
		},
		GENRES: {
			included: [],
			excluded: ['4', '10', '16', '34']
		},
		THEMES: {
			included: ['19', '21'],
			excluded: ['35', '39']
		},
		KEYWORDS: {
			included: [],
			excluded: ['5340']
		},
		PLAYER_PERSPECTIVES: {
			included: [],
			excluded: ['4', '5']
		},
		FRANCHISES: {
			included: [],
			excluded: ['463', '824']
		},
		ID: {
			included: [],
			excluded: ['20755', '40106', '145057', '351585', '3837', '2862', '6200', '5143', '2861', '210296', '43614', '11286', '5868', '43262', '43264', '20829', '1159', '43301', '253324', '85965', '172551', '91643', '43633', '43210', '49405', '132163', '136', '260797', '77219', '127959', '20640', '37045', '144966', '203260', '13901', '24096', '64108', '72157', '73012', '726', '3945', '291916']
		}
	}
};

const INITIAL_FIELDS = `fields ${INITIAL_QUERY.FIELDS.join(', ')};`;
const INITIAL_LIMIT = `limit ${String(INITIAL_QUERY.LIMIT)};`;
const INITIAL_SORT = `sort ${INITIAL_QUERY.SORT.key} ${INITIAL_QUERY.SORT.order};`;

const initialWhereQueries = Object.entries(INITIAL_QUERY.WHERE)
	.map(([key, values]) => queryWhere(key, values))
	.filter(Boolean)
	.join(' & ');

const INITIAL_WHERE = initialWhereQueries ? `where ${initialWhereQueries};` : '';

export const INITIAL_QUERY_BODY = [INITIAL_FIELDS, INITIAL_LIMIT, INITIAL_WHERE, INITIAL_SORT]
	.filter(Boolean)
	.join(' ');

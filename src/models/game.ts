export type PS2LifeCycle = 'early' | 'middle' | 'late';

export type Rating = number | 'N/A';
export type ReleaseDate = string | 'Unknown';
export type YearsPast = number | '';
export type Website = { label: string; url: string };

export type AgeRating = {
	ratingLabel: string;
	ratingCoverUrl: string;
};

export type IGDBWebsite = {
	id: number;
	url: string
	type: {
		id: number;
		type: string;
	};
};

export type IGDBAgeRating = {
	id: number;
	organization: {
		id: number;
		name: string;
	};
	rating_category: {
		id: number;
		rating: string;
	};
};

export type GameItem = {
	id: string,
	slug: string;
	title: string;
	summary: string;
	rating: Rating;
	play: boolean;
	wish: boolean;
	ageRatings: AgeRating[];
	genres: string[];
	releaseDate: ReleaseDate;
	yearsPast: YearsPast;
	companyLabel: string;
	companyName: string;
	screenshot: string;
	websites: Website[];
	cover: string;
};

export type IGDBGame = {
	id: number;
	slug: string;
	name?: string;
	summary?: string;
	rating?: number;
	total_rating?: number;
	aggregated_rating?: number;
	first_release_date: number;
	age_ratings?: IGDBAgeRating[];
	websites?: IGDBWebsite[];
	genres?: {
		id: number;
		name: string
	}[];
	cover?: {
		id: number;
		image_id: string
	};
	screenshots?: {
		id: number;
		image_id: string
	}[];
	involved_companies?: {
		id: number;
		developer?: boolean;
		company: {
			id: number;
			name: string
		};
	}[];
};

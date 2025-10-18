export type Rating = number | 'N/A';

export type Website = { category: string; url: string };

export interface GameItem {
	id: string,
	slug: string;
	title: string;
	rating: Rating;
	play: boolean;
	wish: boolean;
	ageRatings: number[];
	genres: string[];
	companyLabel: string;
	companyName: string;
	screenshots: string[];
	websites: Website[];
	src: string;
}

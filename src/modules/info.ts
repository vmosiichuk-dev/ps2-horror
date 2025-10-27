import type { AgeRating, Website } from '@modules/game';

export interface InfoItem {
	title: string;
	summary?: string;
	screenshot?: string;
	screenshotIndex?: number;
	companyLabel?: string;
	companyName?: string;
	genres?: string[];
	ageRatings?: AgeRating[];
	websites?: Website[];
}

export type PS2LifeCycle = 'early' | 'middle' | 'late';

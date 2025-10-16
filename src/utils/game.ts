import gamePrices from '@data/prices.json';
import noCover from '@images/no-cover.webp';

export interface GameItem {
	slug: string;
	title: string;
	rating: number | 'N/A';
	play: boolean;
	wish: boolean;
	priceCategory: string;
	ageRatings: number[];
	genres: string[];
	companyLabel: string;
	companyName: string;
	screenshots: string[];
	websites: { category: string; url: string }[];
	src: string;
	loose: string | number | 'n/a';
	cib: string | number | 'n/a';
	newg: string | number | 'n/a';
}

export const formatGame = (game: any): GameItem => {
	const rating = Math.round(game.total_rating || game.rating || game.aggregated_rating || 0);
	const title = game.name || 'Unknown';
	const src = game.cover
		? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
		: noCover;

	const genres = (game.genres || []).slice(0, 4).map((genre: any) => genre.name);
	const ageRatings = (game.age_ratings || []).map((ageRating: any) => ageRating.rating);

	let companyLabel = '';
	let companyName = '';

	if (game.involved_companies?.length) {
		const dev = game.involved_companies.find((company: any) => company.developer);

		if (dev) {
			companyLabel = 'Developer';
			companyName = dev.company.name;
		} else {
			companyLabel = 'Publisher';
			companyName = game.involved_companies[0].company.name;
		}
	}

	const screenshots = (game.screenshots || [])
		.slice(0, 5)
		.map((screenshot: any) => {
			const url = 'https://images.igdb.com/igdb/image/upload/t_screenshot_big';
			return `${url}/${screenshot.image_id}.jpg`;
		});

	const websites = (game.websites || []).map((website: any) => {
		return { category: website.category, url: website.url };
	});

	const gamePrice = gamePrices.find((game) => game.title === title)?.prices;

	return {
		slug: game.slug,
		title,
		rating: rating === 0 ? 'N/A' : rating,
		play: false,
		wish: false,
		priceCategory: '',
		ageRatings,
		genres,
		companyLabel,
		companyName,
		screenshots,
		websites,
		src,
		loose: gamePrice?.loose || 'n/a',
		cib: gamePrice?.cib || 'n/a',
		newg: gamePrice?.newg || 'n/a'
	};
};

export const formatGames = (games: any[]): GameItem[] => games.map(formatGame);

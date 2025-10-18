import type { GameItem } from '@modules/game';
import noCover from '@images/no-cover.webp';

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

	return {
		id: String(game.id),
		slug: game.slug,
		title,
		rating: rating === 0 ? 'N/A' : rating,
		play: false,
		wish: false,
		ageRatings,
		genres,
		companyLabel,
		companyName,
		screenshots,
		websites,
		src,
	};
};

export const formatGames = (games: any[]): GameItem[] => games.map(formatGame);

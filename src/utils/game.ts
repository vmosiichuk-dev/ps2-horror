import type { IGDBAgeRating, IGDBGame, GameItem, Website, Rating } from '@modules/game';
import type { InfoItem } from '@modules/info';

import { AGE_RATING_MAP, AGE_RATING_PRIORITY, INFO } from '@constants/info';
import { ps2collage } from '@images/screenshots';
import noCover from '@images/no-cover.webp';

export const formatAgeRatings = (ageRatings: IGDBAgeRating[]) => {
	const formatted = ageRatings.map((ageRating: IGDBAgeRating) => {
		const { organization, rating_category } = ageRating;

		const organizationName = organization?.name?.toLowerCase() || '';
		const categoryRating = rating_category?.rating?.toLowerCase() || '';

		const ratingLabel = (organizationName + categoryRating).replace(/[ _+]+/g, '');
		const ratingCoverUrl = AGE_RATING_MAP[ratingLabel] ?? '';

		return { ratingLabel, ratingCoverUrl };
	});

	if (formatted.length <= 3) return formatted;
	const organizations = Object.keys(AGE_RATING_PRIORITY);

	const sorted = formatted.sort((a, b) => {
		const aLabel = organizations.find(org => a.ratingLabel.startsWith(org)) ?? 'fallback';
		const bLabel = organizations.find(org => b.ratingLabel.startsWith(org)) ?? 'fallback';
		return AGE_RATING_PRIORITY[bLabel] - AGE_RATING_PRIORITY[aLabel];
	});

	return sorted.slice(0, 3);
};

const mergeGameWithInfo = (game: GameItem, screenshots: string[]): GameItem => {
	const allInfo = (INFO as Record<string, InfoItem>)[game.id];
	const { screenshotIndex, title: _title, ...info } = allInfo ?? {};

	return {
		...game,
		...info,
		screenshot: allInfo?.screenshot || screenshots[screenshotIndex ?? 0] || game.screenshot,
	};
};

export const formatGame = (game: IGDBGame): GameItem => {
	const rating = Math.round(game.total_rating || game.rating || game.aggregated_rating || 0);
	const title = game.name || 'Unknown';
	const cover = game.cover
		? `https://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`
		: noCover;

	const genres = (game.genres ?? []).slice(0, 4)
		.map((genre) => genre.name);

	const ageRatings = formatAgeRatings(game.age_ratings ?? []);
	console.log({ [title]: ageRatings });

	let companyLabel = '';
	let companyName = '';

	if (game.involved_companies?.length) {
		const dev = game.involved_companies
			.find((company) => company.developer);

		if (dev) {
			companyLabel = 'Developer';
			companyName = dev.company.name;
		} else {
			companyLabel = 'Publisher';
			companyName = game.involved_companies[0].company.name;
		}
	}

	const websites = (game.websites ?? [])
		.map(({ type, url }): Website => ({ label: type.type, url }));

	const googleSearchURL = 'https://www.google.com/search?q=';
	const sanitizedTitle = title.toLowerCase().replace(/ /g, '+');

	const fallbackWebsite = {
		label: 'Google',
		url: `${googleSearchURL}${sanitizedTitle}+ps2`,
	};

	const release = game.first_release_date * 1000;

	const releaseDate = game?.first_release_date
		? new Date(release).toLocaleDateString('en-us', { year:'numeric', month:'short', day:'numeric' })
		: 'Unknown';

	const releaseYear = game?.first_release_date
		? new Date(release).getFullYear()
		: 'Unknown';

	const yearsPast: GameItem['yearsPast'] = releaseYear !== 'Unknown'
		? new Date().getFullYear() - releaseYear
		: '';

	const screenshots = (game.screenshots ?? [])
		.slice(0, 5)
		.map((screenshot) => {
			const url = 'https://images.igdb.com/igdb/image/upload/t_screenshot_big';
			return `${url}/${screenshot.image_id}.jpg`;
		});

	const formattedGame = {
		id: String(game.id),
		slug: game.slug,
		title,
		summary: game.summary ?? '',
		rating: (rating === 0 ? 'N/A' : rating) as Rating,
		play: false,
		wish: false,
		ageRatings,
		genres,
		companyLabel,
		companyName,
		releaseDate,
		yearsPast,
		screenshot: ps2collage,
		websites: websites.length === 0 ? [fallbackWebsite] : websites,
		cover,
	};

	return mergeGameWithInfo(formattedGame, screenshots);
};

export const formatGames = (games: IGDBGame[]): GameItem[] => games.map(formatGame);

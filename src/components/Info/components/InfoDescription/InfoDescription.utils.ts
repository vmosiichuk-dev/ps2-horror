import type { ReleaseDate, GameItem, PS2LifeCycle } from '@models/game';

const getPS2LifeCycle = (releaseDate: ReleaseDate, hasReleaseDate: boolean): PS2LifeCycle => {
	if (!hasReleaseDate) return 'middle';

	const year = Number(releaseDate.slice(-4));
	if (year <= 2004) return 'early';
	if (year >= 2009) return 'late';

	return 'middle';
};

const formatSummaryGenres = (genres: GameItem['genres']) => {
	if (!genres.length) return 'experience';

	const primaryGenre = genres[0].toLowerCase();
	const secondaryGenre = genres[1] ? ` with ${genres[1].toLowerCase()} gameplay elements` : '';

	return `${primaryGenre} experience${secondaryGenre}`;
};

const formatSummaryRelease = (activeGame: GameItem, hasReleaseDate: boolean) => {
	const getAction = (
		{ companyName, companyLabel, releaseDate }: GameItem,
		cancelled: string
	) => {
		if (!companyName && !hasReleaseDate) return cancelled;

		const release = releaseDate.slice(-4);
		if (!companyName) return `released in ${release}`;

		const action = companyLabel.slice(0, -2).toLowerCase() + 'ed';
		return `${action} by ${companyName} in ${release}`;
	};

	const cancelled = `cancelled before being published.`;
	const openingStatement = `The game was ${getAction(activeGame, cancelled)}`;

	const ps2LifeCycle = getPS2LifeCycle(activeGame.releaseDate, hasReleaseDate);
	const closingStatement = hasReleaseDate
		? `, making its debut during the ${ps2LifeCycle} stages of the PS2's lifecycle.`
		: `, but was ${cancelled}`;

	return `${openingStatement}${closingStatement}`;
};

export const getSummary = (activeGame: GameItem, hasReleaseDate: boolean) => {
	if (activeGame.summary) return activeGame.summary;

	const genres = formatSummaryGenres(activeGame.genres);
	const release = formatSummaryRelease(activeGame, hasReleaseDate);

	const websiteHint = activeGame.websites.length > 0
		? ` If you're keen to know more about this unique title, follow the provided links.`
		: '';

	const openingStatement = `${activeGame.title} is a noteworthy addition to the PlayStation 2 library`;
	const closingStatement = `offering a captivating and visually stunning ${genres}`;

	return `${openingStatement}, ${closingStatement}. ${release}${websiteHint}`;
};

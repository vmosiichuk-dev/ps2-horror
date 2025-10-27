import { clsx } from 'clsx';
import { useInfoStore } from '@store/useInfoStore';
import { InfoCategories, InfoDescription, InfoMedia, InfoTitle } from './components';
import menuImg from '@images/plus.svg';
import '@styles/info.css';

export const Info = () => {
	const activeGame = useInfoStore(state => state.activeGame);
	const openedInfo = useInfoStore(state => state.openedInfo);
	const closeInfo = useInfoStore(state => state.closeInfo);

	if (!activeGame) return null;

	const hasReleaseDate = activeGame.releaseDate !== 'Unknown';
	const hasOneCategory = activeGame.genres.length < 1 && !activeGame.companyName;
	const hasTwoCategories = activeGame.genres.length < 1 || !activeGame.companyName;

	const subtitle = hasReleaseDate
		? `${activeGame.releaseDate} (${activeGame.yearsPast} years ago)`
		: 'Cancelled / Never released';

	return (
		<article
			tabIndex={openedInfo ? 0 : -1}
			aria-label={`Sidebar with game details. Selected game: ${activeGame.title}`}
			className={clsx('info', { 'is-active': openedInfo })}
		>
			<button
				type="button"
				tabIndex={0}
				onClick={closeInfo}
				className={clsx('btn info__close-btn', { 'info__close-btn--fixed': openedInfo })}
			>
				<img className="btn__img is-active" src={menuImg} alt="Close game information" />
			</button>

			<div
				className={clsx('info__container', {
					'has-one-category': hasOneCategory,
					'has-two-categories': hasTwoCategories,
				})}
			>
				<InfoMedia
					id={activeGame.id}
					screenshot={activeGame.screenshot}
					cover={activeGame.cover}
					title={activeGame.title}
					openedInfo={openedInfo}
				/>

				<InfoTitle
					ageRatingsLength={activeGame.ageRatings.length}
					title={activeGame.title}
					subtitle={subtitle}
					rating={activeGame.rating}
					hasReleaseDate={hasReleaseDate}
				/>

				<InfoDescription
					activeGame={activeGame}
					hasReleaseDate={hasReleaseDate}
					openedInfo={openedInfo}
				/>

				<InfoCategories
					companyLabel={activeGame.companyLabel}
					companyName={activeGame.companyName}
					genres={activeGame.genres}
					ageRatings={activeGame.ageRatings}
					websites={activeGame.websites}
					openedInfo={openedInfo}
				/>
			</div>
		</article>
	);
};

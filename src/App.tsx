import type { GameItem } from '@modules/game';

import { clsx } from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useGameStore } from '@store/useGameStore';
import { useInfoStore } from '@store/useInfoStore';
import { usePriceStore } from '@store/usePriceStore';
import { WelcomeScreen, Navigation, Info, Game } from '@components';
import { ERRORS } from '@constants/text';
import '@styles/game-list.css';
import '@styles/app.css';

export const App = () => {
	const games = useGameStore(state => state.games);
	const gamesLoaded = useGameStore(state => state.gamesLoaded);

	const setActiveGame = useInfoStore(state => state.setActiveGame);

	const activeFilter = usePriceStore(state => state.activeFilter);
	const getPrice = usePriceStore(state => state.getPrice);

	const filteredGames = useMemo(() => games.filter(game => {
		switch (activeFilter) {
			case 'play': return game.play;
			case 'wish': return game.wish;
			case 'coll': return getPrice(game).priceCategory !== '';
			default: return true;
		}
	}), [games, activeFilter, getPrice]);

	const [transitionStart, setTransitionStart] = useState(false);

	useEffect(() => {
		if (filteredGames.length > 0) {
			const openedInfo = false;
			setActiveGame(filteredGames[0], openedInfo);
		}
	}, [setActiveGame, filteredGames]);

	const progressCount = filteredGames.length;
	const progressTotal = games.length;
	const progressPercent = progressTotal > 0 ? Math.round((progressCount / progressTotal) * 100) : 0;
	const progressLabel = activeFilter === 'play' ? 'Played' : 'Collected';

	return (
		<>
			<WelcomeScreen
				transitionStart={transitionStart}
				setTransitionStart={setTransitionStart}
			/>

			<div
				className={clsx('app', { ['has-faded-in']: transitionStart })}
				aria-hidden={!gamesLoaded}
			>
				<Navigation
					progressCount={progressCount}
					progressTotal={progressTotal}
					progressPercent={`${progressPercent}%`}
					progressLabel={progressLabel}
				/>

				<Info />

				<main className="main">
					{!gamesLoaded && <p className="error">{ERRORS.MAIN_PAGE}</p>}

					<ul
						className={clsx('game-list', {
							'game-list--8': filteredGames.length <= 8,
							'game-list--10': filteredGames.length > 8 && filteredGames.length <= 10,
							'game-list--12': filteredGames.length > 10 && filteredGames.length <= 12,
							'game-list--24': filteredGames.length > 12 && filteredGames.length <= 24,
						})}
					>
						{filteredGames.map((game: GameItem) => (
							<Game key={game.id} game={game} />
						))}
					</ul>
				</main>
			</div>
		</>
	);
};

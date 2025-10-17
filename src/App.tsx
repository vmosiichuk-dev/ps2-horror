import type { GameItem } from '@utils/game';
import { clsx } from 'clsx';
import { useState } from 'react';
import { useGameStore } from '@store/useGameStore';
import { WelcomeScreen, Game } from '@components';
import { ERRORS } from '@constants/text';
import '@styles/app.css';
import '@styles/game-list.css';

export const App = () => {
	const { data, gamesLoaded } = useGameStore();
	const [transitionStart, setTransitionStart] = useState(false);

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
				<main className="main">
					{!gamesLoaded && <p className="error">{ERRORS.MAIN_PAGE}</p>}

					<ul
						className={clsx('game-list', {
							'game-list--8': data.length <= 8,
							'game-list--10': data.length <= 10,
							'game-list--12': data.length <= 12,
							'game-list--24': data.length <= 24,
						})}
					>
						{data.map((game: GameItem) => (
							<Game key={game.slug} game={game} />
						))}
					</ul>
				</main>
			</div>
		</>
	);
};

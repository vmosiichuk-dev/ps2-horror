import { clsx } from 'clsx';
import { useState } from 'react';
import { useGameStore } from '@store/useGameStore';
import { WelcomeScreen, GameList } from '@components';
import { ERRORS } from '@constants/text';
import '@styles/app.css';

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
					<GameList data={data} />
				</main>
			</div>
		</>
	);
};

import { clsx } from 'clsx';
import { useState, useRef } from 'react';
import { useGameStore } from '@store/useGameStore';
import { CSSTransition } from 'react-transition-group';
import { Loader } from '@components';
import { BUTTON_TEXT } from '@constants/text';
import ps from '@images/ps-logo.svg';

interface WelcomeScreenProps {
	transitionStart: boolean;
	setTransitionStart: (transitionStart: boolean) => void;
}

export const WelcomeScreen = ({ transitionStart, setTransitionStart }: WelcomeScreenProps) => {
	const gamesLoaded = useGameStore(state => state.gamesLoaded);
	const setInitialGames = useGameStore(state => state.setInitialGames);

	const nodeRef = useRef(null);
	const [loaderVisible, setLoaderVisible] = useState(false);

	const handleWelcomeClick = async () => {
		setLoaderVisible(true);

		try {
			await setInitialGames();
		} catch {
			setLoaderVisible(false);
		}
	};

	return (
		<CSSTransition
			in={!transitionStart}
			timeout={1200}
			classNames="welcome"
			unmountOnExit
			nodeRef={nodeRef}
		>
			<div ref={nodeRef} className="welcome">
				<h1 className="welcome__title">
					<span className="a11y">PS2 Game Library — </span>
					<img src={ps} alt=""/>
					Survival Horror Classics
				</h1>

				<section className="fog__section">
					<div className="fog__container">
						<div className="fog fog--one"></div>
						<div className="fog fog--two"></div>
					</div>
				</section>

				<div className="welcome__container">
					<p className={clsx('welcome__subtitle', { ['has-faded-out']: loaderVisible })}>
						Witness the evolution of fear with our PS2 Collection App.
					</p>

					<p className={clsx('welcome__text', { ['has-faded-out']: loaderVisible })}>
						Create your own personalised collection, track & share your progress.
					</p>

					<button
						className={clsx('btn btn--welcome', {
							['has-faded-in']: !transitionStart,
							['has-faded-out']: loaderVisible
						})}
						onClick={handleWelcomeClick}
					>
						{gamesLoaded ? BUTTON_TEXT.CONTINUE : BUTTON_TEXT.START}
					</button>
				</div>

				<Loader
					loaderVisible={loaderVisible}
					setTransitionStart={setTransitionStart}
				/>
			</div>
		</CSSTransition>
	);
}

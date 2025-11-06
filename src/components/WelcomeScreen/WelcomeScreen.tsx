import type { AuthProvider, CaptchaToken } from '@models/auth';

import { clsx } from 'clsx';
import { useState, useRef, useEffect } from 'react';
import { useAuthStore, useGameStore } from '@store';
import { CSSTransition } from 'react-transition-group';
import { Turnstile } from '@marsidev/react-turnstile';
import { Loader } from '@components';
import { PROVIDERS } from '@constants/auth';
import { BUTTON_TEXT } from '@constants/text';
import ps from '@images/ps-logo.svg';

type WelcomeScreenProps = {
	transitionStart: boolean;
	setTransitionStart: (transitionStart: boolean) => void;
};

const TRANSITION_TIMEOUT = 700; // 1200

export const WelcomeScreen = ({
	transitionStart,
	setTransitionStart
}: WelcomeScreenProps) => {
	const user = useAuthStore(state => state.user);
	const authPending = useAuthStore(state => state.authPending);
	const restoreSession = useAuthStore(state => state.restoreSession);

	const loginGuest = useAuthStore(state => state.loginGuest);
	const loginProvider = useAuthStore(state => state.loginProvider);

	const gamesLoaded = useGameStore(state => state.gamesLoaded);
	const setInitialGames = useGameStore(state => state.setInitialGames);

	const nodeRef = useRef(null);
	const [loaderVisible, setLoaderVisible] = useState<boolean>(false);
	const [turnstileToken, setTurnstileToken] = useState<CaptchaToken>(null);

	const login = async (
		authRequest: () => Promise<void>
	) => {
		setLoaderVisible(true);

		if (!user) {
			await authRequest();
			const loginError = useAuthStore.getState().authError;
			if (loginError) return;
		}

		if (!gamesLoaded) await setInitialGames();
	};

	const loginWithTurnstile = () => {
		void login(() => loginGuest(turnstileToken));
	};

	const loginWithProvider = (provider: AuthProvider) => {
		void login(() => loginProvider(provider));
	};

	useEffect(() => {
		const initialize = async () => {
			setLoaderVisible(true);

			await restoreSession(); // TODO –– return user in useAuthStore
			const restoredUser = useAuthStore.getState().user;

			if (!restoredUser) setLoaderVisible(false);
			if (!gamesLoaded) await setInitialGames();
		};

		void initialize();
	}, []); // eslint-disable-line

	return (
		<CSSTransition
			in={!transitionStart}
			timeout={TRANSITION_TIMEOUT}
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

				{!user && (
					<div className="welcome__container">
						<p className={clsx('welcome__subtitle', { ['has-faded-out']: loaderVisible })}>
							Witness the evolution of fear with our PS2 Collection App.
						</p>

						<p className={clsx('welcome__text', { ['has-faded-out']: loaderVisible })}>
							Create your own personalised collection, track & share your progress.
						</p>

						<button
							onClick={() => loginWithProvider(PROVIDERS.TWITCH)}
							disabled={authPending}
							className={clsx('btn btn--welcome', {
								['has-faded-in']: !transitionStart,
								['has-faded-out']: loaderVisible
							})}
						>
							{BUTTON_TEXT.LOGIN_TWITCH}
						</button>

						<button
							onClick={() => loginWithProvider(PROVIDERS.GITHUB)}
							disabled={authPending}
							className={clsx('btn btn--welcome', {
								['has-faded-in']: !transitionStart,
								['has-faded-out']: loaderVisible
							})}
						>
							{BUTTON_TEXT.LOGIN_GITHUB}
						</button>

						<button
							onClick={() => loginWithProvider(PROVIDERS.DISCORD)}
							disabled={authPending}
							className={clsx('btn btn--welcome', {
								['has-faded-in']: !transitionStart,
								['has-faded-out']: loaderVisible
							})}
						>
							{BUTTON_TEXT.LOGIN_DISCORD}
						</button>

						<Turnstile
							siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
							onSuccess={setTurnstileToken}
							options={{ size: 'invisible' }}
						/>

						<button
							onClick={loginWithTurnstile}
							disabled={!turnstileToken || authPending}
							className={clsx('btn btn--welcome', {
								['has-faded-in']: !transitionStart,
								['has-faded-out']: loaderVisible
							})}
						>
							{BUTTON_TEXT.LOGIN_GUEST}
						</button>
					</div>
				)}

				<Loader
					timeout={TRANSITION_TIMEOUT}
					loaderVisible={loaderVisible}
					setLoaderVisible={setLoaderVisible}
					setTransitionStart={setTransitionStart}
				/>
			</div>
		</CSSTransition>
	);
}

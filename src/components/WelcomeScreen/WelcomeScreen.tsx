import type { AppState } from '@store/useAppStore';
import { clsx } from 'clsx';
import { Loader } from '@components';
import ps from '@images/ps-logo.svg';

interface WelcomeScreenProps {
	animationReset: boolean;
	transitionStart: boolean;
	welcomeClick: boolean;
	loaderError: boolean;
	buttonText: string;
	onStateChange: (key: keyof AppState) => void;
}

export const WelcomeScreen = ({
	animationReset,
	transitionStart,
	welcomeClick,
	loaderError,
	buttonText,
	onStateChange,
}: WelcomeScreenProps) => (
	<div className={clsx('welcome', { ['is-active']: transitionStart })}>
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
			<p className={clsx('welcome__subtitle', { ['has-faded-out']: welcomeClick })}>
				Witness the evolution of fear with our PS2 Collection App.
			</p>

			<p className={clsx('welcome__text', { ['has-faded-out']: welcomeClick })}>
				Create your own personalised collection, track & share your progress.
			</p>

			<button
				className={clsx('btn btn--welcome', {
					['has-faded-in']: !welcomeClick,
					['has-faded-out']: welcomeClick && animationReset
				})}
				onClick={() => onStateChange("welcomeClick")}
			>
				{buttonText}
			</button>
		</div>

		<Loader welcomeClick={welcomeClick} loaderError={loaderError} />
	</div>
);

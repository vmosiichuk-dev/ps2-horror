import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import { useAuthStore, useGameStore } from '@store';
import { LOADER_MESSAGE } from '@constants/text';
import loaderGif from '@images/loader.gif';
import '@styles/loader.css';

type LoaderProps = {
	timeout: number;
	loaderVisible: boolean;
	setLoaderVisible: (loaderVisible: boolean) => void;
	setTransitionStart: (transitionStart: boolean) => void;
};

export const Loader = ({
	timeout,
	loaderVisible,
	setLoaderVisible,
	setTransitionStart
}: LoaderProps) => {
	const authError = useAuthStore(state => state.authError);
	const gamesError = useGameStore(state => state.gamesError);
	const gamesLoaded = useGameStore(state => state.gamesLoaded);

	const [loaderMessage, setLoaderMessage] = useState(LOADER_MESSAGE.INITIAL);

	useEffect(() => {
		if (!loaderVisible) return;

		if (gamesError) {
			setLoaderMessage(LOADER_MESSAGE.ERROR_GAMES);
			setLoaderVisible(false);
		} else if (authError) {
			setLoaderMessage(LOADER_MESSAGE.ERROR_AUTH);
			setLoaderVisible(false);
		} else if (gamesLoaded) {
			// const secondMessageTimeout = setTimeout(() => {
			// 	setLoaderMessage(LOADER_MESSAGE.ACTIVE);
			// }, timeout);

			const endLoadingTimeout = setTimeout(() => {
				setTransitionStart(true);
			}, timeout / 1.5); // timeout * 2

			return () => {
				// clearTimeout(secondMessageTimeout);
				clearTimeout(endLoadingTimeout);
			}
		}
	}, [loaderVisible, gamesLoaded, gamesError, setTransitionStart]);

	return (
		<div
			className={clsx('loader', { ['is-active']: loaderVisible })}
			role="status"
		>
			<img className="loader__gif" src={loaderGif} alt="" />
			<p
				className={clsx('loader__error', {
					['is-active']: loaderVisible && !gamesLoaded
				})}
			>
				{loaderMessage}
			</p>
		</div>
	);
};

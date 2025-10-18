import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import { useGameStore } from '@store/useGameStore';
import { LOADER_MESSAGE } from '@constants/text';
import loaderGif from '@images/loader.gif';
import '@styles/loader.css';

const LOADER_TIMEOUT = 1200;

interface LoaderProps {
	loaderVisible: boolean;
	setTransitionStart: (transitionStart: boolean) => void;
}

export const Loader = ({ loaderVisible, setTransitionStart }: LoaderProps) => {
	const { gamesLoaded, gamesError } = useGameStore();
	const [loaderMessage, setLoaderMessage] = useState(LOADER_MESSAGE.INITIAL);

	useEffect(() => {
		if (loaderVisible && gamesError) {
			setLoaderMessage(LOADER_MESSAGE.ERROR);
		} else if (loaderVisible && gamesLoaded) {
			const secondMessageTimeout = setTimeout(() => {
				setLoaderMessage(LOADER_MESSAGE.ACTIVE);
			}, LOADER_TIMEOUT);

			const endLoadingTimeout = setTimeout(() => {
				setTransitionStart(true);
			}, LOADER_TIMEOUT * 2);

			return () => {
				clearTimeout(secondMessageTimeout);
				clearTimeout(endLoadingTimeout);
			}
		}
	}, [loaderVisible, gamesLoaded, gamesError]);

	return (
		<div
			className={clsx('loader', { ['is-active']: loaderVisible })}
			role="status"
		>
			<img className="loader__gif" src={loaderGif} alt="" />
			<p className={clsx('loader__error', { ['is-active']: loaderVisible })}>
				{loaderMessage}
			</p>
		</div>
	);
};

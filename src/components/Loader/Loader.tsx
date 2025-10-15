import { clsx } from 'clsx';
import { useState, useEffect } from 'react';
import { LOADER_MESSAGE } from '@constants/text';
import loaderGif from '@images/loader.gif';
import '@styles/loader.css';

const LOADER_TIMEOUT = 1900;

interface LoaderProps {
	welcomeClick: boolean;
	loaderError: boolean;
}

export const Loader = ({
	welcomeClick,
	loaderError,
}: LoaderProps) => {
	const [loaderMessage, setLoaderMessage] = useState(LOADER_MESSAGE.INITIAL);

	useEffect(() => {
		if (loaderError) {
			setLoaderMessage(LOADER_MESSAGE.ERROR);
		} else if (welcomeClick) {
			const secondMessageTimeout = setTimeout(() => {
				setLoaderMessage(LOADER_MESSAGE.ACTIVE);
			}, LOADER_TIMEOUT);

			return () => clearTimeout(secondMessageTimeout);
		}
	}, [welcomeClick, loaderError]);

	return (
		<div
			className={clsx('loader', { ['is-active']: welcomeClick })}
			role="status"
		>
			<img className="loader__gif" src={loaderGif} alt="" />
			<p className={clsx('loader__error', { ['is-active']: welcomeClick })}>
				{loaderMessage}
			</p>
		</div>
	);
};

import type { GameItem } from '@models/game';

import { clsx } from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import { getSummary } from './InfoDescription.utils';

import upArrow from '@images/up.svg';
import downArrow from '@images/down.svg';

type InfoDescriptionProps = {
	activeGame: GameItem;
	hasReleaseDate: boolean;
	openedInfo: boolean;
};

export const InfoDescription = ({
	activeGame,
	hasReleaseDate,
	openedInfo,
}: InfoDescriptionProps) => {
	const infoDescWrapperRef = useRef<HTMLDivElement | null>(null);
	const infoDescRef = useRef<HTMLParagraphElement | null>(null);

	const [descriptionOverflows, setDescriptionOverflows] = useState(false);

	useEffect(() => {
		if (!infoDescRef.current || !infoDescWrapperRef.current) return;

		const wrapperStyle = getComputedStyle(infoDescWrapperRef.current);
		const innerHeight = infoDescRef.current.scrollHeight;

		let wrapperHeight = infoDescWrapperRef.current.clientHeight;
		wrapperHeight -= parseFloat(wrapperStyle.paddingTop) + parseFloat(wrapperStyle.paddingBottom);

		setDescriptionOverflows(innerHeight > wrapperHeight);
	}, [activeGame?.summary]);

	const summary = useMemo(() => {
		return getSummary(activeGame, hasReleaseDate);
	}, [activeGame, hasReleaseDate]);

	return (
		<div className="info__description-wrapper" ref={infoDescWrapperRef}>
			<p
				ref={infoDescRef}
				tabIndex={openedInfo ? 0 : -1}
				className={clsx('info__description', { 'has-space': !descriptionOverflows })}
			>
				{summary}
			</p>

			<img
				alt=""
				src={upArrow}
				className={clsx('info__description-hint', 'info__description-hint--up', {
					'is-active': openedInfo && descriptionOverflows
				})}
			/>

			<img
				alt=""
				src={downArrow}
				className={clsx('info__description-hint', {
					'is-active': openedInfo && descriptionOverflows
				})}
			/>
		</div>
	);
};

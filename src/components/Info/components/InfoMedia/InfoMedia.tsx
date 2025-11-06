import { useEffect, useRef } from 'react';
import overlay from '@images/overlay.png';

type InfoMediaProps = {
	id: string;
	screenshot: string;
	cover: string;
	title: string;
	openedInfo: boolean;
};

export const InfoMedia = ({
	id,
	screenshot,
	cover,
	title,
	openedInfo,
}: InfoMediaProps) => {
	const screenshotRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (openedInfo && screenshotRef.current) {
			screenshotRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}, [openedInfo, id]);

	return (
		<>
			<div className="info__screenshot" ref={screenshotRef}>
				<img className="info__screenshot-img" src={screenshot} alt="" />
				<div className="info__screenshot-shadow"></div>
			</div>

			<div className="game info__game-cover">
				<img
					className="game__cover-img"
					src={cover}
					alt={`PS2 cover for ${title}`}
				/>

				<img className="game__cover-overlay" src={overlay} alt="" />
			</div>
		</>
	);
};

import type { Rating } from '@models/game';

import { clsx } from 'clsx';

type InfoTitleProps = {
	ageRatingsLength: number;
	title: string;
	subtitle: string;
	rating: Rating;
	hasReleaseDate: boolean;
};

export const InfoTitle = ({
	ageRatingsLength,
	title,
	subtitle,
	rating,
	hasReleaseDate,
}: InfoTitleProps) => (
	<div className={clsx('info__title-wrapper', { 'has-space': ageRatingsLength < 1 })}>
		<h2 className="info__title">{title}</h2>

		<div className="info__subtitle-wrapper">
			<h3 className="info__subtitle">
				{subtitle}
			</h3>

			{hasReleaseDate && (
				<>
					<div className="btn info__rating-btn">{rating}</div>
					<p className="info__rating-label" aria-hidden={true}>Rating</p>
				</>
			)}
		</div>
	</div>
);

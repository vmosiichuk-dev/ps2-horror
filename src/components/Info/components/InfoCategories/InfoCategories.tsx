import type { AgeRating, Website } from '@modules/game';
import { InfoCategory } from './components';

interface InfoCategoriesProps {
	companyLabel: string;
	companyName: string;
	genres: string[];
	ageRatings : AgeRating[];
	websites: Website[];
	openedInfo: boolean;
}

export const InfoCategories = ({
	companyLabel,
	companyName,
	genres,
	ageRatings,
	websites,
	openedInfo,
}: InfoCategoriesProps) => (
	<>
		{(companyLabel && companyName) && (
			<InfoCategory title={companyLabel}>
				<span>{companyName}</span>
			</InfoCategory>
		)}

		{genres.length > 0 && (
			<InfoCategory title="Genres">
				{genres.map(genre => (
					<p className="m-0" key={genre}>{genre}</p>
				))}
			</InfoCategory>
		)}

		{ageRatings.length > 0 && (
			<div className="info__age-container">
				<h3 className="a11y">Age Ratings</h3>

				{ageRatings.map(({ ratingLabel, ratingCoverUrl }, index) => (
					<div key={`${ratingLabel}-${index}`}>
						<p className="a11y">{ratingLabel}</p>
						<img className="info__age" src={ratingCoverUrl} alt={ratingLabel} />
					</div>
				))}
			</div>
		)}

		{websites.length > 0 && (
			<InfoCategory title="Links">
				{websites.map(website => (
					<a
						key={website.label}
						href={website.url}
						target="_blank"
						rel="noopener noreferrer"
						tabIndex={openedInfo ? 0 : -1}
						className="info__category-link"
					>
						{website.label}
					</a>
				))}
			</InfoCategory>
		)}
	</>
);

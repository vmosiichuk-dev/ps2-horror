import type { ReactNode } from 'react';
import { clsx } from 'clsx';

interface InfoCategoryProps {
	title: string;
	children: ReactNode;
}

export const InfoCategory = ({ title, children }: InfoCategoryProps) => {
	return (
		<div className={clsx('info__category', `_${title.toLowerCase()}`)}>
			<h3 className="info__category-title">{title}</h3>

			<div className="info__category-items">
				{children}
			</div>
		</div>
	);
};

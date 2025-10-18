import type { PriceCategory, Price } from '@modules/price';

import { clsx } from 'clsx';
import { usePriceStore } from '@store/usePriceStore';

import looseIcon from '@images/loose-icon.png';
import cibIcon from '@images/cib-icon.png';
import newgIcon from '@images/newg-icon.png';

interface GamePriceOptionProps {
	id: string,
	slug?: string;
	price: Price,
	category: PriceCategory;
	targetCategory?: PriceCategory,
}

export const GamePricesOption = ({
	id,
	slug = 'total',
	price,
	category,
	targetCategory,
}: GamePriceOptionProps) => {
	const { updatePriceCategory } = usePriceStore();
	const Element = id ? 'button' : 'div';

	const getIcon = (category: PriceCategory) => {
		switch (category) {
			case 'cib': return cibIcon;
			case 'newg': return newgIcon;
			default: return looseIcon;
		}
	};

	const getIconClass = (category: PriceCategory) => {
		return clsx('game-price__icon', {
			'game-price__icon--value': !id,
			[`game-price__icon--${category}`]: !id || targetCategory === category,
		});
	};

	const getBtnClass = (category: PriceCategory) => {
		return clsx('btn', 'game-price__btn', {
			'game-price__btn--value': !id,
			[`game-price__btn--${category}`]: !id || targetCategory === category,
		});
	};

	const handleClick = () => {
		if (id) updatePriceCategory(id, category);
	};

	return (
		<Element
			type={id ? 'button' : undefined}
			className={getBtnClass(category)}
			id={`${slug}--toolbar-${category}`}
			onClick={handleClick}
			tabIndex={id ? 0 : -1}
		>
			<img className={getIconClass(category)} src={getIcon(category)} alt="" />

			{price !== 'n/a' && (
				<span
					className={clsx('game-price__usd', {
						'game-price__usd--value': id }
					)}
				>
					$
				</span>
			)}

			<span>{price}</span>
		</Element>
	);
};

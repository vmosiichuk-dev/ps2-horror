import type { GameItem } from '@modules/game';

import { usePriceStore } from '@store/usePriceStore';
import { GamePricesOption } from '@components';
import '@styles/game-price.css';

interface GamePriceProps {
	game: GameItem;
}

export const GamePrices = ({
	game,
}: GamePriceProps) => {
	const activeFilter = usePriceStore(state => state.activeFilter);
	const { wishPriceCategory, priceCategory, loose, cib, newg } = usePriceStore(state => state.getPrice(game));

	const isWish = activeFilter === 'wish';
	const targetCategory = isWish ? wishPriceCategory : priceCategory;

	const toolbarLabel = isWish
		? 'Choose a price category you would like to own to calculate a value of your wishlist:'
		: 'Choose a price category you own to add a game to your collection:';

	return (
		<div
			className="game-price"
			role="toolbar"
			tabIndex={0}
			aria-label={toolbarLabel}
		>
			<GamePricesOption
				id={game.id}
				slug={game.slug}
				price={loose}
				category="loose"
				targetCategory={targetCategory}
			/>

			<GamePricesOption
				id={game.id}
				slug={game.slug}
				price={cib}
				category="cib"
				targetCategory={targetCategory}
			/>

			<GamePricesOption
				id={game.id}
				slug={game.slug}
				price={newg}
				category="newg"
				targetCategory={targetCategory}
			/>
		</div>
	);
};

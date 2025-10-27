import { useMemo } from 'react';
import { useGameStore } from '@store/useGameStore';
import { usePriceStore } from '@store/usePriceStore';
import { GamePricesOption } from '@components';
import '@styles/game-price.css';

export const TotalGamePrices = () => {
	const games = useGameStore(state => state.games);
	const activeFilter = usePriceStore(state => state.activeFilter);
	const getTotal = usePriceStore(state => state.getTotal);

	const isWish = activeFilter === 'wish';

	const total = useMemo(() => {
		return getTotal(games, activeFilter);
	}, [getTotal, games, activeFilter]);

	const grandTotal = total.loose + total.cib + total.newg;

	return (
		<div
			className="game-price game-price--value"
			tabIndex={-1}
			aria-label={`Value of games in your ${isWish ? 'wishlist' : 'collection'}:`}
		>
			<GamePricesOption
				price={total.loose}
				category="loose"
			/>

			<GamePricesOption
				price={total.cib}
				category="cib"
			/>

			<GamePricesOption
				price={total.newg}
				category="newg"
			/>

			<div className="game-price__total">
				<p className="game-price__total-label">Total:</p>
				<span className="game-price__usd game-price__usd--value">$</span>
				<span>{grandTotal.toLocaleString()}</span>
			</div>
		</div>
	);
};

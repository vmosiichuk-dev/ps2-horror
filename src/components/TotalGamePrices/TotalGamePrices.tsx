// import type { PriceCategory, ActiveFilter } from '@modules/price';
// import type { GameItem } from '@modules/game';
//
// import { GamePricesOption } from '@components';
// import looseIcon from '@images/loose.png';
// import cibIcon from '@images/cib.png';
// import newgIcon from '@images/newg.png';
// import '@styles/game-price.css';
//
// interface GamePriceProps {
// 	games: GameItem[];
// 	activeFilter: ActiveFilter;
// }
//
// const getTotalValue = (games: GameItem[], isWish: boolean) => {
// 	const total = { loose: 0, cib: 0, newg: 0 };
//
// 	const filterCategory = (key: PriceCategory) => {
// 		return games.filter(({ wish, wishPriceCategory, priceCategory }: GameItem) => {
// 			return isWish
// 				? wish && wishPriceCategory === key
// 				: priceCategory === key;
// 		});
// 	};
//
// 	(['loose', 'cib', 'newg'] as const).forEach(key => {
// 		filterCategory(key).forEach((game: GameItem) => {
// 			const price = game[key];
// 			if (typeof price === 'number' && Number.isInteger(price)) {
// 				total[key] += price;
// 			}
// 		});
// 	});
//
// 	return total;
// };
//
// export const TotalGamePrices = ({
// 	games,
// 	activeFilter,
// }: GamePriceProps) => {
// 	const isWish = activeFilter === 'wish';
// 	const total = getTotalValue(games, isWish);
//
// 	return (
// 		<div
// 			className="game-price game-price--value"
// 			tabIndex={-1}
// 			aria-label={`Value of games in your ${isWish ? 'wishlist' : 'collection'}:`}
// 		>
// 			<GamePricesOption
// 				price={total.loose}
// 				icon={looseIcon}
// 				category="loose"
// 				tabIndex={-1}
// 			/>
//
// 			<GamePricesOption
// 				price={total.cib}
// 				icon={cibIcon}
// 				category="cib"
// 				tabIndex={-1}
// 			/>
//
// 			<GamePricesOption
// 				price={total.newg}
// 				icon={newgIcon}
// 				category="newg"
// 				tabIndex={-1}
// 			/>
//
// 			<div className="game-price__total">
// 				<p className="game-price__total-label">Total:</p>
// 				<span className="game-price__usd game-price__usd--value">$</span>
// 				<span>{(total!.loose + total!.cib + total!.newg).toLocaleString()}</span>
// 			</div>
// 		</div>
// 	);
// };

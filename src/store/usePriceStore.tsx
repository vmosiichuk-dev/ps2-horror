import type { ActiveFilter, PriceItem, PriceCategory, TargetCategory, TotalPrices } from '@modules/price';
import type { GameItem } from '@modules/game';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getInitialPriceItem, PRICES } from '@constants/prices';

export interface PriceStore {
	prices: Record<string, PriceItem>;
	activeFilter: ActiveFilter;
	getPrice: (game: GameItem) => PriceItem,
	setPrices: (prices: Record<string, PriceItem>) => void;
	setActiveFilter: (filter: ActiveFilter) => void;
	updatePriceCategory: (id: string, category: PriceCategory) => void;
	getTotal: (games: GameItem[], activeFilter: ActiveFilter) => TotalPrices;
}

const getTargetCategory = (activeFilter: ActiveFilter): TargetCategory => {
	return activeFilter === 'wish' ? 'wishPriceCategory' : 'priceCategory';
};

const getUpdatedPrice = (
	price: PriceItem,
	activeFilter: ActiveFilter,
	category: PriceCategory
) => {
	const targetCategory = getTargetCategory(activeFilter);
	return { ...price, [targetCategory]: price[targetCategory] === category ? '' : category };
};

export const usePriceStore = create<PriceStore>()(
	persist(
		(set, get) => ({
			prices: PRICES,
			activeFilter: 'all',
			getPrice: (game: GameItem) => {
				const { prices } = get();
				if (prices[game.id]) return prices[game.id];

				const newPrice = getInitialPriceItem(game.title);
				const updatedPrices = { ...prices, [game.id]: newPrice };

				set({ prices: updatedPrices });
				return newPrice;
			},
			setPrices: (prices: Record<string, PriceItem>) => {
				set({ prices });
			},
			setActiveFilter: (activeFilter: ActiveFilter) => {
				set({ activeFilter });
			},
			updatePriceCategory: (id: string, category: PriceCategory) => {
				const { prices, activeFilter } = get();

				const price = prices?.[id];
				const updatedPrice = getUpdatedPrice(price, activeFilter, category);

				set({ prices: { ...prices, [id]: updatedPrice } });
			},
			getTotal: (games: GameItem[], activeFilter: ActiveFilter) => {
				const { prices } = get();
				const total = { loose: 0, cib: 0, newg: 0 };
				const targetCategory = getTargetCategory(activeFilter);

				const filteredGames = games.filter(game => {
					if (activeFilter === 'play') return game.play;
					if (activeFilter === 'wish') return game.wish;
					return true;
				});

				filteredGames.forEach(game => {
					const priceItem = prices[game.id];
					if (!priceItem) return;

					const category = priceItem[targetCategory];

					if (category && category in total) {
						const price = priceItem[category];
						if (typeof price === 'number') total[category] += price;
					}
				});

				return total;
			},
		}),
		{ name: 'PRICES_STORE' }
	)
);

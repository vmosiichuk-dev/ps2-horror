import type { ActiveFilter, PriceItem, PriceCategory, TargetCategory } from '@modules/price';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PRICES } from '@constants/prices';

export interface PriceStore {
	prices: Record<string, PriceItem>;
	activeFilter: ActiveFilter;
	getPrice: (id: string) => PriceItem,
	setPrices: (prices: Record<string, PriceItem>) => void;
	setActiveFilter: (filter: ActiveFilter) => void;
	updatePriceCategory: (id: string, category: PriceCategory) => void;
	// getTotal: () => number;
}

const getTargetCategory = (activeFilter: ActiveFilter): TargetCategory => {
	return activeFilter === 'wish' ? 'wishPriceCategory' : 'priceCategory';
};

const getUpdatedPrice = (
	price: PriceItem,
	activeFilter: ActiveFilter,
	category: PriceCategory
) => {
	let targetCategory = getTargetCategory(activeFilter);
	return { ...price, [targetCategory]: price[targetCategory] === category ? '' : category };
};

export const usePriceStore = create<PriceStore>()(
	persist(
		(set, get) => ({
			prices: PRICES,
			activeFilter: 'all',
			// TODO –– getPrice: if not found, add fallback to prices
			getPrice: (id: string) => get().prices[id],
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
			// getTotal: () => {
			// 	const { prices, activeFilter } = get();
			// 	const targetCategory = getTargetCategory(activeFilter);
			//
			// 	return Object.values(prices).reduce((sum, price) => {
			// 		const targetPrice = price[targetCategory];
			// 		const val = targetPrice && typeof targetPrice === 'number' ? targetPrice : 0;
			// 		return sum + val;
			// 	}, 0);
			// },
		}),
		{ name: 'PRICES_STORE' }
	)
);

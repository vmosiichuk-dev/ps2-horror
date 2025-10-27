export type Price = number | 'n/a';

export type PriceCategory = 'loose' | 'cib' | 'newg' | '';

export type ActiveFilter = 'all' | 'play' | 'wish' | 'coll';

export type TargetCategory = 'wishPriceCategory' | 'priceCategory';

export type TotalPrices = {
	loose: number;
	cib: number;
	newg: number;
};

export interface PriceItem {
	title: string;
	priceCategory: PriceCategory;
	wishPriceCategory: PriceCategory;
	loose: Price;
	cib: Price;
	newg: Price;
}

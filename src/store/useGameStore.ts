import type { GameItem } from '@utils/game';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchGames } from '@api/igdb';
import { formatGames } from '@utils/game';
import { INITIAL_FETCH_BODY } from '@constants/queries';

export interface GameStore {
	data: GameItem[];
	gamesLoaded: boolean;
	gameError: object | null;
	setData: (games: GameItem[]) => void;
	setInitialData: () => Promise<void>;
	updateGame: (slug: string, updates: Partial<GameItem>) => void;
	resetStore: () => void;
}

const updateGameData = (data: GameItem[], slug: string, updates: Partial<GameItem>) => {
	return data.map(game => game.slug === slug ? {...game, ...updates} : game);
};

const loadInitialGames = async (
	set: (state: Partial<GameStore>) => void,
	get: () => GameStore
) => {
	try {
		let games = get()?.data;

		if (!games || games.length === 0) {
			const apiData = await fetchGames(INITIAL_FETCH_BODY);
			const formatted = formatGames(apiData);
			set({ data: formatted });
		}

		set({ gamesLoaded: true, gameError: null });
	} catch (error) {
		set({ gameError: error ?? null, gamesLoaded: true });
		console.error('Failed to load games:', error);
	}
};

export const useGameStore = create<GameStore>()(
	persist(
		(set, get) => ({
			data: [],
			gamesLoaded: false,
			gameError: null,
			setData: (data: GameItem[]) => set({ data }),
			setInitialData: () => loadInitialGames(set, get),
			updateGame: (slug: string, updates: Partial<GameItem>) => {
				set({ data: updateGameData(get().data, slug, updates) });
			},
			resetStore: () => set({ data: [] })
		}),
		{ name: 'GAME_STORE' }
	)
);

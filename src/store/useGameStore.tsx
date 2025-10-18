import type { GameItem } from '@modules/game';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchGames } from '@api/igdb';
import { formatGames } from '@utils/game';
import { INITIAL_QUERY_BODY } from '@constants/query';

export interface GameStore {
	games: GameItem[];
	gamesLoaded: boolean;
	gamesError: unknown;
	setInitialGames: () => Promise<void>;
	updateGame: (id: string, updates: Partial<GameItem>) => void;
}

const loadInitialGames = async (
	games: GameItem[],
	set: (state: Partial<GameStore>) => void
) => {
	try {
		if (!games || games.length === 0) {
			const apiData = await fetchGames(INITIAL_QUERY_BODY);
			const formattedGames = formatGames(apiData);
			set({ games: formattedGames });
		}

		set({ gamesLoaded: true, gamesError: null });
	} catch (error) {
		set({ gamesError: error ?? null, gamesLoaded: true });
		console.error('Failed to load games:', error);
	}
};

const handleGameUpdate = (
	games: GameItem[],
	id: string,
	updates: Partial<GameItem>
) => {
	return games.map((game) => game.id === id ? {...game, ...updates} : game);
};

export const useGameStore = create<GameStore>()(
	persist(
		(set, get) => ({
			games: [],
			gamesLoaded: false,
			gamesError: null,
			setInitialGames: () => {
				const { games } = get();
				return loadInitialGames(games, set);
			},
			updateGame: (id: string, updates: Partial<GameItem>) => {
				const { games } = get();
				const updatedGames = handleGameUpdate(games, id, updates);
				set({ games: updatedGames });
			},
		}),
		{ name: 'GAMES_STORE' }
	)
);

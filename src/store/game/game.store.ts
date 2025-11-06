import type { GameStore } from './game.types';
import type { GameItem } from '@models/game';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loadInitialGames, handleGameUpdate } from './game.utils';

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

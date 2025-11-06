import type { GameStore } from './game.types';
import type { GameItem } from '@models/game';

import { fetchGames } from '@api/igdb';
import { INITIAL_QUERY_BODY } from '@constants/query';

export const loadInitialGames = async (
	games: GameItem[],
	set: (state: Partial<GameStore>) => void
) => {
	try {
		if (!games || games.length === 0) {
			const apiData = await fetchGames(INITIAL_QUERY_BODY);
			set({ games: apiData });
		}

		set({ gamesLoaded: true, gamesError: null });
	} catch (error) {
		set({ gamesError: error ?? null, gamesLoaded: true });
		console.error('Failed to load games:', error);
	}
};

export const handleGameUpdate = (
	games: GameItem[],
	id: string,
	updates: Partial<GameItem>
) => {
	return games.map((game) => game.id === id ? {...game, ...updates} : game);
};

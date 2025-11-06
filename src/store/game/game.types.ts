import type { GameItem } from '@models/game';

export type GameStore = {
	games: GameItem[];
	gamesLoaded: boolean;
	gamesError: unknown;
	setInitialGames: () => Promise<void>;
	updateGame: (id: string, updates: Partial<GameItem>) => void;
};

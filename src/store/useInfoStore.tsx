import type { GameItem } from '@modules/game';
import { create } from 'zustand';

interface InfoStore {
	activeGame: GameItem | null;
	openedInfo: boolean;
	setActiveGame: (game: GameItem) => void;
	closeInfo: () => void;
}

export const useInfoStore = create<InfoStore>()((set, get) => ({
	activeGame: null,
	openedInfo: false,
	setActiveGame: (game: GameItem) => {
		const { openedInfo } = get();
		set({ activeGame: game, openedInfo: openedInfo || true });
	},
	closeInfo: () => {
		set({ openedInfo: false });
	},
}));

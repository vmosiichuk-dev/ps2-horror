import type { GameItem } from '@modules/game';
import { create } from 'zustand';

interface InfoStore {
	activeGame: GameItem | null;
	openedInfo: boolean;
	setActiveGame: (game: GameItem, openedInfo?: boolean) => void;
	closeInfo: () => void;
}

export const useInfoStore = create<InfoStore>()((set) => ({
	activeGame: null,
	openedInfo: false,
	setActiveGame: (game: GameItem, openedInfo?: boolean) => {
		set({ activeGame: game, openedInfo: openedInfo ?? true });
	},
	closeInfo: () => {
		set({ openedInfo: false });
	},
}));

import type { GameItem } from '@models/game';

import { create } from 'zustand';

type InfoStore = {
	activeGame: GameItem | null;
	openedInfo: boolean;
	setActiveGame: (game: GameItem, openedInfo?: boolean) => void;
	closeInfo: () => void;
};

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

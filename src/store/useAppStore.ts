import { create } from 'zustand';

export interface AppState {
	// state
	animationReset: boolean;
	apiLoaded: boolean;
	transitionStart: boolean;
	welcomeClick: boolean;
	loaderError: boolean;
	appAria: boolean;
	buttonText: string;
	// setters
	setAnimationReset: (value: boolean) => void;
	setApiLoaded: (value: boolean) => void;
	setTransitionStart: (value: boolean) => void;
	setWelcomeClick: (value: boolean) => void;
	setLoaderError: (value: boolean) => void;
	setAppAria: (value: boolean) => void;
	setButtonText: (value: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
	// state
	animationReset: false,
	apiLoaded: false,
	transitionStart: false,
	welcomeClick: false,
	loaderError: false,
	appAria: true,
	buttonText: '',
	// setters
	setAnimationReset: (value) => set({ animationReset: value }),
	setApiLoaded: (value) => set({ apiLoaded: value }),
	setTransitionStart: (value) => set({ transitionStart: value }),
	setWelcomeClick: (value) => set({ welcomeClick: value }),
	setLoaderError: (value) => set({ loaderError: value }),
	setAppAria: (value) => set({ appAria: value }),
	setButtonText: (value) => set({ buttonText: value }),
}));

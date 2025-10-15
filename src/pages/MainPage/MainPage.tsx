import type { AppState } from '@store/useAppStore';

interface MainPageProps {
	appAria: boolean;
	welcomeClick: boolean;
	transitionStart: boolean;
	onStateChange: (key: keyof AppState) => void;
	onError: () => void;
}

export const MainPage = ({
	appAria,
	welcomeClick,
	transitionStart,
	onStateChange,
	onError,
}: MainPageProps) => {
	console.log({
		appAria,
		welcomeClick,
		transitionStart,
		onStateChange,
		onError,
	});

	return <>MainPage</>;
};

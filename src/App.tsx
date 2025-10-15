import { useEffect } from 'react';
import { useAppStore } from '@store/useAppStore';
import { MainPage } from '@pages/MainPage/MainPage';
import { WelcomeScreen } from '@components';
import { STORAGE_KEYS } from '@constants/storage';
import { BUTTON_TEXT } from '@constants/text';

type AppStoreState = ReturnType<typeof useAppStore.getState>;

export const App = () => {
	const {
		animationReset,
		apiLoaded,
		transitionStart,
		welcomeClick,
		loaderError,
		appAria,
		buttonText,
		setAnimationReset,
		setApiLoaded,
		setTransitionStart,
		setWelcomeClick,
		setLoaderError,
		setAppAria,
		setButtonText,
	} = useAppStore();

	const handleStateChange = (key: keyof AppStoreState) => {
		if (key === 'welcomeClick') {
			window.sessionStorage.setItem(
				STORAGE_KEYS.WELCOME_SCREEN,
				JSON.stringify(true)
			);
			setWelcomeClick(true);
			setAnimationReset(true);
		} else if (key === 'transitionStart') {
			setTransitionStart(true);
		} else if (key === 'apiLoaded') {
			setApiLoaded(true);
		}
	};

	const handleError = () => setLoaderError(true);

	useEffect(() => {
		const isWelcomeScreen = JSON.parse(
			window.sessionStorage.getItem(STORAGE_KEYS.WELCOME_SCREEN) || 'false'
		);

		const localGameData = JSON.parse(
			window.localStorage.getItem(STORAGE_KEYS.GAME_DATA) || '[]'
		);

		if (isWelcomeScreen) {
			setWelcomeClick(true);
			setAnimationReset(true);
		}

		const button =
			localGameData && localGameData.length > 0
				? BUTTON_TEXT.CONTINUE
				: BUTTON_TEXT.START;

		setButtonText(button);
		setAppAria(welcomeClick && apiLoaded);
	}, [welcomeClick, apiLoaded, setAppAria, setWelcomeClick, setAnimationReset, setButtonText]);

	return (
		<>
			{(!welcomeClick || !apiLoaded) ? (
				<WelcomeScreen
					animationReset={animationReset}
					transitionStart={transitionStart}
					welcomeClick={welcomeClick}
					loaderError={loaderError}
					buttonText={buttonText}
					onStateChange={handleStateChange}
				/>
			) : (
				<MainPage
					appAria={appAria}
					welcomeClick={welcomeClick}
					transitionStart={transitionStart}
					onStateChange={handleStateChange}
					onError={handleError}
				/>
			)}
		</>
	);
};

import React, { useState, useEffect } from "react"
import App from "./app"
import Welcome from "./welcome"

function RootContent() {
	const [state, setState] = useState({
		animationReset: false,
		apiLoaded: false,
		transitionStart: false,
		welcomeClick: false,
		loaderError: false,
		appAria: true,
		buttonText: ""
	})

	const handleStateChange = (state) => {
		if (state === "welcomeClick") {
			window.sessionStorage.setItem("PS2_SURVIVAL_HORROR_WELCOME_SCREEN", JSON.stringify(true))

			setState(prevState => ({
				...prevState,
				[state]: true,
				animationReset: true
			}))
		} else {
			setState(prevState => ({ ...prevState, [state]: true }))
		}
	}

	const handleError = () => setState(prevState => ({...prevState, loaderError: true}))

	useEffect(() => {
		if (!welcomeClick || !apiLoaded) setState(prevState => ({...prevState, appAria: false}))

		const welcomeScreen = JSON.parse(window.sessionStorage.getItem("PS2_SURVIVAL_HORROR_WELCOME_SCREEN"))

		if (welcomeScreen) {
			setState(prevState => ({
				...prevState,
				welcomeClick: true,
				animationReset: true
			}))
		}
		
		const startButtonText = "START"
		const continueButtonText = "CONTINUE"
		const localGameData = JSON.parse(window.localStorage.getItem("PS2_SURVIVAL_HORROR_GAME_DATA"))
			  
		if (localGameData !== null && localGameData.length > 0) {
			setState(prevState => ({...prevState, buttonText: continueButtonText}))
		} else {
			setState(prevState => ({...prevState, buttonText: startButtonText}))
		}
		// eslint-disable-next-line
	}, [])
	
	const { animationReset, apiLoaded, transitionStart, welcomeClick, loaderError, buttonText, appAria } = state

	return (
		<>
			{ !welcomeClick || !apiLoaded 
				? <Welcome 
					animationReset={animationReset} 
					transitionStart={transitionStart} 
					welcomeClick={welcomeClick} 
					loaderError={loaderError} 
					buttonText={buttonText} 
					onStateChange={handleStateChange} 
				/> 
			: null }
			<App 
				transitionStart={transitionStart} 
				welcomeClick={welcomeClick} 
				onStateChange={handleStateChange} 
				onError={handleError} 
				appAria={appAria} 
			/>
		</>
	)
}

export default RootContent
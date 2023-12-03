import { Component } from "react"
import App from "./app"
import Welcome from "./welcome"

class RootContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
			animationReset: false,
			apiLoaded: false,
			transitionStart: false,
            welcomeClick: false,
			loaderError: false,
			buttonText: ""
		}
	}

	handleStateChange = (state) => {
		if (state === "welcomeClick") {
			window.sessionStorage.setItem("PS2_SURVIVAL_HORROR_WELCOME_SCREEN", JSON.stringify(true))
			return this.setState({ [state]: true, animationReset: true })
		}

		this.setState({ [state]: true })
	}

	handleError = () => this.setState({ loaderError: true })

	componentDidMount() {
		const welcomeScreen = JSON.parse(window.sessionStorage.getItem("PS2_SURVIVAL_HORROR_WELCOME_SCREEN"))

		if (welcomeScreen) {
			this.setState({ welcomeClick: true, animationReset: true })
		}
		
		const startButtonText = "START",
			  continueButtonText = "CONTINUE",
			  localGameData = JSON.parse(window.localStorage.getItem("PS2_SURVIVAL_HORROR_GAME_DATA"))
			  
		if (localGameData !== null && localGameData.length > 0) {
			this.setState({ buttonText: continueButtonText })
		} else {
			this.setState({ buttonText: startButtonText })
		}
	}

	render() {
		const { animationReset, apiLoaded, transitionStart, welcomeClick, loaderError, buttonText, subtitleText } = this.state
		let welcome = null, appAria = true
		
		if (!welcomeClick || !apiLoaded) {
			welcome = <Welcome animationReset={animationReset} transitionStart={transitionStart} welcomeClick={welcomeClick} loaderError={loaderError} buttonText={buttonText} subtitleText={subtitleText} onStateChange={this.handleStateChange} />
		} else {
			appAria = false
		}

		return (
			<>
				{welcome}
				<App transitionStart={transitionStart} welcomeClick={welcomeClick} onStateChange={this.handleStateChange} onError={this.handleError} appAria={appAria} />
			</>
		)
	}
}

export default RootContent
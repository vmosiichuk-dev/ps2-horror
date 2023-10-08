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
			loaderError: false
		}
	}

	handleStateChange = (state) => {
		if (state === "welcomeClick") {
			window.sessionStorage.setItem("PS2_SURVIVAL_HORROR_WELCOME_SCREEN", JSON.stringify(true))
			return this.setState({ [state]: true, animationReset: true })
		}

		this.setState({ [state]: true })
	}

	handleError = () => {
		this.setState({ loaderError: true })
	}

	componentDidMount() {
		const welcomeScreen = JSON.parse(window.sessionStorage.getItem("PS2_SURVIVAL_HORROR_WELCOME_SCREEN"))
		if (welcomeScreen) {
			this.setState({ welcomeClick: true, animationReset: true })
		}
	}

	render() {
		const { animationReset, apiLoaded, transitionStart, welcomeClick, loaderError } = this.state

		let welcome = null
		if (!welcomeClick || !apiLoaded) {
			welcome = <Welcome animationReset={animationReset} transitionStart={transitionStart} welcomeClick={welcomeClick} loaderError={loaderError} onStateChange={this.handleStateChange} />
		}

		return (
			<>
				<App transitionStart={transitionStart} welcomeClick={welcomeClick} onStateChange={this.handleStateChange} onError={this.handleError}/>
				{welcome}
			</>
		)
	}
}

export default RootContent
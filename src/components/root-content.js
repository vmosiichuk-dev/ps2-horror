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
            welcomeClick: false
		}
	}

	handleStateChange = (state) => {
		if (state === "welcomeClick") {
			window.sessionStorage.setItem("PS2_SURVIVAL_HORROR_WELCOME_SCREEN", JSON.stringify(true))
			return this.setState({ [state]: true, animationReset: true })
		}

		this.setState({ [state]: true })
		console.log(state + ": true")
	}

	componentDidMount() {
		const welcomeScreen = JSON.parse(window.sessionStorage.getItem("PS2_SURVIVAL_HORROR_WELCOME_SCREEN"))
		if (welcomeScreen === true) {
			this.setState({ welcomeClick: true, animationReset: true })
			console.log("true – fromSession")
		}
	}

	render() {
		const { animationReset, apiLoaded, transitionStart, welcomeClick } = this.state

		let welcome = null
		if (!welcomeClick || !apiLoaded) {
			welcome = <Welcome animationReset={animationReset} transitionStart={transitionStart} welcomeClick={welcomeClick} onStateChange={this.handleStateChange} />
		}

		return (
			<>
				<App transitionStart={transitionStart} welcomeClick={welcomeClick} onStateChange={this.handleStateChange} />
				{welcome}
			</>
		)
	}
}

export default RootContent
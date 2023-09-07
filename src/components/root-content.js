import { Component } from "react"
import App from "./app"
import Welcome from "./welcome"

class RootContent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            welcomeClick: false,
			apiLoaded: false
		}
	}
	
	handleLoadingComplete = () => {
		this.setState({ apiLoaded: true })
		console.log(this.state.apiLoaded)
	}

	handleWelcomeClick = () => {
		this.setState({ welcomeClick: true })
		console.log(this.state.welcomeClick)
	}

	render() {
		const {welcomeClick, apiLoaded} = this.state
		let welcome = null
		if (!welcomeClick || !apiLoaded) welcome = <Welcome onWelcomeClick={this.handleWelcomeClick} />
		return (
			<>
				<App welcomeClick={welcomeClick} onLoadingComplete={this.handleLoadingComplete}/>
				{welcome}
			</>
		)
	}
}

export default RootContent
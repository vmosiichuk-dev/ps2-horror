import Loader from "./loader"
import ps from "../assets/img/ps-logo.svg"

function Welcome({onWelcomeClick}) {
    return (
        <div className="welcome-wrapper">
            <p className="welcome-title"><span className="a11y">PS2 Game Library — </span><img src={ps} alt=""/>Survival Horror Classics</p>
            <section className="fog">
                <div className="fog-container">
                <div className="fog-img --1st"></div>
                <div className="fog-img --2nd"></div>
                </div>
            </section>
            <div className="welcome-container">
                <p className="welcome-subtitle">Witness the evolution of fear with our PS2 Collector's App.</p>
                <p>Create your own personalised collection, track & share your progress.</p>
                <button className="btn btn-welcome" onClick={onWelcomeClick}>START</button>
                <Loader />
            </div>
        </div>
    )
}

export default Welcome
import Loader from "./loader"
import ps from "../assets/img/ps-logo.svg"

function Welcome({ animationReset, transitionStart, welcomeClick, onStateChange, loaderError }) {
    let buttonClass = "btn btn-welcome",
        wrapperClass = "welcome-wrapper bg-black",
        subtitleClass = "welcome-subtitle",
        pClass = ""

    if (!welcomeClick) {
        buttonClass += " --fade-in"
    }     
    if (welcomeClick) {
        subtitleClass += " --fade-out"
        pClass += "--fade-out"
    }
    if (welcomeClick && animationReset) {
        buttonClass += " --fade-out"
    }
    if (transitionStart) {
        wrapperClass += " --active"
    }

    return (
        <div className={wrapperClass}>
            <p className="welcome-title"><span className="a11y">PS2 Game Library — </span><img src={ps} alt=""/>Survival Horror Classics</p>
            <section className="fog">
                <div className="fog-container">
                <div className="fog-img --1st"></div>
                <div className="fog-img --2nd"></div>
                </div>
            </section>
            <div className="welcome-container">
                <p className={subtitleClass}>Witness the evolution of fear with our PS2 Collection App.</p>
                <p className={pClass}>Create your own personalised collection, track & share your progress.</p>
                <button className={buttonClass} onClick={() => onStateChange("welcomeClick")}>START</button>
            </div>
            <Loader welcomeClick={welcomeClick} loaderError={loaderError} />
        </div>
    )
}

export default Welcome
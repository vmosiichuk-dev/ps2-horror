import Loader from "./loader"
import ps from "../assets/img/ps-logo.svg"

function Welcome({ animationReset, transitionStart, welcomeClick, onStateChange, loaderError, buttonText }) {
    let buttonClass = "btn btn--welcome",
        wrapperClass = "welcome",
        subtitleClass = "welcome__subtitle",
        pClass = "welcome__text"

    if (welcomeClick) {
        subtitleClass += " has-faded-out"
        pClass += " has-faded-out"
    }
    if (!welcomeClick) buttonClass += " has-faded-in"
    if (welcomeClick && animationReset) buttonClass += " has-faded-out"
    if (transitionStart) wrapperClass += " is-active"

    return (
        <div className={wrapperClass}>
            <h1 className="welcome__title"><span className="a11y">PS2 Game Library — </span><img src={ps} alt=""/>Survival Horror Classics</h1>
            <section className="fog__section">
                <div className="fog__container">
                    <div className="fog fog--one"></div>
                    <div className="fog fog--two"></div>
                </div>
            </section>
            <div className="welcome__container">
                <p className={subtitleClass}>Witness the evolution of fear with our PS2 Collection App.</p>
                <p className={pClass}>Create your own personalised collection, track & share your progress.</p>
                <button className={buttonClass} onClick={() => onStateChange("welcomeClick")}>{buttonText}</button>
            </div>
            <Loader welcomeClick={welcomeClick} loaderError={loaderError} />
        </div>
    )
}

export default Welcome
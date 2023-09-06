import ps from "../assets/img/ps-logo.svg"
import "../assets/styles/welcome.css"

function Welcome() {
    return (
        <div className="noscript">
            <p class="noscript-title"><span class="a11y">PS2 Game Library — </span><img src={ps} alt=""/>Survival Horror Classics</p>
            <section class="fog">
                <div class="fog-container">
                <div class="fog-img --1st"></div>
                <div class="fog-img --2nd"></div>
                </div>
            </section>
            <div class="noscript-container">
                <p class="noscript-heading">The spirits won't guide you without scripts.</p>
                <p class="noscript-paragraph">Unlock the
                    <a class="noscript-link" href="https://www.enable-javascript.com/" target="_blank" rel="noreferrer">gateway to JavaScript</a>
                    to explore the haunted world of PS2 horror.
                </p>
            </div>
        </div>
    )
}

export default Welcome
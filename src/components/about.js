import React, { Component } from "react"
import "../assets/styles/about.css"
import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import info from "../assets/img/info.png"
import del from "../assets/img/del.png"
import looseIcon from "../assets/img/loose.png"
import cibIcon from "../assets/img/cib.png"
import newgIcon from "../assets/img/newg.png"

class About extends Component {
    constructor(props) {
        super(props)
        this.aboutRef = React.createRef()
    }  

    componentDidMount() { 
        this.aboutRef.current.addEventListener("keydown", this.handleKeydown)
    }
    
    componentWillUnmount() { 
        this.aboutRef.current.removeEventListener("keydown", this.handleKeydown)
    }

    handleKeydown = (e) => {
        if (this.props.aboutIsActive) {
            const focusableElements = [document.querySelector(".btn-about"), ...this.aboutRef.current.querySelectorAll("a")],
                  firstElement = focusableElements[0],
                  lastElement = focusableElements[1]

            if (e.key === "Tab") {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault()
                    lastElement.focus()
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault()
                    firstElement.focus()
                }
            }
        }
    }

    render() {      
        const {aboutIsActive} = this.props  

        let aboutClass = "about"
        if (aboutIsActive) aboutClass += " is-active"

        return (
            <aside className={aboutClass} tabIndex={-1} ref={this.aboutRef}>
                <div className="about-wrapper">
                    <article className="about-article" aria-labelledby="about-title">
                        <h2 id="about-title" className="about-title">About the App</h2>
                        <p><b>Welcome to our PS2 Collection App!</b><br/>This app empowers you to curate and explore your PS2 horror collection, discover new titles, and plan your collector's journey. Experience the captivating world of survival horror on the PS2, where storytelling, audiovisual design, and emotional engagement converge to create unforgettable experiences. As you embark on your collector's adventure, keep in mind that the love of collecting goes beyond the monetary value of each game. It's about cherishing the memories, experiences, and stories that these games hold.</p>
                    </article>
                    <article aria-labelledby="controls-title">
                        <h2 id="controls-title" className="about-title">Controls &amp; Tips</h2>
                        <div className="about-controls">
                            <h3>Action buttons:</h3>
                            <div className="about-control-option">
                                <img className="about-control-icon" src={star} alt=""/>
                                <p>Add a game to your collection and track your progress by selecting the <b>'All games'</b> filter.<br/>Check the value of your collection under the <b>'Collected'</b> filter.</p>
                            </div>
                            <div className="about-control-option">
                                <img className="about-control-icon" src={game} alt=""/>
                                <p>Add a game to your list of played games and monitor your progress via the <b>'Played'</b> filter.</p>
                            </div>
                            <div className="about-control-option">
                                <img className="about-control-icon" src={info} alt=""/>
                                <p>Load game details in the left sidebar.<br/>Return to this window by clicking the <b>'Info'</b> icon in the top right corner of the sidebar.</p>
                            </div>
                            <div className="about-control-option">
                                <img className="about-control-icon" src={del} alt=""/>
                                <p>Delete a game from the library entirely.<br/>Click a second time to confirm your choice.</p>
                            </div>
                        </div>
                        <div className="about-controls">
                            <h3 className="mt-2">Price buttons:</h3>
                            <div className="about-control-option">
                                <img className="about-control-icon price" src={looseIcon} alt=""/>
                                <p>Loose: A disc itself (may not include the game's original casing or manual).</p>
                            </div>
                            <div className="about-control-option">
                                <img className="about-control-icon price" src={cibIcon} alt=""/>
                                <p>CIB: Complete In Box used copy of the game with original casing and manual.</p>
                            </div>
                            <div className="about-control-option">
                                <img className="about-control-icon price" src={newgIcon} alt=""/>
                                <p>New: Sealed and graded copies by WATA in perfect condition (if none available, a regular sealed copy with a hologram sticker).</p>
                            </div>
                        </div>
                    </article>
                    <article className="prices-article" aria-labelledby="prices-title">
                        <h2 id="prices-title" className="about-title">Game Prices</h2>
                        <div className="about-prices">
                            <h3 className="prices-subtitle">Market Analysis</h3>
                            <p>To establish collection value categories, we conducted extensive research in October 2023 by analyzing prices on the most popular gaming marketplace, eBay. We specifically utilized the "Buy It Now" filter on eBay to exclude auction listings and ensure that the chosen prices reflected readily available options.</p>
                        </div>
                        <div className="about-prices">
                            <h3 className="prices-subtitle">Price Criteria</h3>
                            <p>Our analysis revealed that the NTSC U/C region had the most comprehensive coverage in terms of offers, demand, and pricing. For games with limited NTSC U/C availability, we occasionally used alternative region versions to fill in missing prices. It's important to acknowledge that NTSC J and PAL regions have their own pricing dynamics, which can differ significantly from NTSC U/C.</p>
                        </div>
                        <div className="about-prices">
                            <h3 className="prices-subtitle">Representational Nature of Prices</h3>
                            <p>The provided prices are for reference purposes and may not reflect real-time market values. The gaming market is dynamic, and prices can fluctuate due to factors such as demand, rarity, and game condition. Please consider these values as general estimates rather than definitive market prices when managing your collection.</p>
                        </div>
                    </article>
                    <footer>
                        <p>Copyright 2023</p>
                        <div className="divider"></div>
                        <a className="nmd" href="https://madebynomad.dev" target="_blank" rel="noopener noreferrer">madebynomad</a>
                        <div className="divider"></div>
                        <a href="https://www.gnu.org/licenses/gpl-3.0.html#license-text" target="_blank" rel="noopener noreferrer">GNU GPLv3</a>
                    </footer>
                </div>
            </aside>
        )
    }
}

export default About
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
            const focusableElements = [document.querySelector(".btn--about"), ...this.aboutRef.current.querySelectorAll("a")],
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
                <div className="about__wrapper">
                    <article aria-labelledby="about__title">
                        <h2 id="about__title" className="about__title about__title--mt">About the App</h2>
                        <p className="about__p"><b>Welcome to our PS2 Collection App!</b><br/>This app empowers you to curate and explore your PS2 horror collection, discover new titles, and plan your collector's journey. Experience the captivating world of survival horror on the PS2, where storytelling, audiovisual design, and emotional engagement converge to create unforgettable experiences. As you embark on your collector's adventure, keep in mind that the love of collecting goes beyond the monetary value of each game. It's about cherishing the memories, experiences, and stories that these games hold.</p>
                    </article>
                    <article aria-labelledby="about__controls">
                        <h2 id="about__controls" className="about__title">Controls &amp; Tips</h2>
                        <h3 className="about__subtitle">Action buttons:</h3>
                        <div className="about__control">
                            <img src={star} width="17" height="17" alt=""/>
                            <p className="about__p">Add a game to your collection and track your progress by selecting either <b>'All games'</b> or the&nbsp;<b>'Collected'</b>&nbsp;filter.</p>
                        </div>
                        <div className="about__control">
                            <img src={game} width="17" height="17" alt=""/>
                            <p className="about__p">Add a game to your list of played games and monitor your progress via the <b>'Played'</b> filter.</p>
                        </div>
                        <div className="about__control">
                            <img src={info} width="17" height="17" alt=""/>
                            <p className="about__p">Load the sidebar with game details, such as title, release date, rating, summary, genres, developer/publisher, age ratings and links.</p>
                        </div>
                        <div className="about__control">
                            <img src={del} width="17" height="17" alt=""/>
                            <p className="about__p">Delete a game from the library entirely.<br/>Click a second time to confirm your choice.</p>
                        </div>
                        <h3 className="about__subtitle">Price buttons:</h3>
                        <div className="about__control">
                            <img className="about__icon-loose" src={looseIcon} width="17" height="17" alt=""/>
                            <p className="about__p">Loose: A disc itself (does not include the game's original casing or manual).</p>
                        </div>
                        <div className="about__control">
                            <img className="about__icon-cib" src={cibIcon} width="17" height="17" alt=""/>
                            <p className="about__p">CIB (complete in box): A used copy of the game with original casing and manual.</p>
                        </div>
                        <div className="about__control">
                            <img className="about__icon-newg" src={newgIcon} width="17" height="17" alt=""/>
                            <p className="about__p">New: Sealed and graded copies by WATA in perfect condition (if none available, a regular sealed copy with a hologram sticker).</p>
                        </div>
                    </article>
                    <article aria-labelledby="about__prices">
                        <h2 id="about__prices" className="about__title">Game Prices</h2>
                        <h3 className="about__subtitle">Market Analysis</h3>
                        <p className="about__p">To establish collection value categories, we conducted extensive research in October of 2023 by analyzing prices on the most popular gaming marketplace, eBay. We specifically utilized the "Buy It Now" filter on eBay to exclude auction listings and ensure that the chosen prices reflected readily available options.</p>
                        <h3 className="about__subtitle">Price Criteria</h3>
                        <p className="about__p">Our analysis revealed that the NTSC U/C region (North America) had the most comprehensive coverage in terms of offers, demand, and pricing. For games with limited NTSC U/C availability, we occasionally used alternative region versions to fill in missing prices. It's important to acknowledge that NTSC J (Japan) and PAL (Europe) games have their own pricing dynamics, which can differ significantly from NTSC U/C.</p>
                        <h3 className="about__subtitle">Representational Nature of Prices</h3>
                        <p className="about__p">The provided prices are for reference purposes and may not reflect real-time market values. The gaming market is dynamic, and prices can fluctuate due to factors such as demand, rarity, and game condition. Please consider these values as general estimates rather than definitive market prices when managing your collection.</p>
                    </article>
                    <footer className="about__footer">
                        <p className="about__p">Copyright 2023</p>
                        <div className="about__divider"></div>
                        <a className="about__link" href="https://madebynomad.dev" target="_blank" rel="noopener noreferrer">madebynomad</a>
                        <div className="about__divider"></div>
                        <a className="about__link" href="https://www.gnu.org/licenses/gpl-3.0.html#license-text" target="_blank" rel="noopener noreferrer">GNU GPLv3</a>
                    </footer>
                </div>
            </aside>
        )
    }
}

export default About
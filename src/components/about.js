import React, { useRef, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import "../assets/styles/about.css"
import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import info from "../assets/img/info.png"
import del from "../assets/img/del.png"
import looseIcon from "../assets/img/loose.png"
import cibIcon from "../assets/img/cib.png"
import newgIcon from "../assets/img/newg.png"

function About({ aboutBtnRef, aboutIsActive, onTabKeydown, onWindowResize }) {
    const aboutRef = useRef()

    const handleAboutKeydown = useCallback((e) => {
        if (aboutIsActive) {
            const focusableElements = [
                aboutBtnRef.current, 
                ...aboutRef.current.querySelectorAll(".about__title"), 
                ...aboutRef.current.querySelectorAll(".about__link")
            ]
            
            onTabKeydown(e, focusableElements)
        }
    }, [aboutIsActive, aboutBtnRef, onTabKeydown])

    useEffect(() => {
        const handleMount = () => { 
            onWindowResize()
            aboutRef.current.addEventListener("keydown", handleAboutKeydown)
            aboutBtnRef.current.addEventListener("keydown", handleAboutKeydown)
        }
        
        const handleUnmount = () => { 
            aboutRef.current.removeEventListener("keydown", handleAboutKeydown)
            aboutBtnRef.current.removeEventListener("keydown", handleAboutKeydown)
        }

        handleMount()
        return () => handleUnmount()
    }, [aboutBtnRef, handleAboutKeydown, onWindowResize])

    useEffect(() => {
        if (aboutIsActive) {
            aboutRef.current.scrollIntoView({
                behavior: "smooth", 
                block: "start", 
                inline: "nearest"
            })
        }
    }, [aboutIsActive])
      
    const tabIndex = aboutIsActive ? 0 : -1

    return (
        <aside className={`about ${aboutIsActive ? "is-active" : ""}`} tabIndex={-1} ref={aboutRef}>
            <div className="about__wrapper" tabIndex={tabIndex} >
                <article aria-labelledby="about__title">
                    <h2 id="about__title" className="about__title about__title--mt" tabIndex={tabIndex} >About the App</h2>
                    <p className="about__welcome"><b className="about__bold">Welcome to our PS2 Collection App!</b></p>
                    <p className="about__p">This app empowers you to curate and explore your PS2 horror collection, discover new titles, and plan your collector's journey. Experience the captivating world of survival horror on the PS2, where storytelling, audiovisual design, and emotional engagement converge to create unforgettable experiences. As you embark on your collector's adventure, keep in mind that the love of collecting goes beyond the monetary value of each game. It's about cherishing the memories, experiences, and stories that these games hold.</p>
                </article>
                <article aria-labelledby="about__controls">
                    <h2 id="about__controls" className="about__title" tabIndex={tabIndex} >Controls &amp; Tips</h2>
                    <h3 className="about__subtitle">Game buttons:</h3>
                    <div className="about__control">
                        <img src={star} width="17" height="17" alt="Wishlist icon"/>
                        <p className="about__p">Add a game to your wishlist and plan future expenses by selecting the&nbsp;<b className="about__bold">'Wishlist'</b>&nbsp;filter.</p>
                    </div>
                    <div className="about__control">
                        <img src={game} width="17" height="17" alt="Played icon"/>
                        <p className="about__p">Add a game to your list of played games and monitor your progress via the <b className="about__bold">'Played'</b> filter.</p>
                    </div>
                    <div className="about__control">
                        <img src={info} width="17" height="17" alt="Info icon"/>
                        <p className="about__p">Load the sidebar with game details, such as title, release date, rating, summary, genres, developer/publisher, age ratings and links.</p>
                    </div>
                    <div className="about__control">
                        <img src={del} width="17" height="17" alt="Delete icon"/>
                        <p className="about__p">Delete a game from the library entirely.<br/>Click a second time to confirm your choice.</p>
                    </div>
                    <h3 className="about__subtitle">Price buttons:</h3>
                    <p className="about__p">Add a game to your collection by selecting one of the price options you own and use the <b className="about__bold">'Collection'</b> filter to show the games you've added.</p>
                    <p className="about__p">Want to add a higher price option of the game you own to the wishlist or choose specific price options for specific games? <b className="about__bold">We've got you covered!</b></p>
                    <p className="about__p">Under <b className="about__bold">'Wishlist'</b> filter, changes are only made to the game's desired price option, so that you can easily plan out your collection and do not confuse the game's status when browsing games under <b className="about__bold">'All'</b> filter.</p>
                    <div className="about__control">
                        <img className="about__icon-loose" src={looseIcon} width="17" height="17" alt="Loose price option icon"/>
                        <p className="about__p">Loose: A disc itself (does not include the game's original casing or manual).</p>
                    </div>
                    <div className="about__control">
                        <img className="about__icon-cib" src={cibIcon} width="17" height="17" alt="CIB price option icon"/>
                        <p className="about__p">CIB (complete in box): A used copy of the game with original casing and manual.</p>
                    </div>
                    <div className="about__control">
                        <img className="about__icon-newg" src={newgIcon} width="17" height="17" alt="New price option icon"/>
                        <p className="about__p">New: Sealed and graded copies by WATA in perfect condition (if none available, a regular sealed copy with a hologram sticker).</p>
                    </div>
                </article>
                <article aria-labelledby="about__prices">
                    <h2 id="about__prices" className="about__title" tabIndex={tabIndex} >Game Prices</h2>
                    <h3 className="about__subtitle">Market Analysis</h3>
                    <p className="about__p">To establish collection value categories, we conducted extensive research in October of 2023 by analyzing prices on the most popular gaming marketplace, eBay. We specifically utilized the 'Buy It Now' filter on eBay to exclude auction listings and ensure that the chosen prices reflected readily available options.</p>
                    <h3 className="about__subtitle">Price Criteria</h3>
                    <p className="about__p">Our analysis revealed that the NTSC U/C region (North America) had the most comprehensive coverage in terms of offers, demand, and pricing. For games with limited NTSC U/C availability, we occasionally used alternative region versions to fill in missing prices. It's important to acknowledge that NTSC J (Japan) and PAL (Europe) games have their own pricing dynamics, which can differ significantly from NTSC U/C.</p>
                    <h3 className="about__subtitle">Representational Nature of Prices</h3>
                    <p className="about__p">The provided prices are for reference purposes and may not reflect real-time market values. The gaming market is dynamic, and prices can fluctuate due to factors such as demand, rarity, and game condition. Please consider these values as general estimates rather than definitive market prices when managing your collection.</p>
                </article>
                <footer className="about__footer">
                    <p className="about__p">Copyright 2023</p>
                    <div className="about__divider"></div>
                    <a className="about__link" href="https://madebynomad.dev" target="_blank" rel="noopener noreferrer" tabIndex={tabIndex}>madebynomad</a>
                    <div className="about__divider"></div>
                    <a className="about__link" href="https://www.gnu.org/licenses/gpl-3.0.html#license-text" target="_blank" rel="noopener noreferrer" tabIndex={tabIndex}>GNU GPLv3</a>
                </footer>
            </div>
        </aside>
    )
}

About.propTypes = {
    aboutBtnRef: PropTypes.object.isRequired,
    aboutIsActive: PropTypes.bool.isRequired,
    onTabKeydown: PropTypes.func.isRequired,
}

export default About
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
        if (aboutIsActive) aboutClass += " --active"

        return (
            <aside className={aboutClass} tabIndex={-1} ref={this.aboutRef}>
                {/* <button type="button" className="btn btn-menu" onClick={onTutorialClose} tabIndex={0} disabled={}>
                    <img className={menuImgClass} src={menuImg} alt={menuAlt}/>
                    {aboutIsActive 
                        ? <img className="menu-img --help" src={help} alt="Close game information"/>
                        : <img className="menu-img --active" src={menuImg} alt="Close game information"/>
                    }
                </button> */}
                <div className="about-wrapper">
                    <article className="about-article" aria-labelledby="about-title">
                        <h2 id="about-title" className="about-title">About the App</h2>
                        <p><b>Welcome to our PS2 Horror Collection Manager!</b><br/>This app empowers you to curate and explore your PS2 horror collection, discover new titles, and plan your expenses and collector's journey ahead. Experience the captivating world of survival horror on the PS2, where storytelling, audiovisual design, and emotional engagement converge to create unforgettable experiences.</p>
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
                                <p>Loose: Choose this option if you own a disc itself, without or with damaged casing.</p>
                            </div>
                            <div className="about-control-option">
                                <img className="about-control-icon price" src={cibIcon} alt=""/>
                                <p>CIB: Choose this option if you own a complete in box used copy of the game.</p>
                            </div>
                            <div className="about-control-option">
                                <img className="about-control-icon price" src={newgIcon} alt=""/>
                                <p>New: Choose this option if you own a sealed copy of the game / never used copy in perfect condition.</p>
                            </div>
                        </div>
                    </article>
                    <footer>
                        <p>Copyright 2023</p>
                        <div className="divider"></div>
                        <a className="nmd" href="https://madebynomad.dev">madebynomad</a>
                        <div className="divider"></div>
                        <a href="https://www.gnu.org/licenses/gpl-3.0.html#license-text">GNU GPLv3</a>
                    </footer>
                </div>
            </aside>
        )
    }
}

export default About
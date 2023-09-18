import Loader from "./loader"
import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import screen from "../assets/img/screen.png"
import cover from "../assets/img/cover.png"
import overlay from "../assets/img/overlay.png"
import age1 from "../assets/img/age-rating-1.png"
import age2 from "../assets/img/age-rating-2.png"
import "../assets/styles/info.css"

function Info(/* { data } */) {
    return (
        <section className="info" aria-label="Game information">
            <div className="info-img-wrapper">   
                <img className="info-bg-img" src={screen} alt=""/>
            </div>
            <div className="info-wrapper">   
                <div className="list-item info-cover-container">
                    <img className="img-cover info-bg-cover" src={cover} alt=/*{ title +  */" — PS2 game cover"/* } */ />
                    <img className="img-overlay" src={overlay} alt="" />
                </div>
                <h2 className="info-title">Game Title</h2>
                <h3 className="info-subtitle">Sep 24, 2001 (22 years ago)</h3>
                <div className="info-flags">
                    <button className={`flag ${true === "play" ? "--active" : ""}`} type="button"><img className="icon" src={game} alt="" />Played</button>
                    <button className={`flag ${true === "wish" ? "--active" : ""}`} type="button"><img className="icon" src={star} alt="" />Collected</button>
                    <button className="rating" type="button">90</button>
                </div>
                <p className="info-description">The second entry in the Silent Hill franchise, Silent Hill 2 is a narrative-focused third-person psychological horror game with exploration and puzzle-solving elements which follows James Sunderland, a man who receives a letter, seemingly sent by his three-years-deceased wife Mary, in which he is beckoned to the fog-ridden town of Silent Hill at the same time as numerous other people troubled by their past.</p>
                <div className="info-category">
                    <h3 className="info-category-title">Developer</h3>
                    <div className="info-category-item-wrapper">
                        <span className="info-span">Team Silent</span>
                    </div>
                </div>
                <div className="info-category">
                    <h3 className="info-category-title">Genres</h3>
                    <div className="info-category-item-wrapper">
                        <span className="info-span">Adventure</span><span className="info-span">Puzzle</span>
                    </div>
                </div>
                <div className="info-category">
                    <h3 className="info-category-title">Links</h3>
                    <div className="info-category-item-wrapper">
                        <a href="https://madebynomad.dev">Twitch</a><a href="https://madebynomad.dev">Wikipedia</a>
                    </div>
                </div>
                <div className="info-age-rating-container">
                    <img className="info-bg-age" src={age2} alt=""/>
                    <img className="info-bg-age" src={age1} alt=""/>
                </div>
            </div>
            <Loader />
        </section>
    )
}

export default Info


/* 
<h1>PS2<span className="a11y"> Game Library — </span><img src={ps} alt=""/>Survival Horror Classics</h1>
<section className="info-wrapper"aria-label="Gaming progress information">   
    <p className="info-p">Total<span className="a11y"> Games</span>:
        <span>{data.length}</span>
    </p>
    <p className="info-p"><span className="a11y">Games </span>Played:
        <span>{playCount}</span>
    </p>
    <div className="progress-bar--container">
        <div className="progress-bar" style={progressBarStyle}></div>
    </div>
    <span className="a11y">Percentage progress count:</span>
    <p className="progress-count">{progressCount}</p>
</section>
 */
import Loader from "./loader"
import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
/* import screen from "../assets/img/screen.png" */
/* import cover from "../assets/img/cover.png" */
import shadowman from "../assets/img/shadowman.jpg"
import trapt from "../assets/img/trapt.jpg"
import kuon from "../assets/img/kuon.jpg"
import vanhelsing from "../assets/img/vanhelsing.jpg"
import overlay from "../assets/img/overlay.png"
import age1 from "../assets/img/age-rating-1.png"
import age2 from "../assets/img/age-rating-2.png"
import "../assets/styles/info.css"

function Info({ infoData }) {
    let title = 'Game Title',
        src = '..assets/img/cover.png',
        play = true,
        wish = true,
        rating = 90,
        genres = [],
        developer = "",
        screenshot = "",
        summary = "",
        websites = []

    if (infoData.title) {
        title = infoData.title
        src = infoData.src
        play = infoData.play
        wish = infoData.wish
        rating = infoData.rating    
        summary = infoData.summary     
        rating = infoData.rating    
        wish = infoData.wish
        play = infoData.play

        if (infoData.genres !== undefined) {
            infoData.genres.forEach(item => genres.push(item.name))
        }
        if (infoData.involved_companies !== undefined) {
            developer = infoData.involved_companies[0].company.name 

            infoData.involved_companies.forEach(item => {
                if (item.developer) {
                    developer = item.name
                }
            })
        }
        if (infoData.title === "Shadow Man: 2econd Coming") screenshot = shadowman
        if (infoData.title === "Van Helsing") screenshot = vanhelsing
        if (infoData.screenshots !== undefined) {
            const firstScreenshotTitles = [
                    infoData.title === "Silent Hill 2: Restless Dreams",
                    infoData.title === "Fatal Frame",
                    infoData.title === "Onimusha: Warlords",
                    infoData.title === "Haunting Ground",
                    infoData.title === "Siren",
                    infoData.title === "Curse: The Eye of Isis",
                    infoData.title === "Manhunt 2",
                    infoData.title === "Constantine",
                    infoData.title === "Michigan: Report from Hell",
                    infoData.title === "Resident Evil Survivor 2 Code: Veronica",
                    infoData.title === "Vampire Night",
                    infoData.title === "Phase Paradox",
                    infoData.title === "Evil Twin: Cyprien's Chronicles",
                    infoData.title === "Shadow Tower: Abyss"
                ],
                secondScreenshotTitles = [
                    infoData.title === "Resident Evil 4",
                    infoData.title === "Silent Hill 3",
                    infoData.title === "BloodRayne",
                    infoData.title === "Resident Evil Code: Veronica X",
                    infoData.title === "Silent Hill: Shattered Memories",
                    infoData.title === "Castlevania: Curse of Darkness",
                    infoData.title === "Drakengard",
                    infoData.title === "King's Field IV",
                    infoData.title === "ObsCure: The Aftermath",
                    infoData.title === "Aliens Versus Predator: Extinction",
                    infoData.title === "Clock Tower 3",
                    infoData.title === "Devil May Cry 2",
                    infoData.title === "Mystic Nights",
                    infoData.title === "Resident Evil 4: Premium Edition"
                ],
                thirdScreenshotTitles = [
                    infoData.title === "Raw Danger!",
                    infoData.title === "Darkwatch",
                    infoData.title === "Rule of Rose",
                    infoData.title === "Resident Evil Outbreak",
                    infoData.title === "Resident Evil Outbreak File #2",
                    infoData.title === "BloodRayne 2",
                    infoData.title === "The X-Files: Resist or Serve"
                ],
                fourthScreenshotTitles = [
                    infoData.title === "Silent Hill 2",
                    infoData.title === "Devil May Cry 3: Dante's Awakening - Special Edition",
                    infoData.title === "Legacy of Kain: Soul Reaver 2",
                    infoData.title === "Silent Hill: Origins",
                    infoData.title === "Onimusha 2: Samurai's Destiny",
                    infoData.title === "Area 51",
                    infoData.title === "Alone in the Dark: The New Nightmare",
                    infoData.title === "Blood Omen 2: Legacy of Kain",
                    infoData.title === "The Thing"
                ]
            let i = 0
            if (firstScreenshotTitles.includes(true)) i = 1
            if (secondScreenshotTitles.includes(true)) i = 2
            if (thirdScreenshotTitles.includes(true)) i = 3
            if (fourthScreenshotTitles.includes(true)) i = 4
            screenshot = "https://images.igdb.com/igdb/image/upload/t_screenshot_big/" + infoData.screenshots[i].image_id + ".jpg"
            if (infoData.title === "Trapt") screenshot = trapt
            if (infoData.title === "Kuon") screenshot = kuon
        }
        if (infoData.websites !== undefined) {
            infoData.websites.forEach(item => {
                let label, url
                url = item.url
                switch (item.category) {
                    case 1:
                        label = "Official"
                        break
                    case 2:
                        label = "Wikia"
                        break
                    case 3:
                        label = "Wikipedia"
                        break
                    case 4:
                        label = "Facebook"
                        break
                    case 5:
                        label = "Twitter"
                        break
                    case 6:
                        label = "Twitch"
                        break
                    case 8:
                        label = "Instagram"
                        break
                    case 9:
                        label = "Youtube"
                        break
                    case 10:
                        label = "Iphone"
                        break
                    case 11:
                        label = "Ipad"
                        break
                    case 12:
                        label = "Android"
                        break
                    case 13:
                        label = "Steam"
                        break
                    case 14:
                        label = "Reddit"
                        break
                    case 15:
                        label = "Itch"
                        break
                    case 16:
                        label = "Epicgames"
                        break
                    case 17:
                        label = "Gog"
                        break
                    case 18:
                        label = "Discord"
                        break
                    default:
                        break
                }
                const newItem = Object.assign({label: label, url: url})
                websites.push(newItem)
            })
        }
    }

    const renderGenres = () => {
        return genres.map(genre => {    
            return (
                <span key={genre} className="info-span">{genre}</span>
            )
        })
    }

    const genreElements = renderGenres()

    const renderWebsites = () => {
        return websites.map(website => {    
            return (
                <a key={website.label} href={website.url}>{website.label}</a>
            )
        })
    }

    const websiteElements = renderWebsites()

    const websiteContainer = () => { return (
        <div className="info-category">
            <h3 className="info-category-title">Links</h3>
            <div className="info-category-item-wrapper">
                {websiteElements}
            </div>
        </div>
    )}

    return (
        <section className="info" aria-label="Game information">
            <div className="info-img-wrapper">   
                <img className="info-bg-img" src={screenshot} alt=""/>
            </div>
            <div className="info-wrapper">   
                <div className="list-item info-cover-container">
                    <img className="img-cover info-bg-cover" src={src} alt={title + " — PS2 game cover"} />
                    <img className="img-overlay" src={overlay} alt="" />
                </div>
                <h2 className="info-title">{title}</h2>
                <h3 className="info-subtitle">Sep 24, 2001 (22 years ago)</h3>
                <div className="info-flags">
                    <button className={`flag ${play ? "--active" : ""}`} type="button"><img className="icon" src={game} alt="" />Played</button>
                    <button className={`flag ${wish ? "--active" : ""}`} type="button"><img className="icon" src={star} alt="" />Collected</button>
                    <button className="rating" type="button">{rating}</button>
                </div>
                <p className="info-description">{summary}</p>
                <div className="info-category">
                    <h3 className="info-category-title">Developer</h3>
                    <div className="info-category-item-wrapper">
                        <span className="info-span">{developer}</span>
                    </div>
                </div>
                <div className="info-category">
                    <h3 className="info-category-title">Genres</h3>
                    <div className="info-category-item-wrapper">
                        {genreElements}
                    </div>
                </div>
                {infoData.websites !== undefined ? websiteContainer() : null}
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
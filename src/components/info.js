import Loader from "./loader"
import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import overlay from "../assets/img/overlay.png"
import age1 from "../assets/img/ratings/age-rating-1.png"
import age2 from "../assets/img/ratings/age-rating-2.png"

import shadowman from "../assets/img/screenshots/shadowman.webp"
import trapt from "../assets/img/screenshots/trapt.webp"
import kuon from "../assets/img/screenshots/kuon.webp"
import vanhelsing from "../assets/img/screenshots/vanhelsing.webp"
import extermination from "../assets/img/screenshots/extermination.webp"
import silent2special from "../assets/img/screenshots/silent2special.webp"
import zombiehunters from "../assets/img/screenshots/zombiehunters.webp"
import ghostvibration from "../assets/img/screenshots/ghostvibration.webp"
import berserk from "../assets/img/screenshots/berserk.webp"
import resident4premium from "../assets/img/screenshots/resident4premium.webp"
import silentcollection from "../assets/img/screenshots/silentcollection.webp"
import daemon from "../assets/img/screenshots/daemon.webp"
import gegege from "../assets/img/screenshots/gegege.webp"
import gantz from "../assets/img/screenshots/gantz.webp"
import lifeline from "../assets/img/screenshots/lifeline.webp"
import fear from "../assets/img/screenshots/fear.webp"
import rlh from "../assets/img/screenshots/rlh.webp"
import haunted from "../assets/img/screenshots/haunted.webp"
import jaws from "../assets/img/screenshots/jaws.webp"
import turok from "../assets/img/screenshots/turok.webp"
import galerians from "../assets/img/screenshots/galerians.webp"
import tairyou from "../assets/img/screenshots/tairyou.webp"
import baroque from "../assets/img/screenshots/baroque.webp"
import kingsfield from "../assets/img/screenshots/kingsfield.webp"
import aliens from "../assets/img/screenshots/aliens.webp"
import abyss from "../assets/img/screenshots/abyss.webp"
import michigan from "../assets/img/screenshots/michigan.webp"
import survivor2 from "../assets/img/screenshots/survivor2.webp"
import hungryghosts from "../assets/img/screenshots/hungryghosts.webp"

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

        switch (infoData.title) {
            case "Shadow Man: 2econd Coming": {
                screenshot = shadowman
                break
            }
            case "Van Helsing": {
                screenshot = vanhelsing
                break
            }
            case "Zombie Hunters": {
                screenshot = zombiehunters
                break
            }
            case "Ghost Vibration": {
                screenshot = ghostvibration
                break
            }
            case "The Silent Hill Collection": {
                screenshot = silentcollection
                break
            }
            case "Daemon Summoner": {
                screenshot = daemon
                break
            }
            case "GeGeGe no Kitaro: Ibun Yokai Kitan": {
                screenshot = gegege
                break
            }
            case "Gantz: The Game": {
                screenshot = gantz
                break
            }
            case "Lifeline": {
                screenshot = lifeline
                break
            }
            case "The Fear": {
                screenshot = fear
                break
            }
            case "Run Like Hell: Hunt or Be Hunted": {
                screenshot = rlh
                break
            }
            case "The Haunted Mansion": {
                screenshot = haunted
                break
            }
            default: break
        }

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
                    infoData.title === "Shadow Tower: Abyss",
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
                    infoData.title === "Aliens Versus Predator: Extinction",
                    infoData.title === "Clock Tower 3",
                    infoData.title === "Devil May Cry 2",
                    infoData.title === "Mystic Nights",
                    infoData.title === "Resident Evil 4: Premium Edition",
                ],
                thirdScreenshotTitles = [
                    infoData.title === "Raw Danger!",
                    infoData.title === "Darkwatch",
                    infoData.title === "Rule of Rose",
                    infoData.title === "Resident Evil Outbreak",
                    infoData.title === "Resident Evil Outbreak File #2",
                    infoData.title === "BloodRayne 2",
                    infoData.title === "The X-Files: Resist or Serve",
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
                    infoData.title === "The Thing",
                    infoData.title === "ObsCure: The Aftermath",
                ]
            let i = 0
            if (firstScreenshotTitles.includes(true)) i = 1
            if (secondScreenshotTitles.includes(true)) i = 2
            if (thirdScreenshotTitles.includes(true)) i = 3
            if (fourthScreenshotTitles.includes(true)) i = 4
            screenshot = "https://images.igdb.com/igdb/image/upload/t_screenshot_big/" + infoData.screenshots[i].image_id + ".jpg"
            
            switch (infoData.title) {
                case "Trapt": {
                    screenshot = trapt
                    break
                }
                case "Kuon": {
                    screenshot = kuon
                    break
                }
                case "Extermination": {
                    screenshot = extermination
                    break
                }
                case "Berserk Millennium Empire Arc: Chapter of the Holy Demon War": {
                    screenshot = berserk
                    break
                }
                case "Silent Hill 2: Special 2 Disc Set": {
                    screenshot = silent2special
                    break
                }
                case "Jaws Unleashed": {
                    screenshot = jaws
                    break
                }
                case "Turok: Evolution": {
                    screenshot = turok
                    break
                }
                case "Galerians: Ash": {
                    screenshot = galerians
                    break
                }
                case "Simple 2000 Series Vol. 113: The Tairyou Jigoku": {
                    screenshot = tairyou
                    break
                }
                case "Resident Evil 4: Premium Edition": {
                    screenshot = resident4premium
                    break
                }
                case "Baroque": {
                    screenshot = baroque
                    break
                }
                case "King's Field IV": {
                    screenshot = kingsfield
                    break
                }
                case "Aliens Versus Predator: Extinction": {
                    screenshot = aliens
                    break
                }
                case "Shadow Tower: Abyss": {
                    screenshot = abyss
                    break
                }
                case "Michigan: Report from Hell": {
                    screenshot = michigan
                    break
                }
                case "Resident Evil Survivor 2 Code: Veronica": {
                    screenshot = survivor2
                    break
                }
                case "Hungry Ghosts": {
                    screenshot = hungryghosts
                    break
                }
                default: break
            }
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
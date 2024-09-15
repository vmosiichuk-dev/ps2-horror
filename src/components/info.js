import React, { Component } from "react"
import overlay from "../assets/img/overlay.png"
import menuImg from "../assets/img/plus.svg"
import upArrow from "../assets/img/up.svg"
import downArrow from "../assets/img/down.svg"
import "../assets/styles/info.css"

import ceroA from "../assets/img/ratings/ceroA.svg"
import ceroB from "../assets/img/ratings/ceroB.svg"
import ceroC from "../assets/img/ratings/ceroC.svg"
import ceroD from "../assets/img/ratings/ceroD.svg"
import ceroZ from "../assets/img/ratings/ceroZ.svg"
import esrbAO from "../assets/img/ratings/esrbAO.svg"
import esrbE from "../assets/img/ratings/esrbE.svg"
import esrbE10 from "../assets/img/ratings/esrbE10.svg"
import esrbEC from "../assets/img/ratings/esrbEC.svg"
import esrbM from "../assets/img/ratings/esrbM.svg"
import esrbRP from "../assets/img/ratings/esrbRP.svg"
import esrbT from "../assets/img/ratings/esrbT.svg"
import pegi3 from "../assets/img/ratings/pegi3.svg"
import pegi7 from "../assets/img/ratings/pegi7.svg"
import pegi12 from "../assets/img/ratings/pegi12.svg"
import pegi16 from "../assets/img/ratings/pegi16.svg"
import pegi18 from "../assets/img/ratings/pegi18.svg"
import usk12 from "../assets/img/ratings/usk12.svg"
import grac18 from "../assets/img/ratings/grac18.svg"
import jpW from "../assets/img/ratings/jpW.webp"

import abyss from "../assets/img/screenshots/abyss.webp"
import aliens from "../assets/img/screenshots/aliens.webp"
import baroque from "../assets/img/screenshots/baroque.webp"
import berserk from "../assets/img/screenshots/berserk.webp"
import daemon from "../assets/img/screenshots/daemon.webp"
import extermination from "../assets/img/screenshots/extermination.webp"
import evildeadr from "../assets/img/screenshots/evildeadr.webp"
import fear from "../assets/img/screenshots/fear.webp"
import galerians from "../assets/img/screenshots/galerians.webp"
import gantz from "../assets/img/screenshots/gantz.webp"
import ghosthunter from "../assets/img/screenshots/ghosthunter.webp"
import ghostvibration from "../assets/img/screenshots/ghostvibration.webp"
import haunted from "../assets/img/screenshots/haunted.webp"
import hungryghosts from "../assets/img/screenshots/hungryghosts.webp"
import jaws from "../assets/img/screenshots/jaws.webp"
import kingsfield from "../assets/img/screenshots/kingsfield.webp"
import kuon from "../assets/img/screenshots/kuon.webp"
import lifeline from "../assets/img/screenshots/lifeline.webp"
import michigan from "../assets/img/screenshots/michigan.webp"
import ps2collage from "../assets/img/screenshots/ps2collage.webp"
import resident4premium from "../assets/img/screenshots/resident4premium.webp"
import rlh from "../assets/img/screenshots/rlh.webp"
import silentcollection from "../assets/img/screenshots/silentcollection.webp"
import silent2special from "../assets/img/screenshots/silent2special.webp"
import survivor2 from "../assets/img/screenshots/survivor2.webp"
import tairyou from "../assets/img/screenshots/tairyou.webp"
import trapt from "../assets/img/screenshots/trapt.webp"
import turok from "../assets/img/screenshots/turok.webp"
import vanhelsing from "../assets/img/screenshots/vanhelsing.webp"
import zombiehunters from "../assets/img/screenshots/zombiehunters.webp"
import zombiehunters2 from "../assets/img/screenshots/zombiehunters2.webp"

class Info extends Component {
    constructor(props) {
        super(props)
        this.infoScreenshotRef = React.createRef()
        this.infoScreenshotImgRef = React.createRef()
        this.infoDescRef = React.createRef()
        this.infoDescWrapperRef = React.createRef()
        this.state = {
            wish: "",
            play: "",
            genres: [],
            companyLabel: "",
            companyName: "",
            screenshot: "",
            summary: "",
            websites: [],
            ageRatings: [],
            ageRatingJp: false,
            releaseDate: "",
            rating: "",
            title: "",
            src: "",
            descriptionOverflows: true
        } 
    }

    static getDerivedStateFromProps(props, state) {
        const { title, src, rating, genres, summary, first_release_date, companyLabel, companyName, screenshots, websites, ageRatings } = props.infoData

        let ageRatingJp = "",
            newCompanyLabel = "",
            newCompanyName = "",
            newScreenshot = "",
            newSummary = summary,
            newGenres = [],
            newWebsites = []

        const release = new Date((first_release_date * 1000)),
              yearNow = new Date(Date.now()).getFullYear(),
              yearsPast = yearNow - release.getFullYear()

        let releaseDate = release.toLocaleDateString("en-us", { year:"numeric", month:"short", day:"numeric"})

        if (genres !== undefined) newGenres = genres
        if (companyLabel !== undefined) newCompanyLabel = companyLabel
        if (companyName !== undefined) newCompanyName = companyName

        if (websites.length > 0) {
            websites.forEach(website => {
                const categoryGroup = [
                    website.category === 1,
                    website.category === 2,
                    website.category === 3,
                    website.category === 6,
                    website.category === 9,
                    website.category === 14
                ]

                if (categoryGroup.includes(true)) {
                    let label, url
                    url = website.url
                    switch (website.category) {
                        case 1:  label = "Official"; break
                        case 2:  label = "Wikia"; break
                        case 3:  label = "Wikipedia"; break
                        case 6:  label = "Twitch"; break
                        case 9:  label = "Youtube"; break
                        case 14: label = "Reddit"; break
                        default: break
                    }

                    const newWebsite = Object.assign({label: label, url: url})
                    newWebsites.push(newWebsite)
                } else {
                    newWebsites = []
                }
            })
        }

        if (newWebsites.length < 1) {
            const newWebsite = Object.assign({label: "Google", url: `https://www.google.com/search?q=${title.toLowerCase().replace(/ /g, '+')}+ps2`})
            newWebsites.push(newWebsite)
        }

        const firstGroup = [
            title === "Silent Hill 2: Restless Dreams",
            title === "Fatal Frame",
            title === "Onimusha: Warlords",
            title === "Haunting Ground",
            title === "Siren",
            title === "Curse: The Eye of Isis",
            title === "Manhunt 2",
            title === "Constantine",
            title === "Michigan: Report from Hell",
            title === "Resident Evil Survivor 2 Code: Veronica",
            title === "Vampire Night",
            title === "Phase Paradox",
            title === "Evil Twin: Cyprien's Chronicles",
            title === "Shadow Tower: Abyss",
            title === "The Thing"
        ]
        const secondGroup = [
            title === "Resident Evil 4",
            title === "Silent Hill 3",
            title === "BloodRayne",
            title === "Resident Evil Code: Veronica X",
            title === "Silent Hill: Shattered Memories",
            title === "Castlevania: Curse of Darkness",
            title === "Drakengard",
            title === "King's Field IV",
            title === "Aliens Versus Predator: Extinction",
            title === "Clock Tower 3",
            title === "Devil May Cry 2",
            title === "Mystic Nights",
            title === "Resident Evil 4: Premium Edition",
            title === "Evil Dead: A Fistful of Boomstick"
        ]
        const thirdGroup = [
            title === "Raw Danger!",
            title === "Darkwatch",
            title === "Rule of Rose",
            title === "Resident Evil Outbreak",
            title === "Resident Evil Outbreak File #2",
            title === "BloodRayne 2",
            title === "The X-Files: Resist or Serve"
        ]
        const fourthGroup = [
            title === "Silent Hill 2",
            title === "Devil May Cry 3: Dante's Awakening - Special Edition",
            title === "Legacy of Kain: Soul Reaver 2",
            title === "Silent Hill: Origins",
            title === "Onimusha 2: Samurai's Destiny",
            title === "Area 51",
            title === "Alone in the Dark: The New Nightmare",
            title === "Blood Omen 2: Legacy of Kain",
            title === "ObsCure: The Aftermath"
        ]

        let i = 0
        if (firstGroup.includes(true))  i = 1
        if (secondGroup.includes(true)) i = 2
        if (thirdGroup.includes(true))  i = 3
        if (fourthGroup.includes(true)) i = 4

        if (screenshots.length === 0) {
            switch (title) {
                case "Daemon Summoner": {
                    newScreenshot = daemon
                    break
                }
                case "Evil Dead: Regeneration": {
                    newScreenshot = evildeadr
                    break
                } 
                case "Gantz: The Game": {
                    newScreenshot = gantz
                    newSummary = "Gantz: The Game is an immersive adaptation of the popular manga and anime series. Fight surreal and deadly battle against menacing alien creatures, strategize and adapt to survive increasingly challenging encounters and unlock the mysteries surrounding character's predicament. The game boasts stunning visuals that capture the essence of the source material."
                    newCompanyLabel = "Developer"
                    newCompanyName = "KCEJ East"
                    break 
                }
                case "Ghosthunter": {
                    newScreenshot = ghosthunter
                    break
                }
                case "Ghost Vibration": {
                    newCompanyLabel = "Developer"
                    newCompanyName = "Artoon Co., Ltd."
                    newGenres = ["Action"]
                    newScreenshot = ghostvibration
                    break 
                }
                case "Lifeline": {
                    newScreenshot = lifeline
                    break
                }
                case "Run Like Hell: Hunt or Be Hunted": {
                    newScreenshot = rlh
                    break
                }
                case "The Fear": {
                    newScreenshot = fear
                    newSummary = "The Fear is an interactive movie featuring live actors. You can move from first-person perspective, each movement being shown as a full-motion video, as well as, solve puzzles and play out action sequences. The story tells about a group of filmmakers shooting a horror film. Guided by the 'Camera Man', they explore a mansion with the troubled past and learn its history."
                    break 
                }
                case "The Haunted Mansion": {
                    newScreenshot = haunted
                    newSummary = "The Haunted Mansion is an action-adventure video game released in 2003 from North America and 2004 in Europe and Japan by High Voltage Software. The game is based on the Disney ride of the same name, rather than the eponymous film, which was released shortly after the game.[2][3][4] However, some elements and set designs from the film are incorporated into the game."
                    break 
                }
                case "The Silent Hill Collection": {
                    newScreenshot = silentcollection
                    newGenres = ["Puzzle", "Adventure"]
                    newWebsites = [
                        {label: "Moby Games", url: "https://www.mobygames.com/game/22234/the-silent-hill-collection/"},
                        {label: "Crimson Ceremony", url: "https://www.crimson-ceremony.net/lostreleases/item.php?id=shgame_shbox-eur-collection"}
                    ]
                    break 
                }
                case "Van Helsing": {
                    newScreenshot = vanhelsing
                    break
                }
                case "Zombie Hunters": {
                    newScreenshot = zombiehunters
                    break
                }
                case "Zombie Hunters 2": {
                    newScreenshot = zombiehunters2
                    break
                }
                default: {
                    newScreenshot = ps2collage
                    break
                }
            }
        } else if (screenshots[i] !== undefined) newScreenshot = screenshots[i]

        switch (title) {
            case "Evil Twin: Cyprien's Chronicles" : {
                newSummary = "The game was originally intended to be released in late 1999 under the title of 'Evil Twin' but was later delayed due to financial reasons. The player takes control of a young orphan named Cyprien, who ventures through a nightmarish world and can transform into a superhero version of himself named Supercyp during his journey to Loren Darith to free his teddy bear, Lenny."
                break 
            }
            case "Phase Paradox" : {
                newGenres = ["Adventure"]
                newSummary = "Phase Paradox is an NTSC-J exclusive horror adventure set in the same universe as Philosoma, a PlayStation shoot-em-up. The Gallant, a spacecraft carrier was heavily damaged after the explosion of Planet 220. 20% of the crew is either dead or injured by the impact. Some of the survivors are going crazy. But even worst, unknown creatures begin to roam the ship."
                break 
            } 
            case "Mystic Nights" : {
                newSummary = "A South-Korean exclusive horror with Resident Evil gameplay style. You are called to investigate a secret government facility that was suddenly abandoned. On the way, you discover that it has been overtaken by numerous nightmarish monsters and vampires. In multi-player, you need to escape in a limited time, while one of the players takes the role of a renegade."
                break 
            } 
            case "Vampire Night" : {
                newSummary = "A light gun game first released for arcades and later ported to PS2 in 2001. The gameplay itself utilizes the engine that is used in The House of the Dead series. A struggle between light and dark, from three centuries back, is about to ensue. The parties involved are Michel and Albert – the two vampire hunters representing light, and the vampires representing dark."
                break 
            }  
            case "Cold Fear" : {
                newSummary = "Cold Fear is a first survival horror published by Ubisoft and developed by Darkworks – creators of Alone in the Dark: The New Nightmare. The game tells the story of Tom Hansen, a member of the United States Coast Guard, who comes to the aid of a Russian whaler and finds a mysterious virus has broken out and turned the crew into zombie like creatures."
                break 
            }
            case "BloodRayne" : {
                newSummary = "BloodRayne is an action-adventure hack and slash video game. The game has spawned a franchise with the addition of sequels, films, and self-contained comic books. The game begins in 1933, and consists of three acts. The plot revolves around Rayne – a dhampir looking for her father. She is working for the Brimstone Society and kills any vampire that crosses her path."
                break 
            }
            case "Trapt": {
                newScreenshot = trapt
                break 
            }
            case "Kuon": {
                newScreenshot = kuon
                break 
            }
            case "Extermination": {
                newScreenshot = extermination
                newSummary = "Coming out early in the system's life cycle, the title was used as a showcase at trade shows before its release. It is considered the first survival horror game on the PS2. The game generated hype amongst critics, but received mostly average reviews. There are significant differences between PAL and NTSC U/C versions including a redesign of the main protagonist and entirely rerecorded dialogue."
                break 
            }
            case "Berserk Millennium Empire Arc: Chapter of the Holy Demon War": {
                newScreenshot = berserk
                break 
            }
            case "Silent Hill 2: Special 2 Disc Set": {
                newScreenshot = silent2special
                newWebsites = [
                    { 
                        label: "Moby Games", 
                        url: "https://www.mobygames.com/game/138259/silent-hill-2-special-2-disc-set/" 
                    },
                    { 
                        label: "Crimson Ceremony", 
                        url: "https://www.crimson-ceremony.net/lostreleases/item.php?id=shgame_sh2-ps2-eur1" 
                    }
                ]
                break 
            }
            case "Jaws Unleashed": {
                newScreenshot = jaws
                break 
            }
            case "Turok: Evolution": {
                newScreenshot = turok
                break 
            }
            case "Galerians: Ash": {
                newScreenshot = galerians
                break 
            }
            case "Simple 2000 Series Vol. 113: The Tairyou Jigoku": {
                newScreenshot = tairyou
                newSummary = "The game follows the story of a schoolgirl chasing down a very Alice In Wonderland-styled rabbit through various worlds, to take back the cellphone he stole from her. While you're running around you come across hoards of massive insects. The enemies never truly die, within a few seconds they are back up again and ready to attack! There are some additional endings and unlockables."
                break 
            }
            case "Resident Evil 4": {
                newWebsites = [
                    {
                        label: "Twitch", 
                        url: "https://www.twitch.tv/directory/category/resident-evil-4-2005"
                    },
                    {
                        label: "Wikia", 
                        url: "https://residentevil.fandom.com/wiki/Resident_Evil_4_(2005)"
                    },
                    {
                        label: "Wikipedia", 
                        url: "https://en.wikipedia.org/wiki/Resident_Evil_4"
                    }
                ]
                break 
            }
            case "Resident Evil 4: Premium Edition": {
                newScreenshot = resident4premium
                newWebsites = [
                    {
                        label: "Twitch", 
                        url: "https://www.twitch.tv/directory/category/resident-evil-4-2005"
                    },
                    {
                        label: "Wikia", 
                        url: "https://residentevil.fandom.com/wiki/Resident_Evil_4_(2005)"
                    },
                    {
                        label: "Wikipedia", 
                        url: "https://en.wikipedia.org/wiki/Resident_Evil_4"
                    }
                ]
                break 
            }
            case "Baroque": {
                newScreenshot = baroque
                break 
            }
            case "King's Field IV": {
                newScreenshot = kingsfield
                newSummary = "The fourth game in the King's Field series (and third to be released in the west) and the last one released for home consoles. A demonic idol responsible for the destruction of an ancient race has re-emerged and threatens to destroy mankind. Your mission is to take on the role of a warrior who has to return the idol to the Ancient City to break its curse."
                break 
            }
            case "Aliens Versus Predator: Extinction": {
                newScreenshot = aliens
                break 
            }
            case "Shadow Tower: Abyss": {
                newScreenshot = abyss
                break 
            }
            case "Michigan: Report from Hell": {
                newScreenshot = michigan
                break 
            }
            case "Resident Evil Survivor 2 Code: Veronica": {
                newScreenshot = survivor2
                break 
            }
            case "Hungry Ghosts": {
                newScreenshot = hungryghosts
                newSummary = "Developed by Japanese software house Deep Space (previously responsible for the survival horror game Extermination) and designed by their founder Tokuro Fujiwara (previously responsible for, of all things, the seminal Ghosts 'n Goblins). Hungry Ghosts is a first-person horror action experience with some very deep character 'creation'. In fact, it is an immersive simulation."
                break 
            }
            default: break
        }

        const esrbMGroup = [
            title === "Resident Evil 4: Premium Edition",
            title === "The Silent Hill Collection",
        ]
        const pegi7Group = [
            title === "The Haunted Mansion",
            title === "Raw Danger!",
        ]
        const pegi12Group = [
            title === "Baroque",
            title === "King's Field IV",
            title === "Ghosthunter",
        ]
        const pegi16Group = [
            title === "Van Helsing",
            title === "The X-Files: Resist or Serve",
            title === "Onimusha 2: Samurai's Destiny",
            title === "Constantine",
            title === "Rule of Rose",
            title === "Haunting Ground",
            title === "BloodRayne",
            title === "Curse: The Eye of Isis",
        ]
        const pegi18Group = [
            title === "The Suffering",
            title === "The Suffering: Ties That Bind",
            title === "Manhunt 2",
            title === "Jaws Unleashed",
            title === "Resident Evil 4: Premium Edition",
            title === "Fatal Frame III: The Tormented",
            title === "The Silent Hill Collection",
            title === "Forbidden Siren 2",
        ]
        const ceroBGroup = [
            title === "Simple 2000 Series Vol. 113: The Tairyou Jigoku",
            title === "The Haunted Mansion",
            title === "Baroque",
            title === "Ghosthunter",
        ]
        const ceroCGroup = [
            title === "Fatal Frame",
            title === "Disaster Report",
            title === "Raw Danger!",
            title === "King's Field IV",
            title === "Van Helsing",
            title === "Trapt",
            title === "Fatal Frame III: The Tormented",
            title === "Silent Hill 2",
            title === "Silent Hill 2: Restless Dreams",
            title === "Silent Hill 2: Special 2 Disc Set",
            title === "Silent Hill 3",
            title === "The Silent Hill Collection",
            title === "Area 51",
            title === "Fatal Frame II: Crimson Butterfly",
            title === "Legacy of Kain: Soul Reaver 2",
            title === "Constantine",
            title === "Resident Evil Outbreak",
            title === "Resident Evil Outbreak File #2",
            title === "Siren",
            title === "Kuon",
            title === "Return to Castle Wolfenstein",
            title === "Rule of Rose",
            title === "The Thing",
            title === "Resident Evil: Dead Aim",
            title === "Onimusha: Warlords",
            title === "Run Like Hell: Hunt or Be Hunted",
            title === "Lifeline",
            title === "Forbidden Siren 2",
            title === "Resident Evil Survivor 2 Code: Veronica",
        ]
        const ceroDGroup = [
            title === "Resident Evil 4",
            title === "Resident Evil 4: Premium Edition",
            title === "Haunting Ground",
            title === "BloodRayne",
            title === "Hungry Ghosts",
            title === "Gantz: The Game",
        ]
        const ceroZGroup = [
            title === "Killer7",
            title === "Michigan: Report from Hell",
            title === "Berserk Millennium Empire Arc: Chapter of the Holy Demon War",
        ]
        const usk12Group = [
            title === "Ghost Vibration",
            title === "Evil Twin: Cyprien's Chronicles",
        ]
        const jpWGroup = [
            title === "The Fear",
            title === "Phase Paradox",
            title === "Shadow Tower: Abyss",
        ]

        let ageRating = "", ageRatingsImg = []

        if (ageRatings.length > 0) {
            ageRatings.forEach(item => {
                let rating    
                switch (item) {
                    case 1:  rating = pegi3; break
                    case 2:  rating = pegi7; break
                    case 3:  rating = pegi12; break
                    case 4:  rating = pegi16; break
                    case 5:  rating = pegi18; break
                    case 6:  rating = esrbRP; break
                    case 7:  rating = esrbEC; break
                    case 8:  rating = esrbE; break
                    case 9:  rating = esrbE10; break
                    case 10: rating = esrbT; break
                    case 11: rating = esrbM; break
                    case 12: rating = esrbAO; break
                    case 13: rating = ceroA; break
                    case 14: rating = ceroB; break
                    case 15: rating = ceroC; break
                    case 16: rating = ceroD; break
                    case 17: rating = ceroZ; break
                    case 20: rating = usk12; break
                    default: rating = "empty"; break
                }

                if (rating !== "empty") ageRatingsImg.push(rating)
            })
        }

        if (title === "Mystic Nights") {
            ageRating = grac18
            ageRatingsImg.push(ageRating) 
        }
        if (title === "Gregory Horror Show") {
            ageRating = ceroA
            ageRatingsImg.push(ageRating)
        }
        if (jpWGroup.includes(true)) {
            ageRating = jpW
            ageRatingsImg.push(ageRating) 
            ageRatingJp= true
        }
        if (usk12Group.includes(true)) {
            ageRating = usk12
            ageRatingsImg.push(ageRating)
        }
        if (ceroBGroup.includes(true)) {
            ageRating = ceroB
            ageRatingsImg.push(ageRating)
        }
        if (ceroCGroup.includes(true)) {
            ageRating = ceroC
            ageRatingsImg.push(ageRating)
        }
        if (ceroDGroup.includes(true)) {
            ageRating = ceroD
            ageRatingsImg.push(ageRating)
        }
        if (ceroZGroup.includes(true)) {
            ageRating = ceroZ
            ageRatingsImg.push(ageRating)
        }
        if (pegi7Group.includes(true)) {
            ageRating = pegi7
            ageRatingsImg.push(ageRating)
        }
        if (pegi12Group.includes(true)) {
            ageRating = pegi12
            ageRatingsImg.push(ageRating)
        }
        if (pegi16Group.includes(true)) {
            ageRating = pegi16
            ageRatingsImg.push(ageRating)
        }
        if (pegi18Group.includes(true)) {
            ageRating = pegi18
            ageRatingsImg.push(ageRating)
        }
        if (esrbMGroup.includes(true)) {
            ageRating = esrbM
            ageRatingsImg.push(ageRating)
        } 

        if (props.infoData.title !== state.title) {
            return {
                genres: newGenres,
                companyLabel: newCompanyLabel,
                companyName: newCompanyName,
                screenshot: newScreenshot,
                summary: newSummary,
                websites: newWebsites,
                ageRatings: ageRatingsImg,
                ageRatingJp: ageRatingJp,
                releaseDate: releaseDate,
                yearsPast: yearsPast,
                rating: rating,
                title: title,
                src: src
            }
        } else return null
    }

    renderAgeRatings = (ratings) => {
        const uniqueRatings = Array.from(new Set(ratings));
        
        return uniqueRatings.map(rating => {
            const startIndex = rating.indexOf("/static/media/") + "/static/media/".length;
            const dotIndex = rating.indexOf(".", startIndex);
            const ratingTransformed = dotIndex !== -1 ? rating.substring(startIndex, dotIndex) : null;

            let ratingAlt = ""

            switch (ratingTransformed) {
                case "usk12": {
                    ratingAlt = "USK 12"
                    break
                }
                case "jpW": {
                    ratingAlt = "Japanese violent content warning"
                    break
                }
                default: {
                    ratingAlt = ratingTransformed.slice(0, 4).toUpperCase() + " " + ratingTransformed.slice(4)
                    break
                }
            }

            return (
                <div key={ratingTransformed}>
                    <p key={ratingAlt} className="a11y">{ratingAlt}</p>
                    <img key={rating} className="info__age" src={rating} alt=""/>
                </div>
            )
        }) 
    }

    renderCategory = (title, state, tabIndex) => { 
        const renderElements = () => {
            return state.map(item => {    
                return (
                    title === "Links" 
                    ? <a key={item.label} href={item.url} className="info__category-link" target="_blank" rel="noopener noreferrer" tabIndex={tabIndex}>{item.label}</a> 
                    : <p className="m-0" key={item}>{item}</p>
                )
            })
        }

        return (
            <div className={"info__category _" + title.toLowerCase()}>
                <h3 className="info__category-title">{title}</h3>
                <div className="info__category-items">
                    {typeof state === "string" ? <span key={state}>{state}</span> : renderElements()}
                </div>
            </div>
        )
    }

    handleTabBlur = (e) => {
        const nextFocusable = e.relatedTarget
        const lastGameSlug = this.props.lastGameSlug()

        const nextFocusableInInfo = this.props.infoRef.current && this.props.infoRef.current.contains(nextFocusable)
        const activeButtonIsLastGame = this.props.activeButtonRef.current !== null && this.props.activeButtonRef.current.id !== `${lastGameSlug}--toolbar-delete` && this.props.activeButtonRef.current.className !== "game-buttons" && this.props.activeButtonRef.current.className !== "info__description"
        const mediaIsHover = matchMedia("(hover: hover)").matches

        if (!nextFocusableInInfo && activeButtonIsLastGame && mediaIsHover) {
            this.props.activeButtonRef.current.focus()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const infoDescWrapperCompStyle = getComputedStyle(this.infoDescWrapperRef.current)
        const infoDescHeight = this.infoDescRef.current.scrollHeight
        let infoDescWrapperHeight = this.infoDescWrapperRef.current.clientHeight

        infoDescWrapperHeight -= parseFloat(infoDescWrapperCompStyle.paddingTop) + parseFloat(infoDescWrapperCompStyle.paddingBottom)

        const descriptionOverflows = infoDescHeight > infoDescWrapperHeight

        if (prevState.descriptionOverflows !== descriptionOverflows) {
            this.setState({ descriptionOverflows: descriptionOverflows })
        }
    }

    render() {      
        const {title, src, rating, genres, summary, companyLabel, companyName, screenshot, websites, ageRatings, releaseDate, yearsPast, ageRatingJp, descriptionOverflows} = this.state
        const {openedInfo, onInfoClose, infoRef} = this.props  

        let infoClass = "info",
            infoAgeRatingClass = "info__age-container",
            infoTitleWrapperClass = "info__title-wrapper",
            infoContainerClass = "info__container",
            btnCloseClass = "btn info__close-btn",
            ps2LifeCycle = "middle",
            infoDescriptionClass = "info__description",
            hintClass = "info__description-hint",
            hintUpClass = "info__description-hint info__description-hint--up",
            tabIndex = -1

        if (openedInfo) { 
            infoClass += " is-active"
            btnCloseClass += " info__close-btn--fixed"
            tabIndex = 0
            this.infoScreenshotRef.current.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
        }

        if (ageRatingJp) infoAgeRatingClass += " has-jp"
        if (ageRatings.length < 1) infoTitleWrapperClass += " has-space"

        if (genres.length < 1 && companyName === "") {
            infoContainerClass += " has-one-category"
        } else if (genres.length < 1 || companyName === "") {
            infoContainerClass += " has-two-categories"
        }

        if (+releaseDate.slice(-4) <= 2004) ps2LifeCycle = "early"
        if (+releaseDate.slice(-4) >= 2009) ps2LifeCycle = "late"

        if (!descriptionOverflows) infoDescriptionClass += " has-space"
        if (openedInfo && descriptionOverflows) {
            hintClass += " is-active"
            hintUpClass += " is-active"
        }
        
        return (
            <article className={infoClass} aria-label={`Sidebar with game details. Selected game: ${title}`} tabIndex={tabIndex} ref={infoRef} onBlur={this.handleTabBlur}>
                <button className={btnCloseClass} type="button" onClick={onInfoClose} tabIndex={0}>
                    <img className="btn__img is-active" src={menuImg} alt="Close game information"/>
                </button>
                <div className={infoContainerClass}>   
                    <div className="info__screenshot" ref={this.infoScreenshotRef} >   
                        <img className="info__screenshot-img" src={screenshot} alt="" />
                        <div className="info__screenshot-shadow"></div>
                    </div>
                    <div className="game info__game-cover">
                        <img className="game__cover-img" src={src} alt={"PS2 game cover for " + title} />
                        <img className="game__cover-overlay" src={overlay} alt="" />
                    </div>
                    <div className={infoTitleWrapperClass}>
                        <h2 className="info__title">{title}</h2>
                        {releaseDate !== "Invalid Date" 
                          ? <div className="info__subtitle-wrapper">
                                <h3 className="info__subtitle"><span className="a11y">Release date: </span>{releaseDate} ({yearsPast} years ago)</h3>
                                <div className="btn info__rating-btn"><span className="a11y">Game rating: </span>{rating}</div>
                                <p className="info__rating-label" aria-hidden={true}>Rating</p>
                            </div>
                          :  <div className="info__subtitle-wrapper">
                                <h3 className="info__subtitle">Cancelled / Never released</h3>
                            </div>
                        }
                    </div>
                    <div className="info__description-wrapper" ref={this.infoDescWrapperRef}>
                        {(summary !== "" && summary !== undefined && summary.length > 86)
                        ? <p className={infoDescriptionClass} ref={this.infoDescRef} tabIndex={tabIndex}>{summary}</p> 
                        : (
                            <p className={infoDescriptionClass} ref={this.infoDescRef} tabIndex={tabIndex}>
                              {title} is a noteworthy addition to the PlayStation 2 library, offering a captivating and visually stunning
                              {genres.length > 0 ? ` ${genres[0].charAt(0).toLowerCase() + genres[0].substring(1)} experience` : " experience" }
                              {genres.length > 1 ? ` with ${genres[1].toLowerCase()} gameplay elements. ` : ". " }
                              {companyName !== "" ? `The game was ${companyLabel.slice(0, -2).toLowerCase()}ed by ${companyName}` : null } 
                              {companyName !== "" && releaseDate !== "Invalid Date" ? ` in ${releaseDate.slice(-4)}, making its debut during the ${ps2LifeCycle} stages of the PS2's lifecycle. ` : null}
                              {companyName !== "" && releaseDate === "Invalid Date" ? ", but was cancelled before being published. " : null}
                              {companyName === "" && releaseDate !== "Invalid Date" ? `The game was released in ${releaseDate.slice(-4)}, making its debut during the ${ps2LifeCycle} stages of the PS2's lifecycle. ` : null}
                              {companyName === "" && releaseDate === "Invalid Date" ? "The game was cancelled before being published. " : null}
                              {websites.length > 0 ? `If you're keen to know more about this unique title, follow the provided links.` : null }
                            </p>
                          )
                        }
                        <img className={hintUpClass} src={upArrow} alt="" />
                        <img className={hintClass} src={downArrow} alt="" />
                    </div>
                    {companyName !== "" ? this.renderCategory(companyLabel, companyName) : null}
                    {genres.length > 0 ? this.renderCategory("Genres", genres) : null}                
                    <div className={infoAgeRatingClass}>
                        {ageRatings.length > 0 ? <h3 className="a11y">Age Ratings</h3> : null}
                        {ageRatings.length > 0 ? this.renderAgeRatings(ageRatings) : null}
                    </div>
                    {websites.length > 0 ? this.renderCategory("Links", websites, tabIndex) : null}
                </div>
            </article>
        )
    }
}

export default Info
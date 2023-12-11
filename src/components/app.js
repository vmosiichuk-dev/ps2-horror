import React, { Component } from "react"
import IGDB from "../services/IGDB"
import Info from "./info"
import Navigation from "./navigation"
import About from "./about"
import AddGame from "./add-game"
import GameList from "./game-list"
import "../assets/styles/app.css"

import del from "../assets/img/del.png"
import noCover from "../assets/img/no-cover.webp" 

class App extends Component {
    constructor(props) {
        super(props)
        this.gameListRef = React.createRef()
        this.appRef = React.createRef()
        this.infoRef = React.createRef()
        this.activeButtonRef = React.createRef()
        this.aboutBtnRef = {
            desktop: React.createRef(),
            mobile: React.createRef()
        }
        this.addBtnRef = {
            desktop: React.createRef(),
            mobile: React.createRef()
        }
        this.state = {
            activeFilter: "all",
            addFormClass: "add-game__form-message is-inactive",
            addFormMessage: "Enter a game title. Title should be at least 4 characters.",
            addGameIsActive: false,
            aboutIsActive: false,
            addedTitle: "",
            apiDataLoaded: false,
            searchDataLoaded: false,
            data: [],
            searchData: [],
            searchRadioValue: "",
            infoData: {
                genres: [],
                involved_companies: [],
                screenshots: [],
                summary: "",
                websites: [],
                ageRatings: [],
                ageRatingJp: false,
                releaseDate: "",
                yearsPast: "",
                rating: "",
                title: "",
                src: ""
            },
            openedInfo: false,
            delSrc: del,
            searchQuery: "",
            totalCount: 88,
            playCount: 0,
            progressPlayCount: "0%",
            progressbarPlayStyle: {
                width: "0%",
                borderRadius: "4px 0 0 4px"
            },
            collCount: 0,
            progressCollCount: "0%",
            progressbarCollStyle: {
                width: "0%",
                borderRadius: "4px 0 0 4px"
            },
        }
    }

// –––––––––––––––––––––––––––– <Info /> functions –––––––––––––––––––––––––––––––––––

    openInfo = (slug) => {
        this.infoRef.current.focus()

        this.setState(prevState => {
            const newData = prevState.data.find(item => item.slug === slug)

            return { 
                infoData: newData, 
                openedInfo: true, 
                aboutIsActive: false, 
                addGameIsActive: false 
            }
        })  
    }

    getLastGameSlug = () => {
        const lastGame = this.state.data[this.state.data.length - 1]
        return lastGame ? lastGame.slug : null
    }

    closeInfo = () => this.setState({ openedInfo: false })
    
    closeTutorial = () => this.setState({ openedInfo: true })

// ––––––––––––––––––––––––– <Navigation /> functions ––––––––––––––––––––––––––––––––

    updateSearch = (searchQuery) => { this.setState({searchQuery}) }

    searchGame = (data, searchQuery) => {
        if (searchQuery.length === 0) { return data }
        return data.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    toggleFilter = (filterType) => { this.setState({ activeFilter: filterType }) }

    updateAside = (aside) => { 
        let otherAside = "aboutIsActive",
            aboutState = this.state.aboutIsActive,
            addGameState = !this.state.addGameIsActive,
            value = aboutState

        if (aside === "aboutIsActive") {
            otherAside = "addGameIsActive"
            aboutState = !aboutState
            addGameState = !addGameState
            value = addGameState
        }

        if (aboutState && addGameState) {
            this.setState({ [aside]: value, [otherAside]: !value })
        } else if (!aboutState && !addGameState) {
            this.setState({ [aside]: value }) 
        } else {
            this.setState({ [aside]: !value }) 
        }
    }

// –––––––––––––––––––––––––––– <AddGame /> functions ––––––––––––––––––––––––––––––––
    
    handleTitleChange = (e) => { this.setState({ addedTitle: e.target.value }) }

    resetAddFormClass = (str, error) => {
        setTimeout(() => {
            this.setState({ addFormClass: `add-game__form-message ${str} is-inactive` })
        }, 5000)
    }

    resetAddFormMessage = (error) => {
        setTimeout(() => {
            this.setState({  addFormMessage: error })
        }, 750)
    }

    handleSearchRadioChange = (e) => this.setState({searchRadioValue: e.target.value})

    handleAddGameSearch = async () => {
        try {
            const title = this.state.addedTitle,
                    body = `search "${title}"; fields id,name; where platforms = (8); limit 299;`,
                    get = await this.iGDB.getToken(),
                    games = await this.iGDB.getGames(get.access_token, body),
                    error = "Search a game by providing a title consisting of at least 3 characters.",
                    errorAPI = `No PS2 games found with the title '${title}'. Check the spelling or try another title.`
                    
            if (games.length < 1 && title.length >= 3) {
                this.setState({ searchData: [], searchDataLoaded: false, addedTitle: "", addFormMessage: errorAPI, addFormClass: "add-game__form-message" })
                this.resetAddFormClass("", errorAPI)
            } else if (title !== "" && title.length >= 3) {
                this.setState({ searchData: games, searchDataLoaded: true, addedTitle: "" })
            } else {
                this.setState({ addFormMessage: error, addFormClass: "add-game__form-message" })
                this.resetAddFormClass("", error)
            }
        } catch (error) {
            this.setState({ searchData: [], searchDataLoaded: false, addedTitle: "", addFormMessage: error, addFormClass: "add-game__form-message" })
            this.resetAddFormClass("", error)
            console.error("Error fetching data from the API:", error)
        }
    }  

    handleAddGameSubmit = async (e) => {
        e.preventDefault()
        try {
            const radioValue = this.state.searchRadioValue,
                    radioError = "To add a game to the library, you must first select it from the list.",
                    error = "Enter a game title. Title should be at least 3 characters."

            if (radioValue === "") {
                this.setState({ addFormMessage: radioError, addFormClass: "add-game__form-message" })
                this.resetAddFormClass("", error)
                return
            }

            const titleError = "This game already exists in your library. Please select a unique game."
            const success = "New game successfully added. You can now manage your collection."

            const body = `fields genres.name, name, total_rating, rating, aggregated_rating, age_ratings.rating, cover.image_id, first_release_date, involved_companies.developer, involved_companies.company.name, screenshots.image_id, slug, summary, websites.category, websites.url; where id = ${radioValue};`

            const get = await this.iGDB.getToken()
            const game = await this.iGDB.getGames(get.access_token, body)
            const gameFiltered = this.filterGame(game[0])
                    

            const duplicate = this.state.data.some(item => item.title.toLowerCase() === gameFiltered.title.toLowerCase())
            
            if (duplicate) {
                this.setState({ addFormMessage: titleError, addFormClass: "add-game__form-message" })
                this.resetAddFormClass("", error)
            } else {
                this.setState(prevState => {
                    const newData = [gameFiltered, ...prevState.data],
                            newPlayCount = newData.filter(item => item.play).length,
                            newCollCount = newData.filter(item => item.priceCategory !== "").length,
                            progress = this.countProgress(newData.length, [newPlayCount, newCollCount])
        
                    return { 
                        data: newData, 
                        playCount: newPlayCount, 
                        progressPlayCount: progress.play.progressCount, 
                        progressbarPlayStyle: progress.play.progressbarStyle,
                        collCount: newCollCount, 
                        progressCollCount: progress.coll.progressCount, 
                        progressbarCollStyle: progress.coll.progressbarStyle,
                        totalCount: newData.length, 
                        addFormMessage: success, 
                        addFormClass: "add-game__form-message add-game__form-message--success", 
                        addedTitle: "",
                        searchData: [],
                        searchDataLoaded: false, 
                        searchRadioValue: "" 
                    }
                })  
                this.resetAddFormClass("add-game__form-message--success", error)
                this.setLocalGameData()
                this.setLocalProgressData()
            }
        } catch (error) {
            this.setState({ addFormMessage: error, addFormClass: "add-game__form-message" })
            this.resetAddFormClass("", error)
            console.error("Error fetching data from the API:", error)
        }
    } 

// ––––––––––––––––––––––––––––– <GameList /> functions –––––––––––––––––––––––––––––

    markState = (slug, state) => {
        this.setState(prevState => {
            const newData = prevState.data.map(item => {
                if (item.slug === slug) { 
                    return { ...item, [state]: !item[state] } 
                }

                return item
            })

            const newPlayCount = newData.filter(item => item.play).length,
                  progress = this.countProgress(newData.length, [newPlayCount])

            return { 
                data: newData, 
                playCount: newPlayCount, 
                progressPlayCount: progress.play.progressCount, 
                progressbarPlayStyle: progress.play.progressbarStyle
            }
        })  

        this.setLocalGameData()
        this.setLocalProgressData()
    }

    countProgress = (totalCount, counts) => {
        let countsResult = {}

        counts.forEach((count, i) => {
            const state = i === 0 ? "play" : "coll"
            const progressCount = Math.round(count / totalCount * 100) + "%"
            const result = {
                [state]: {
                    progressCount: progressCount, 
                    progressbarStyle: {
                        width: progressCount,
                        borderRadius: progressCount === "100%" ? "4px" : "4px 0 0 4px"
                    }
                }
            }

            countsResult = {...countsResult, ...result}
        })

        return countsResult
    }   

    handlePriceCategoryChange = (slug, category) => {
        const { activeFilter } = this.state

        this.setState(prevState => {
            const game = prevState.data.find(item => {
                return item.slug === slug
            })
             
            const newData = prevState.data.map(item => {
                let gamePrice = game.priceCategory,
                    price = "priceCategory"

                if (activeFilter === "wish") {
                    gamePrice = game.wishPriceCategory
                    price = "wishPriceCategory"
                }

                if (item.slug === slug && gamePrice === category) { 
                    return { ...item, [price]: "" } 
                } else if (item.slug === slug) { 
                    return { ...item, [price]: category } 
                } else {
                    return item
                }
            })

            const newCollCount = newData.filter(item => item.priceCategory !== "").length,
                  progress = this.countProgress(newData.length, [1, newCollCount])

            return { 
                data: newData,
                collCount: newCollCount, 
                progressCollCount: progress.coll.progressCount, 
                progressbarCollStyle: progress.coll.progressbarStyle 
            }
        })  

        this.setLocalGameData()
        this.setLocalProgressData()
    }

    deleteItem = (slug) => {   
        this.setState(prevState => {
            const newData = prevState.data.filter(item => item.slug !== slug)
            const newPlayCount = newData.filter(item => item.play).length
            const newCollCount = newData.filter(item => item.priceCategory !== "").length
            const progress = this.countProgress(newData.length, [newPlayCount, newCollCount])

            let newInfoData = prevState.infoData
            if (prevState.data[0].slug === slug) newInfoData = newData[0]

            return { 
                data: newData, 
                infoData: newInfoData,
                playCount: newPlayCount, 
                progressPlayCount: progress.play.progressCount, 
                progressbarPlayStyle: progress.play.progressbarStyle,
                collCount: newCollCount, 
                progressCollCount: progress.coll.progressCount, 
                progressbarCollStyle: progress.coll.progressbarStyle
            }
        })  

        this.setLocalGameData()
        this.setLocalProgressData()
    }

// ––––––––––––––––––––––––––––– <App /> functions –––––––––––––––––––––––––––––––––––

    getMainError = (filteredData) => {
        const { playCount, collCount, activeFilter } = this.state
        const wishCount = filteredData.filter(item => item.wish).length

        let errorClass = "main__error",
            errorMessage = ""

        if (filteredData.length === 0) {
            errorClass += " is-active"
            errorMessage = (
                <span>
                    The game you are looking for is not found.<br />
                    You can add a game to the list by opening an add game sidebar from the navigation (+ plus sign).
                </span>
            )
        }

        if (activeFilter === "play" && playCount === 0) {
            errorMessage = (
                <span>
                    There are no games marked as played yet.<br />
                    To mark a game as played, hover or press on a game card and press the played button (controller icon).
                </span>
            )
        } else if (activeFilter === "wish" && wishCount === 0) {
            errorMessage = (
                <span>
                    There are no games in your wishlist yet.<br />
                    To add a game to the wishlist, hover or press on a game card and press the wishlist button (star icon).
                </span>
            )
        } else if (activeFilter === "coll" && collCount === 0) {
            errorMessage = (
                <span>
                    There are no games in your collection yet.<br />
                    To add a game to the collection, press one of three buttons with price options to select the one you own.
                </span>
            )
        }

        return <p className={errorClass} role="status">{errorMessage}</p>
    }

    gamePrices = [
        {title: "Aliens Versus Predator: Extinction", prices: {loose: 25, cib: 35, newg: 225}},
        {title: "Alone in the Dark", prices: {loose: 5, cib: 10, newg: 34}},
        {title: "Alone in the Dark: The New Nightmare", prices: {loose: 25, cib: 35, newg: "n/a"}},
        {title: "Area 51", prices: {loose: 15, cib: 25, newg: 260}},
        {title: "Baroque", prices: {loose: 49, cib: 64, newg: 150}},
        {title: "Berserk Millennium Empire Arc: Chapter of the Holy Demon War", prices: {loose: 37, cib: 47, newg: 345}},
        {title: "Blood Omen 2: Legacy of Kain", prices: {loose: 11, cib: 17, newg: 135}},
        {title: "BloodRayne", prices: {loose: 4, cib: 17, newg: 108}},
        {title: "BloodRayne 2", prices: {loose: 5, cib: 13, newg: 125}},
        {title: "Castlevania: Curse of Darkness", prices: {loose: 35, cib: 51, newg: 400}},
        {title: "Clock Tower 3", prices: {loose: 43, cib: 80, newg: 360}},
        {title: "Cold Fear", prices: {loose: 35, cib: 58, newg: 160}},
        {title: "Constantine", prices: {loose: 8, cib: 12, newg: 35}},
        {title: "Curse: The Eye of Isis", prices: {loose: 6, cib: 27, newg: 106}},
        {title: "Daemon Summoner", prices: {loose: 4, cib: 6, newg: 25}},
        {title: "Darkwatch", prices: {loose: 23, cib: 30, newg: 150}},
        {title: "Devil May Cry 2", prices: {loose: 5, cib: 11, newg: 44}},
        {title: "Devil May Cry 3: Dante's Awakening - Special Edition", prices: {loose: 6, cib: 8, newg: 49}},
        {title: "Dino Stalker", prices: {loose: 10, cib: 25, newg: 134}},
        {title: "Disaster Report", prices: {loose: 40, cib: 50, newg: "n/a"}},
        {title: "Drakengard", prices: {loose: 25, cib: 55, newg: 500}},
        {title: "Echo Night: Beyond", prices: {loose: 95, cib: 170, newg: 619}},
        {title: "Evil Dead: A Fistful of Boomstick", prices: {loose: 18, cib: 29, newg: 160}},
        {title: "Evil Dead: Regeneration", prices: {loose: 30, cib: 38, newg: 250}},
        {title: "Evil Twin: Cyprien's Chronicles", prices: {loose: 6, cib: 7, newg: 53}},
        {title: "Extermination", prices: {loose: 5, cib: 8, newg: 85}},
        {title: "Fatal Frame", prices: {loose: 50, cib: 82, newg: 649}},
        {title: "Fatal Frame II: Crimson Butterfly", prices: {loose: 50, cib: 96, newg: 308}},
        {title: "Fatal Frame III: The Tormented", prices: {loose: 65, cib: 80, newg: 333}},
        {title: "Forbidden Siren 2", prices: {loose: "n/a", cib: 51, newg: 610}},
        {title: "Galerians: Ash", prices: {loose: 11, cib: 35, newg: 160}},
        {title: "Gantz: The Game", prices: {loose: 30, cib: 50, newg: "n/a"}},
        {title: "Ghosthunter", prices: {loose: 16, cib: 55, newg: 425}},
        {title: "Ghost Vibration", prices: {loose: "n/a", cib: 32, newg: 138}},
        {title: "Gregory Horror Show", prices: {loose: "n/a", cib: 89, newg: 385}},
        {title: "Haunting Ground", prices: {loose: "n/a", cib: 350, newg: 2000}},
        {title: "Hungry Ghosts", prices: {loose: 20, cib: 37, newg: 150}},
        {title: "Jaws Unleashed", prices: {loose: 4, cib: 7, newg: 1000}},
        {title: "Killer7", prices: {loose: 18, cib: 44, newg: 60}},
        {title: "King's Field IV", prices: {loose: 42, cib: 75, newg: 450}},
        {title: "Kuon", prices: {loose: 595, cib: 865, newg: 2500}},
        {title: "Legacy of Kain: Defiance", prices: {loose: 17, cib: 23, newg: 110}},
        {title: "Legacy of Kain: Soul Reaver 2", prices: {loose: 10, cib: 15, newg: 135}},
        {title: "Lifeline", prices: {loose: 35, cib: 50, newg: 199}},
        {title: "Manhunt", prices: {loose: 10, cib: 25, newg: 350}},
        {title: "Manhunt 2", prices: {loose: 31, cib: 60, newg: 250}},
        {title: "Michigan: Report from Hell", prices: {loose: 500, cib: 597, newg: "n/a"}},
        {title: "Mystic Nights", prices: {loose: 9, cib: 22, newg: "n/a"}},
        {title: "ObsCure", prices: {loose: 100, cib: 200, newg: 7000}},
        {title: "ObsCure: The Aftermath", prices: {loose: 20, cib: 30, newg: 150}},
        {title: "Onimusha: Warlords", prices: {loose: 6, cib: 10, newg: 999}},
        {title: "Onimusha 2: Samurai's Destiny", prices: {loose: 7, cib: 14, newg: 55}},
        {title: "Phase Paradox", prices: {loose: 12, cib: 17, newg: "n/a"}},
        {title: "Raw Danger!", prices: {loose: 17, cib: 22, newg: 52}},
        {title: "Resident Evil Code: Veronica X", prices: {loose: 5, cib: 12, newg: 360}},
        {title: "Resident Evil: Dead Aim", prices: {loose: 24, cib: 40, newg: 315}},
        {title: "Resident Evil Outbreak", prices: {loose: 10, cib: 16, newg: 300}},
        {title: "Resident Evil Outbreak File #2", prices: {loose: 40, cib: 44, newg: 300}},
        {title: "Resident Evil Survivor 2 Code: Veronica", prices: {loose: 35, cib: 80, newg: "n/a"}},
        {title: "Resident Evil 4", prices: {loose: 6, cib: 15, newg: 140}},
        {title: "Resident Evil 4: Premium Edition", prices: {loose: 50, cib: 60, newg: 700}},
        {title: "Return to Castle Wolfenstein", prices: {loose: 4, cib: 12, newg: 119}},
        {title: "Rule of Rose", prices: {loose: 550, cib: 700, newg: 1723}},
        {title: "Run Like Hell: Hunt or Be Hunted", prices: {loose: 5, cib: 12, newg: 40}},
        {title: "Silent Hill 2", prices: {loose: 85, cib: 120, newg: 850}},
        {title: "Silent Hill 2: Restless Dreams", prices: {loose: 44, cib: 56, newg: 373}},
        {title: "Silent Hill 2: Special 2 Disc Set", prices: {loose: 86, cib: 129, newg: "n/a"}},
        {title: "Silent Hill 3", prices: {loose: 105, cib: 150, newg: 999}},
        {title: "Silent Hill 4: The Room", prices: {loose: 70, cib: 100, newg: 330}},
        {title: "Silent Hill: Origins", prices: {loose: 80, cib: 100, newg: 350}},
        {title: "Silent Hill: Shattered Memories", prices: {loose: 200, cib: 300, newg: 999}},
        {title: "Shadow Man: 2econd Coming", prices: {loose: 7, cib: 12, newg: 40}},
        {title: "Shadow Tower: Abyss", prices: {loose: 52, cib: 68, newg: 234}},
        {title: "Simple 2000 Series Vol. 113: The Tairyou Jigoku", prices: {loose: 35, cib: 47, newg: "n/a"}},
        {title: "Siren", prices: {loose: 19, cib: 40, newg: 315}},
        {title: "The Fear", prices: {loose: 39, cib: 46, newg: 122}},
        {title: "The Haunted Mansion", prices: {loose: 10, cib: 13, newg: "n/a"}},
        {title: "The Silent Hill Collection", prices: {loose: 80, cib: 152, newg: 1830}},
        {title: "The Suffering", prices: {loose: 23, cib: 42, newg: 405}},
        {title: "The Suffering: Ties That Bind", prices: {loose: 20, cib: 45, newg: 630}},
        {title: "The Thing", prices: {loose: 18, cib: 30, newg: 405}},
        {title: "The X-Files: Resist or Serve", prices: {loose: 40, cib: 61, newg: 599}},
        {title: "Trapt", prices: {loose: 25, cib: 60, newg: 250}},
        {title: "Turok: Evolution", prices: {loose: 5, cib: 10, newg: 250}},
        {title: "Van Helsing", prices: {loose: 5, cib: 10, newg: 125}},
        {title: "Vampire Night", prices: {loose: 16, cib: 23, newg: 249}},
        {title: "Zombie Hunters", prices: {loose: 48, cib: 53, newg: 80}},
        {title: "Zombie Hunters 2", prices: {loose: "n/a", cib: 100, newg: 135}},
    ]

    filterGame = (game) => {
        let genres = [],
            websites = [],
            ageRatings = [],
            screenshots = [],
            companyLabel = "",
            companyName = "",
            rating = "N/A",
            title = "",
            src = ""

        if (game.total_rating) {
            rating = Math.round(game.total_rating)
        } else if (game.rating) {
            rating = Math.round(game.rating)
        } else if (game.aggregated_rating) {
            rating = Math.round(game.aggregated_rating)
        }

        if (game.age_ratings === undefined) {
            ageRatings = []
        } else if (game.age_ratings.length > 0) {
            game.age_ratings.forEach(item => ageRatings.push(item.rating))
        }

        if (game.genres !== undefined) {
            game.genres.forEach((genre, i) => { if (i < 4) genres.push(genre.name) })
        }

        if (game.involved_companies !== undefined) {
            game.involved_companies.forEach(item => {
                if (item.developer) {
                    companyLabel = "Developer"
                    companyName = item.company.name
                }
            })

            if (game.involved_companies.length > 0 && companyLabel !== "Developer") {
                companyLabel = "Publisher"
                companyName = game.involved_companies[0].company.name
            }
        }

        if (game.websites !== undefined) {
            game.websites.forEach(item => {
                delete item.id
                websites.push(item)
            })
        }

        if (game.screenshots !== undefined) {
            const screenshotsSliced = game.screenshots.slice(0, 5)
            screenshotsSliced.forEach(item => screenshots.push("https://images.igdb.com/igdb/image/upload/t_screenshot_big/" + item.image_id + ".jpg"))
        }

        title = game.name
        let gamePrice = this.gamePrices.find(item => item.title === title)
        if (gamePrice === undefined) gamePrice = {prices: { loose: "n/a", cib: "n/a", newg: "n/a" }}

        game.cover !== undefined ? src = "https://images.igdb.com/igdb/image/upload/t_cover_big/" + game.cover.image_id + ".jpg" : src = noCover

        delete game.total_rating
        delete game.rating
        delete game.aggregated_rating
        delete game.age_ratings
        delete game.genres
        delete game.involved_companies
        delete game.screenshots
        delete game.websites
        delete game.name
        delete game.cover                

        const filters = { wish: false, play: false }
        const gameData = { 
            title: title, 
            rating: rating, 
            ageRatings: ageRatings, 
            genres: genres,
            companyLabel: companyLabel,
            companyName: companyName,
            screenshots: screenshots,
            websites: websites,
            src: src, 
            ...game, 
            wishPriceCategory: "",
            priceCategory: "",
            ...gamePrice.prices
        }

        return Object.assign(filters, gameData)
    }

	iGDB = new IGDB()

    handleWelcomeClick = async () => {
        try {
            const localGameData = JSON.parse(window.localStorage.getItem("PS2_SURVIVAL_HORROR_GAME_DATA"))

            if ((localGameData === null || localGameData.length < 1)) {
                const ratedGames = [],
                    notRatedGames = [],
                    body = "fields genres.name, name, total_rating, rating, aggregated_rating, age_ratings.rating, cover.image_id, first_release_date, involved_companies.developer, involved_companies.company.name, screenshots.image_id, slug, summary, websites.category, websites.url; limit 88; where platforms = (8) & genres != (4,10,16,34) & themes = (19,21) & themes != (35,39) & keywords != (5340) & player_perspectives != (4,5) & franchises != (463,824) & id != (3837,2862,6200,5143,2861,210296,43614,11286,5868,43262,43264,20829,1159,43301,253324,85965,172551,91643,43633,43210,49405,132163,136,260797,77219,127959,20640,37045,144966,203260,13901,24096,64108,72157,73012); sort total_rating desc;",
                    get = await this.iGDB.getToken(),
                    games = await this.iGDB.getGames(get.access_token, body)

                games.forEach(game => {
                    const gameFiltered = this.filterGame(game)
                    if (gameFiltered.rating === "N/A") {
                        notRatedGames.push(gameFiltered)
                    } else {
                        ratedGames.push(gameFiltered)
                    }
                })

                const allGames = [...ratedGames, ...notRatedGames]

                this.setState({ 
                    data: allGames, 
                    apiDataLoaded: true, 
                    infoData: allGames[0] 
                })
            } else {
                const localPlayCount = JSON.parse(window.localStorage.getItem("PS2_SURVIVAL_HORROR_PLAY_COUNT"))

                const localPlayPercent = JSON.parse(window.localStorage.getItem("PS2_SURVIVAL_HORROR_PLAY_PROGRESS_COUNT"))

                const localPlayProgressbar = JSON.parse(window.localStorage.getItem("PS2_SURVIVAL_HORROR_PLAY_PROGRESSBAR_STYLE"))

                const localCollCount = JSON.parse(window.localStorage.getItem("PS2_SURVIVAL_HORROR_WISH_COUNT"))

                const localWishPercent = JSON.parse(window.localStorage.getItem("PS2_SURVIVAL_HORROR_WISH_PROGRESS_COUNT"))

                const localWishProgressbar = JSON.parse(window.localStorage.getItem("PS2_SURVIVAL_HORROR_WISH_PROGRESSBAR_STYLE"))

                this.setState({ 
                    apiDataLoaded: true,
                    data: localGameData, 
                    infoData: localGameData[0],
                    playCount: localPlayCount, 
                    progressPlayCount: localPlayPercent, 
                    progressbarPlayStyle: localPlayProgressbar,
                    collCount: localCollCount, 
                    progressCollCount: localWishPercent, 
                    progressbarCollStyle: localWishProgressbar 
                })
            }

            this.props.onStateChange("transitionStart")

            const setTimeoutPromise = () => new Promise(() => {
                setTimeout(() => {
                    this.toggleFilter("all")
                    this.props.onStateChange("apiLoaded")
                    this.setLocalGameData()
                    this.setLocalProgressData()
                }, 2500)
            })

            await setTimeoutPromise()
        } catch (error) {
            this.props.onError()
            console.error("Error fetching data from the API:", error)
        }
    }  

    setLocalGameData = () => {
        setTimeout(() => {
            const {data} = this.state

            window.localStorage.setItem("PS2_SURVIVAL_HORROR_GAME_DATA", JSON.stringify(data))
        }, 125)
    }

    setLocalProgressData = () => {
        setTimeout(() => {
            const {playCount, progressPlayCount, progressbarPlayStyle, collCount, progressCollCount, progressbarCollStyle} = this.state

            window.localStorage.setItem("PS2_SURVIVAL_HORROR_PLAY_COUNT", JSON.stringify(playCount))
            window.localStorage.setItem("PS2_SURVIVAL_HORROR_PLAY_PROGRESS_COUNT", JSON.stringify(progressPlayCount))
            window.localStorage.setItem("PS2_SURVIVAL_HORROR_PLAY_PROGRESSBAR_STYLE", JSON.stringify(progressbarPlayStyle))

            window.localStorage.setItem("PS2_SURVIVAL_HORROR_WISH_COUNT", JSON.stringify(collCount))
            window.localStorage.setItem("PS2_SURVIVAL_HORROR_WISH_PROGRESS_COUNT", JSON.stringify(progressCollCount))
            window.localStorage.setItem("PS2_SURVIVAL_HORROR_WISH_PROGRESSBAR_STYLE", JSON.stringify(progressbarCollStyle))
        }, 125)
    }

    handleTabKeydown = (e, focusableElements) => {            
        const firstElement = focusableElements[0]
        const secondElement = focusableElements[1]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.key === "Tab") {
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault()
                lastElement.focus()          
            }
            if (!e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault()
                secondElement.focus()                 
            }
            if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault()
                firstElement.focus()       
            }
        }
    }

    handleWindowResize = () => {
        const mediaClass = window.innerWidth >= 1225 ? "desktop" : "mobile"
        this.aboutBtnRef.current = this.aboutBtnRef[mediaClass].current
        this.addBtnRef.current = this.addBtnRef[mediaClass].current
    }

    componentDidMount() {
        const app = this.appRef.current
        const infoShouldOpen = app.clientWidth > 1225 && app.clientHeight < 870

        if (infoShouldOpen) this.setState({ openedInfo: infoShouldOpen })

        this.handleWindowResize()
        window.addEventListener("resize", this.handleWindowResize)
    }

    componentDidUpdate() {
        if (this.props.welcomeClick && !this.state.apiDataLoaded) this.handleWelcomeClick()
    }

    componentWillUnmount() { 
        window.removeEventListener("resize", this.handleWindowResize)
    }

// –––––––––––––––––––––––––––––—— END functions ––––––––––––––––––––––––––––––——–––––

    render() {
        const { data,
            infoData, 
            openedInfo,
            searchQuery,
            addedTitle, 
            playCount, 
            progressPlayCount,
            progressbarPlayStyle,
            collCount, 
            progressCollCount,
            progressbarCollStyle,
            addFormClass,
            addFormMessage,
            addGameIsActive,
            aboutIsActive,
            delSrc,
            activeFilter,
            searchData,
            searchDataLoaded
        } = this.state
        const { appAria } = this.props

        const renderData = this.searchGame(data, searchQuery)

        const filteredData = renderData.filter(item => {
            if (activeFilter === "play" && !item.play) {
                return false
            } else if (activeFilter === "wish" && !item.wish) {
                return false
            } else if (activeFilter === "coll" && item.priceCategory === "") {
                return false
            }
            return true
        })

        const mainError = this.getMainError(filteredData)

        let appClass = "app"
        if (this.props.transitionStart)  appClass += " has-faded-in"

        return (
            <div className={appClass} ref={this.appRef} aria-hidden={appAria}>  
                <Navigation  
                    data={data} 
                    filteredData={filteredData} 
                    playCount={playCount}
                    progressPlayCount={progressPlayCount}
                    progressbarPlayStyle={progressbarPlayStyle}
                    collCount={collCount}
                    progressCollCount={progressCollCount}
                    progressbarCollStyle={progressbarCollStyle}
                    addGameIsActive={addGameIsActive}
                    aboutIsActive={aboutIsActive}
                    activeFilter={activeFilter}
                    onSearchUpdate={this.updateSearch} 
                    onFilterChange={this.toggleFilter}
                    onAsideChange={this.updateAside}
                    aboutBtnRef={this.aboutBtnRef}
                    addBtnRef={this.addBtnRef}
                    gameListRef={this.gameListRef}
                />
                <Info 
                    infoRef={this.infoRef}
                    activeButtonRef={this.activeButtonRef}
                    lastGameSlug={this.getLastGameSlug}
                    infoData={infoData} 
                    openedInfo={openedInfo}
                    onInfoClose={this.closeInfo} 
                />
                <main className="main"> 
                    {mainError}  
                    <GameList 
                        gameListRef={this.gameListRef}
                        infoRef={this.infoRef}
                        activeButtonRef={this.activeButtonRef}
                        activeFilter={activeFilter}
                        filteredData={filteredData} 
                        delSrc={delSrc}
                        onDelete={this.deleteItem} 
                        onMarkState={this.markState} 
                        onOpenInfo={this.openInfo} 
                        onPriceCategoryChange={this.handlePriceCategoryChange}
                    />
                </main>
                <About 
                    aboutIsActive={aboutIsActive}
                    aboutBtnRef={this.aboutBtnRef}
                    onTabKeydown={this.handleTabKeydown}
                    onWindowResize={this.handleWindowResize}
                />
                <AddGame 
                    addedTitle={addedTitle} 
                    addFormClass={addFormClass}
                    addFormMessage={addFormMessage}
                    addGameIsActive={addGameIsActive}
                    searchData={searchData}
                    searchDataLoaded={searchDataLoaded}
                    onTitleChange={this.handleTitleChange} 
                    onSearchRadioChange={this.handleSearchRadioChange}
                    onAddGameSearch={this.handleAddGameSearch} 
                    onAddGameSubmit={this.handleAddGameSubmit} 
                    aboutBtnRef={this.aboutBtnRef}
                    addBtnRef={this.addBtnRef}
                    onWindowResize={this.handleWindowResize}
                    onTabKeydown={this.handleTabKeydown}
                />
            </div>
        )
    }
}

export default App
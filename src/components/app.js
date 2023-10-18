import { Component } from "react"
import AddGame from "./add-game"
import About from "./about"
import Info from "./info"
import SearchPanel from "./search-panel"
import GameList from "./game-list"
import del from "../assets/img/del.png"
import noCover from "../assets/img/no-cover.webp" 
import "../assets/styles/app.css"
import IGDB from "../services/IGDB"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeFilter: "all",
            addFormClass: "add-message invisible",
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
            wishCount: 0,
            progressWishCount: "0%",
            progressbarWishStyle: {
                width: "0%",
                borderRadius: "4px 0 0 4px"
            },
        }
    }

// –––––––––––––––––––––––––––––––– <Info /> functions ––––––––––––––––––––––––––––––––––

    openInfo = (slug) => this.setState(prevState => {
        const newData = prevState.data.find(item => item.slug === slug)
        return { infoData: newData, openedInfo: true, aboutIsActive: false, addGameIsActive: false }
    })  

    closeInfo = () => this.setState({openedInfo: false})
    
    closeTutorial = () => this.setState({openedInfo: true})

// ––––––––––––––––––––––––––––– <SearchPanel /> functions ––––––––––––––––––––––––––––––

    updateSearch = (searchQuery) => { this.setState({searchQuery}) }

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

// ––––––––––––––––––––––––––––––––– <GameList /> functions –––––––––––––––––––––––––––––––––

    markState = (slug, state) => {
        this.setState(prevState => {
            const newData = prevState.data.map(item => {
                if (item.slug === slug) { return { ...item, [state]: !item[state] } }
                return item
            })
    
            let newPlayCount = prevState.playCount,
                newProgressPlayCount = prevState.progressPlayCount,
                newProgressbarPlayStyle = prevState.progressbarPlayStyle

            let newWishCount = prevState.wishCount,
                newProgressWishCount = prevState.progressWishCount,
                newProgressbarWishStyle = prevState.progressbarWishStyle

            if (state === "play") {
                newPlayCount = newData.filter(item => item.play).length
                const progress = this.countProgress(newPlayCount)
                newProgressPlayCount = progress[0]
                newProgressbarPlayStyle = progress[1]
            } else {
                newWishCount = newData.filter(item => item.wish).length
                const progress = this.countProgress(newWishCount)
                newProgressWishCount = progress[0]
                newProgressbarWishStyle = progress[1]
            }

            return { data: newData, 
                     playCount: newPlayCount, progressPlayCount: newProgressPlayCount, progressbarPlayStyle: newProgressbarPlayStyle,
                     wishCount: newWishCount, progressWishCount: newProgressWishCount, progressbarWishStyle: newProgressbarWishStyle }
        })  
    }

    countProgress = (newCount) => {
        let result = []
        const newProgressCount = Math.round(newCount / this.state.totalCount * 100) + "%",
              newProgressbarStyle = {
                  width: newProgressCount,
                  borderRadius: newProgressCount === "100%" ? "4px" : "4px 0 0 4px"
              }

        result.push(newProgressCount, newProgressbarStyle)
        return result
    }   

    handlePriceCategoryChange = (slug, category) => {
        this.setState(prevState => {
            const game = prevState.data.find(item => {
                return item.slug === slug
            })

            const newData = prevState.data.map(item => {
                if (item.slug === slug && game.priceCategory === category) { 
                    return { ...item, priceCategory: "" } 
                } else if (item.slug === slug) { 
                    return { ...item, priceCategory: category } 
                } else {
                    return item
                }
            })

            return { data: newData }
        })  
    }

    deleteItem = (slug) => {   
        this.setState(prevState => {
            const newData = prevState.data.filter(item => item.slug !== slug),
                  newTotalCount = newData.length,
                  newPlayCount = newData.filter(item => item.play).length,
                  newWishCount = newData.filter(item => item.wish).length,
                  newProgressCount = Math.round(newPlayCount / newTotalCount * 100) + "%",
                  newProgressBarStyle = {
                      width: newProgressCount,
                      borderRadius: newProgressCount === "100%" ? "4px" : "4px 0 0 4px"
                  }

            return { data: newData, playCount: newPlayCount, progressCount: newProgressCount, wishCount: newWishCount, totalCount: newTotalCount, progressBarStyle: newProgressBarStyle }
        })  
    }

// ––––––––––––––––––––––––––––––––– <App /> functions ––––––––––––––––––––––––––––––––––

    searchGame = (data, searchQuery) => {
        if (searchQuery.length === 0) { return data }
        return data.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    getSearchError = (filteredData) => {
        const { playCount, wishCount, activeFilter } = this.state

        if (filteredData.length === 0) {
            if (activeFilter === "play" && playCount === 0) {
                return (
                    <p className="search-error is-active" role="status">
                    There are no games marked as played yet.<br />
                    To mark a game as played, hover or click on a game card and press a controller button.
                    </p>
                )
            }
            if (activeFilter === "wish" && wishCount === 0) {
                return (
                    <p className="search-error is-active" role="status">
                    There are no games in your collection yet.<br />
                    To add a game to the collection, hover or click on a game card and press a star button.
                    </p>
                )
                }
            return (
                <p className="search-error is-active" role="status">
                    The game you are looking for is not found.<br />
                    You can add a game to the list from the menu in the navigation bar (+ plus sign).
                </p>
            )
        }
        return null
    }

    gamePrices = [
        {title: "Aliens Versus Predator: Extinction", prices: {loose: "25", cib: "35", newg: "225"}},
        {title: "Alone in the Dark", prices: {loose: "5", cib: "10", newg: "34"}},
        {title: "Alone in the Dark: The New Nightmare", prices: {loose: "25", cib: "35", newg: "n/a"}},
        {title: "Area 51", prices: {loose: "15", cib: "25", newg: "260"}},
        {title: "Baroque", prices: {loose: "49", cib: "64", newg: "150"}},
        {title: "Berserk Millennium Empire Arc: Chapter of the Holy Demon War", prices: {loose: "37", cib: "47", newg: "345"}},
        {title: "Blood Omen 2: Legacy of Kain", prices: {loose: "11", cib: "17", newg: "135"}},
        {title: "BloodRayne", prices: {loose: "4", cib: "17", newg: "108"}},
        {title: "BloodRayne 2", prices: {loose: "5", cib: "13", newg: "125"}},
        {title: "Castlevania: Curse of Darkness", prices: {loose: "35", cib: "51", newg: "400"}},
        {title: "Clock Tower 3", prices: {loose: "43", cib: "80", newg: "360"}},
        {title: "Cold Fear", prices: {loose: "35", cib: "58", newg: "160"}},
        {title: "Constantine", prices: {loose: "8", cib: "12", newg: "35"}},
        {title: "Curse: The Eye of Isis", prices: {loose: "6", cib: "27", newg: "106"}},
        {title: "Daemon Summoner", prices: {loose: "4", cib: "6", newg: "25"}},
        {title: "Darkwatch", prices: {loose: "23", cib: "30", newg: "150"}},
        {title: "Devil May Cry 2", prices: {loose: "5", cib: "11", newg: "44"}},
        {title: "Devil May Cry 3: Dante's Awakening - Special Edition", prices: {loose: "6", cib: "8", newg: "49"}},
        {title: "Dino Stalker", prices: {loose: "10", cib: "25", newg: "134"}},
        {title: "Disaster Report", prices: {loose: "40", cib: "50", newg: "n/a"}},
        {title: "Drakengard", prices: {loose: "25", cib: "55", newg: "500"}},
        {title: "Echo Night: Beyond", prices: {loose: "95", cib: "170", newg: "619"}},
        {title: "Evil Dead: A Fistful of Boomstick", prices: {loose: "18", cib: "29", newg: "160"}},
        {title: "Evil Dead: Regeneration", prices: {loose: "30", cib: "38", newg: "250"}},
        {title: "Evil Twin: Cyprien's Chronicles", prices: {loose: "6", cib: "7", newg: "53"}},
        {title: "Extermination", prices: {loose: "5", cib: "8", newg: "85"}},
        {title: "Fatal Frame", prices: {loose: "50", cib: "82", newg: "649"}},
        {title: "Fatal Frame II: Crimson Butterfly", prices: {loose: "50", cib: "96", newg: "308"}},
        {title: "Fatal Frame III: The Tormented", prices: {loose: "65", cib: "80", newg: "333"}},
        {title: "Forbidden Siren 2", prices: {loose: "n/a", cib: "51", newg: "610"}},
        {title: "Galerians: Ash", prices: {loose: "11", cib: "35", newg: "160"}},
        {title: "Gantz: The Game", prices: {loose: "30", cib: "50", newg: "n/a"}},
        {title: "Ghosthunter", prices: {loose: "16", cib: "55", newg: "425"}},
        {title: "Ghost Vibration", prices: {loose: "n/a", cib: "32", newg: "138"}},
        {title: "Gregory Horror Show", prices: {loose: "n/a", cib: "89", newg: "385"}},
        {title: "Haunting Ground", prices: {loose: "n/a", cib: "350", newg: "2000"}},
        {title: "Hungry Ghosts", prices: {loose: "20", cib: "37", newg: "150"}},
        {title: "Jaws Unleashed", prices: {loose: "4", cib: "7", newg: "1000"}},
        {title: "Killer7", prices: {loose: "18", cib: "44", newg: "60"}},
        {title: "King's Field IV", prices: {loose: "42", cib: "75", newg: "450"}},
        {title: "Kuon", prices: {loose: "595", cib: "865", newg: "2500"}},
        {title: "Legacy of Kain: Defiance", prices: {loose: "17", cib: "23", newg: "110"}},
        {title: "Legacy of Kain: Soul Reaver 2", prices: {loose: "10", cib: "15", newg: "135"}},
        {title: "Lifeline", prices: {loose: "35", cib: "50", newg: "199"}},
        {title: "Manhunt", prices: {loose: "10", cib: "25", newg: "350"}},
        {title: "Manhunt 2", prices: {loose: "31", cib: "60", newg: "250"}},
        {title: "Michigan: Report from Hell", prices: {loose: "500", cib: "597", newg: "n/a"}},
        {title: "Mystic Nights", prices: {loose: "9", cib: "22", newg: "n/a"}},
        {title: "ObsCure", prices: {loose: "100", cib: "200", newg: "7000"}},
        {title: "ObsCure: The Aftermath", prices: {loose: "20", cib: "30", newg: "150"}},
        {title: "Onimusha: Warlords", prices: {loose: "6", cib: "10", newg: "999"}},
        {title: "Onimusha 2: Samurai's Destiny", prices: {loose: "7", cib: "14", newg: "55"}},
        {title: "Phase Paradox", prices: {loose: "12", cib: "17", newg: "n/a"}},
        {title: "Raw Danger!", prices: {loose: "17", cib: "22", newg: "52"}},
        {title: "Resident Evil Code: Veronica X", prices: {loose: "5", cib: "12", newg: "360"}},
        {title: "Resident Evil: Dead Aim", prices: {loose: "24", cib: "40", newg: "315"}},
        {title: "Resident Evil Outbreak", prices: {loose: "10", cib: "16", newg: "300"}},
        {title: "Resident Evil Outbreak File #2", prices: {loose: "40", cib: "44", newg: "300"}},
        {title: "Resident Evil Survivor 2 Code: Veronica", prices: {loose: "35", cib: "80", newg: "n/a"}},
        {title: "Resident Evil 4", prices: {loose: "6", cib: "15", newg: "140"}},
        {title: "Resident Evil 4: Premium Edition", prices: {loose: "50", cib: "60", newg: "700"}},
        {title: "Return to Castle Wolfenstein", prices: {loose: "4", cib: "12", newg: "119"}},
        {title: "Rule of Rose", prices: {loose: "550", cib: "700", newg: "1723"}},
        {title: "Run Like Hell: Hunt or Be Hunted", prices: {loose: "5", cib: "12", newg: "40"}},
        {title: "Silent Hill 2", prices: {loose: "85", cib: "120", newg: "850"}},
        {title: "Silent Hill 2: Restless Dreams", prices: {loose: "44", cib: "56", newg: "373"}},
        {title: "Silent Hill 2: Special 2 Disc Set", prices: {loose: "86", cib: "129", newg: "n/a"}},
        {title: "Silent Hill 3", prices: {loose: "105", cib: "150", newg: "999"}},
        {title: "Silent Hill 4: The Room", prices: {loose: "70", cib: "100", newg: "330"}},
        {title: "Silent Hill: Origins", prices: {loose: "80", cib: "100", newg: "350"}},
        {title: "Silent Hill: Shattered Memories", prices: {loose: "200", cib: "300", newg: "999"}},
        {title: "Shadow Man: 2econd Coming", prices: {loose: "7", cib: "12", newg: "40"}},
        {title: "Shadow Tower: Abyss", prices: {loose: "52", cib: "68", newg: "234"}},
        {title: "Simple 2000 Series Vol. 113: The Tairyou Jigoku", prices: {loose: "35", cib: "47", newg: "n/a"}},
        {title: "Siren", prices: {loose: "19", cib: "40", newg: "315"}},
        {title: "The Fear", prices: {loose: "39", cib: "46", newg: "122"}},
        {title: "The Haunted Mansion", prices: {loose: "10", cib: "13", newg: "n/a"}},
        {title: "The Silent Hill Collection", prices: {loose: "80", cib: "152", newg: "1830"}},
        {title: "The Suffering", prices: {loose: "23", cib: "42", newg: "405"}},
        {title: "The Suffering: Ties That Bind", prices: {loose: "20", cib: "45", newg: "630"}},
        {title: "The Thing", prices: {loose: "18", cib: "30", newg: "405"}},
        {title: "The X-Files: Resist or Serve", prices: {loose: "40", cib: "61", newg: "599"}},
        {title: "Trapt", prices: {loose: "25", cib: "60", newg: "250"}},
        {title: "Turok: Evolution", prices: {loose: "5", cib: "10", newg: "250"}},
        {title: "Van Helsing", prices: {loose: "5", cib: "10", newg: "125"}},
        {title: "Vampire Night", prices: {loose: "16", cib: "23", newg: "249"}},
        {title: "Zombie Hunters", prices: {loose: "48", cib: "53", newg: "80"}},
        {title: "Zombie Hunters 2", prices: {loose: "n/a", cib: "100", newg: "135"}},
    ]

    filterGame = (game) => {
        let rating = "N/A",
            ageRatings = []

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
            game.age_ratings.forEach(item => {
                ageRatings.push(item.rating)
            })
        }

        delete game.total_rating
        delete game.rating
        delete game.aggregated_rating
        delete game.age_ratings
        
        let gamePrice = this.gamePrices.find(item => item.title === game.name)
        if (gamePrice === undefined) gamePrice = {prices: { loose: "n/a", cib: "n/a", newg: "n/a" }}

        let src = ""
        game.cover !== undefined 
            ? src = "https://images.igdb.com/igdb/image/upload/t_cover_big/" + game.cover.image_id + ".jpg" 
            : src = noCover
        const filters = { wish: false, play: false },
              gameData = { ...game, rating: rating, ageRatings: ageRatings, title: game.name, src: src, ...gamePrice.prices, priceCategory: "" }

        delete gameData.name
        delete gameData.cover

        return Object.assign(filters, gameData)
    }

	iGDB = new IGDB()

    handleWelcomeClick = async () => {
        try {
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
            const initialData = allGames.find(item => item.slug === "silent-hill-2")

            this.setState({ data: allGames, apiDataLoaded: true, infoData: initialData })
            this.props.onStateChange("transitionStart")

            const setTimeoutPromise = () => new Promise(() => {
                setTimeout(() => {
                    this.toggleFilter("all")
                    this.props.onStateChange("apiLoaded")
                }, 2500)
            })
            await setTimeoutPromise()
        } catch (error) {
            this.props.onError()
            console.error("Error fetching data from the API:", error)
        }
    }  

    componentDidUpdate() {
        if (this.props.welcomeClick && !this.state.apiDataLoaded) {
            this.handleWelcomeClick()
        }
    }

// –––––––––––––––––––––––––––––––– <AddGame /> functions ––––––––––––––––––––––––––––––––––
    
    handleTitleChange = (e) => { this.setState({ addedTitle: e.target.value }) }

    resetAddFormClass = (str, error) => {
        setTimeout(() => {
            this.setState({ addFormClass: `add-message ${str} invisible` })
            this.resetAddFormMessage(error)
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
                  error = "Enter a game title. Title should be at least 3 characters.",
                  errorAPI = `No PS2 games found with the title '${title}'. Check the spelling or try another title.`
                  
            if (games.length < 1 && title.length >= 3) {
                this.setState({ searchData: [], searchDataLoaded: false, addedTitle: "", addFormMessage: errorAPI, addFormClass: "add-message" })
                this.resetAddFormClass("", errorAPI)
            } else if (title !== "" && title.length >= 3) {
                this.setState({ searchData: games, searchDataLoaded: true, addedTitle: "" })
            } else {
                this.setState({ addFormMessage: error, addFormClass: "add-message" })
                this.resetAddFormClass("", error)
            }
        } catch (error) {
            this.setState({ searchData: [], searchDataLoaded: false, addedTitle: "", addFormMessage: error, addFormClass: "add-message" })
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
                console.log("radioValue is empty")
                this.setState({ addFormMessage: radioError, addFormClass: "add-message" })
                this.resetAddFormClass("", error)
                return
            }

            const body = `fields genres.name, name, total_rating, rating, aggregated_rating, age_ratings.rating, cover.image_id, first_release_date, involved_companies.developer, involved_companies.company.name, screenshots.image_id, slug, summary, websites.category, websites.url; where id = ${radioValue};`,
                  get = await this.iGDB.getToken(),
                  game = await this.iGDB.getGames(get.access_token, body),
                  gameFiltered = this.filterGame(game[0]),
                  titleError = "This game already exists in your library. Please select a unique game.",
                  success = "New game successfully added. You can now manage your collection."

            const duplicate = this.state.data.some(item => item.title.toLowerCase() === gameFiltered.title.toLowerCase())

            console.log(game)
            console.log(gameFiltered)
            console.log("radio = " + radioValue)
            console.log("duplicate = " + duplicate)
            
            if (duplicate) {
                console.log("duplicate")
                this.setState({ addFormMessage: titleError, addFormClass: "add-message" })
                this.resetAddFormClass("", error)
            } else {
                console.log("radioValue is not empty && not duplicate")
                this.setState(prevState => {
                    const newData = [gameFiltered, ...prevState.data],
                          newTotalCount = newData.length,
                          newProgressCount = Math.round(this.state.playCount / newTotalCount * 100) + "%",
                          newProgressBarStyle = {width: newProgressCount, borderRadius: newProgressCount === "100%" ? "4px" : "4px 0 0 4px"}

                    return { data: newData, 
                             progressCount: newProgressCount, 
                             totalCount: newTotalCount, 
                             addFormMessage: success, 
                             addFormClass: "add-message success", 
                             addedTitle: "",
                             progressBarStyle: newProgressBarStyle,
                             searchData: [],
                             searchDataLoaded: false, 
                             searchRadioValue: "" }
                })  
                this.resetAddFormClass("success", error)
            }
        } catch (error) {
            this.setState({ addFormMessage: error, addFormClass: "add-message" })
            this.resetAddFormClass("", error)
            console.error("Error fetching data from the API:", error)
        }
    } 

    addLandscapeOverflow = () => document.body.classList.add('body--overflow')
    removeLandscapeOverflow = () => document.body.classList.remove('body--overflow')
    
// –––––––––––––––––––––––––––––––––—— END functions ––––––––––––––––––––––––––––––––––——

    render() {
        const { data,
                infoData, 
                openedInfo,
                searchQuery,
                addedTitle, 
                playCount, 
                progressPlayCount,
                progressbarPlayStyle,
                wishCount, 
                progressWishCount,
                progressbarWishStyle,
                addFormClass,
                addFormMessage,
                addGameIsActive,
                aboutIsActive,
                delSrc,
                activeFilter,
                searchData,
                searchDataLoaded,
                apiDataLoaded } = this.state

        const renderData = this.searchGame(data, searchQuery)
        const filteredData = renderData.filter(item => {
            if (activeFilter === "play" && !item.play) {
                return false
            } else if (activeFilter === "wish" && !item.wish) {
                return false
            }
            return true
        })
        const searchError = this.getSearchError(filteredData)

        let appClass = "app"
        if (this.props.transitionStart)  appClass += " has-faded-in"
        if (!apiDataLoaded || (aboutIsActive || addGameIsActive)) this.addLandscapeOverflow()
        if (apiDataLoaded && (!aboutIsActive && !addGameIsActive)) this.removeLandscapeOverflow()

        return (
            <div className={appClass}>  
                <Info 
                    infoData={infoData} 
                    openedInfo={openedInfo}
                    onInfoClose={this.closeInfo} 
                />
                <SearchPanel  
                    data={data} 
                    filteredData={filteredData} 
                    playCount={playCount}
                    progressPlayCount={progressPlayCount}
                    progressbarPlayStyle={progressbarPlayStyle}
                    wishCount={wishCount}
                    progressWishCount={progressWishCount}
                    progressbarWishStyle={progressbarWishStyle}
                    addGameIsActive={addGameIsActive}
                    aboutIsActive={aboutIsActive}
                    activeFilter={activeFilter}
                    onSearchUpdate={this.updateSearch} 
                    onFilterChange={this.toggleFilter}
                    onAsideChange={this.updateAside}
                />
                <About 
                    aboutIsActive={aboutIsActive}
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
                />
                <main id="main"> 
                    {searchError}  
                    <GameList 
                        filteredData={filteredData} 
                        delSrc={delSrc}
                        onDelete={this.deleteItem} 
                        onMarkState={this.markState} 
                        onOpenInfo={this.openInfo} 
                        onPriceCategoryChange={this.handlePriceCategoryChange}
                    />
                </main>
            </div>
        )
    }
}

export default App
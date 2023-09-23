import { Component } from "react"
import AddGame from "./add-game"
import Info from "./info"
import SearchPanel from "./search-panel"
import List from "./list"
import del from "../assets/img/del.png"
import "../assets/styles/app.css"
import IGDB from "../services/IGDB"

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeFilter: "all",
            addFormClass: "add-message invisible",
            addFormMessage: "Enter rating and game title. Title should be at least 4 characters.",
            addGameIsActive: false,
            addedRating: "",
            addedTitle: "",
            apiDataLoaded: false,
            data: [],
            infoData: {
                wish: false,
                play: false,
                genres: [],
                involved_companies: [],
                screenshots: [],
                summary: "",
                websites: [],
                ageRatings: [],
                rating: "",
                title: "",
                src: ""
            },
            delSrc: del,
            playCount: 0,
            progressBarStyle: {
                width: "0%",
                borderRadius: "4px 0 0 4px"
            },
            progressCount: "0%",
            searchQuery: "",
            totalCount: 54,
            wishCount: 0,
        }
    }

// –––––––––––––––––––––––––––––––– <AddGame /> functions ––––––––––––––––––––––––––––––––––
    
    handleRatingChange = (e) => {
        if (e.target.value < 0 || e.target.value === "") { 
            this.setState({ addedRating: 0 })
        } else if (e.target.value > 100) { 
            this.setState({ addedRating: 100 })
        } else { 
            this.setState({ addedRating: parseInt(e.target.value.replace(/\D/,"")) }) 
        }
    }

    handleTitleChange = (e) => { this.setState({ addedTitle: e.target.value }) }

    decRating = (e) => {
        e.preventDefault()
        if (this.state.addedRating <= 0 || this.state.addedRating === "") {
            this.setState({ addedRating: 0 })
        } else if (this.state.addedRating > 100) {
            this.setState({ addedRating: 100 })
        } else {
            this.setState({ addedRating: this.state.addedRating - 1 })
        }
    }

    incRating = (e) => {
        e.preventDefault()
        if (this.state.addedRating >= 100) {
            this.setState({ addedRating: 100 })
        } else if (this.state.addedRating === "") {
            this.setState({ addedRating: 1 })
        } else {
            this.setState({ addedRating: this.state.addedRating + 1 })
        }
    }

    addItem = (e) => {
        e.preventDefault()
        const rating = this.state.addedRating,
              title = this.state.addedTitle,
              source = "user-added",
              wish = false,
              play = false,
              error = "Enter rating and game title. Title should be at least 4 characters.",
              titleError = "This game title already exists. Please select a unique title.",
              success = "New game successfully added. Manage your gaming progress."

        const newItem = {wish, play, rating, title, source}

        const titleValidated = this.state.data.some(item => item.title.toLowerCase() === title.toLowerCase())

        if (titleValidated) {
            this.setState({ addFormMessage: titleError, addFormClass: "add-message" })
            this.resetAddFormClass("", error)
        } else if (rating !== "" && title !== "" && title.length >= 4 && !titleValidated) {
            this.setState(prevState => {
                const newData = [newItem, ...prevState.data],
                      newTotalCount = newData.length,
                      newProgressCount = Math.round(this.state.playCount / newTotalCount * 100) + "%",
                      newProgressBarStyle = {
                          width: newProgressCount,
                          borderRadius: newProgressCount === "100%" ? "4px" : "4px 0 0 4px"
                      }

                return { data: newData, 
                         progressCount: newProgressCount, 
                         totalCount: newTotalCount, 
                         addFormMessage: success, 
                         addFormClass: "add-message success", 
                         addedRating: "", 
                         addedTitle: "",
                         progressBarStyle: newProgressBarStyle }
            })  
            this.resetAddFormClass("success", error)
        } else {
            this.setState({ addFormMessage: error, addFormClass: "add-message" })
            this.resetAddFormClass("", error)
        }
    }

    resetAddFormClass = (str, error) => {
        setTimeout(() => {
            this.setState({ addFormClass: `add-message ${str} invisible`, addFormMessage: error })
        }, 8000)
    }

    updateAddGame = (addGameIsActive) => { this.setState({addGameIsActive}) }

// ––––––––––––––––––––––––––––– <SearchPanel /> functions ––––––––––––––––––––––––––––––

    updateSearch = (searchQuery) => { this.setState({searchQuery}) }

    toggleFilter = (filterType) => { this.setState({ activeFilter: filterType }) }

// ––––––––––––––––––––––––––––––––– <List /> functions –––––––––––––––––––––––––––––––––

    markState = (slug, state) => {
        this.setState(prevState => {
            const newData = prevState.data.map(item => {
                if (item.slug === slug) { return { ...item, [state]: !item[state] } }
                return item
            })
    
            let newPlayCount = prevState.playCount,
                newWishCount = prevState.wishCount

            if (state === "play") {
                newPlayCount = newData.filter(item => item.play).length
            } else {
                newWishCount = newData.filter(item => item.wish).length
            }

            const newProgressCount = Math.round(newPlayCount / this.state.totalCount * 100) + "%",
                  newProgressBarStyle = {
                      width: newProgressCount,
                      borderRadius: newProgressCount === "100%" ? "4px" : "4px 0 0 4px"
                  }
           
            return { data: newData, playCount: newPlayCount, progressCount: newProgressCount, wishCount: newWishCount, progressBarStyle: newProgressBarStyle }
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
                    <p className="search-error --active" role="status">
                    There are no games marked as played yet.<br />
                    To mark a game as played, hover on a game card and press a controller button.
                    </p>
                )
            }
            if (activeFilter === "wish" && wishCount === 0) {
                return (
                    <p className="search-error --active" role="status">
                    There are no games in your wishlist yet.<br />
                    To add a game to the wishlist, hover on a game card and press a star button.
                    </p>
                )
                }
            return (
                <p className="search-error --active" role="status">
                    The game you are looking for is not found.<br />
                    You can add a game to the list from the menu in the top left corner.
                </p>
            )
        }
        return null
    }

	iGDB = new IGDB()
    handleWelcomeClick = async () => {
        try {
            const ratedGames = [],
                  notRatedGames = [],
                  get = await this.iGDB.getToken(),
                  games = await this.iGDB.getGames(get.access_token)

            games.forEach(game => {
                let rating = "N/A"

                if (game.total_rating) {
                    rating = Math.round(game.total_rating)
                } else if (game.rating) {
                    rating = Math.round(game.rating)
                } else if (game.aggregated_rating) {
                    rating = Math.round(game.aggregated_rating)
                }

                delete game.total_rating
                delete game.rating
                delete game.aggregated_rating

                const src = "https://images.igdb.com/igdb/image/upload/t_cover_big/" + game.cover.image_id + ".jpg",
                      filters = { wish: false, play: false },
                      gameData = { ...game, rating: rating, title: game.name, src: src }

                delete gameData.name
                delete gameData.cover

                const gameFiltered = Object.assign(filters, gameData)
                if (gameFiltered.rating === "N/A") {
                    notRatedGames.push(gameFiltered)
                } else {
                    ratedGames.push(gameFiltered)
                }
            })
            const allGames = [...ratedGames, ...notRatedGames]
            this.setState({ data: allGames, apiDataLoaded: true })
            this.props.onStateChange("transitionStart")
            const setTimeoutPromise = () => new Promise(() => {
                setTimeout(() => {
                    this.toggleFilter("all")
                    this.props.onStateChange("apiLoaded")
                }, 2500)
            })
            await setTimeoutPromise()
        } catch (error) {
          console.error("Error fetching data from the API:", error)
        }
    }  

    componentDidUpdate() {
        if (this.props.welcomeClick && !this.state.apiDataLoaded) {
            this.handleWelcomeClick()
        }
    }

    handleInfoToggle = (slug) => {
        this.setState(prevState => {
            const newData = prevState.data.find(item => item.slug === slug)
            return { infoData: newData }
        })  
    } 
    
// –––––––––––––––––––––––––––––––––—— END functions ––––––––––––––––––––––––––––––––––——

    render() {
        const { data,
                infoData, 
                searchQuery,
                addedRating, 
                addedTitle, 
                playCount, 
                wishCount, 
                progressCount, 
                addFormClass,
                addFormMessage,
                addGameIsActive,
                delSrc,
                activeFilter,
                progressBarStyle } = this.state

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
        if (this.props.transitionStart) {
            appClass += " --active"
        }

        return (
            <div className={appClass}>  
                <Info 
                    infoData={infoData} 
                    playCount={playCount}
                    progressCount={progressCount}
                    progressBarStyle={progressBarStyle}
                />
                <SearchPanel  
                    data={data} 
                    filteredData={filteredData} 
                    playCount={playCount}
                    wishCount={wishCount}
                    progressCount={progressCount}
                    progressBarStyle={progressBarStyle}
                    addGameIsActive={addGameIsActive}
                    activeFilter={activeFilter}
                    onAddGameUpdate={this.updateAddGame} 
                    onSearchUpdate={this.updateSearch} 
                    onFilterChange={this.toggleFilter}
                />
                <AddGame 
                    addedRating={addedRating} 
                    addedTitle={addedTitle} 
                    addFormClass={addFormClass}
                    addFormMessage={addFormMessage}
                    addGameIsActive={addGameIsActive}
                    onRatingChange={this.handleRatingChange} 
                    onTitleChange={this.handleTitleChange} 
                    onRatingDecr={this.decRating} 
                    onRatingIncr={this.incRating} 
                    onAdd={this.addItem} 
                />
                <main className="list-wrapper" id="main"> 
                    {searchError}  
                    <List 
                        filteredData={filteredData} 
                        delSrc={delSrc}
                        onDelete={this.deleteItem} 
                        onMarkState={this.markState} 
                        onInfoToggle={this.handleInfoToggle} 
                    />
                </main>
            </div>
        )
    }
}

export default App
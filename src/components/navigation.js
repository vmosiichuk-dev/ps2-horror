import { Component } from "react"
import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import ps from "../assets/img/ps-logo.svg"
import search from "../assets/img/search.png"
import del from "../assets/img/del.png"
import menuImg from "../assets/img/plus.svg"
import looseIcon from "../assets/img/loose.png"
import cibIcon from "../assets/img/cib.png"
import newgIcon from "../assets/img/newg.png"
import "../assets/styles/navigation.css"

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchQuery: "",
            searchIconSrc: search
        }
    }

    onSearchUpdate = (e) => {
        const searchQuery = e.target.value
        this.setState({searchQuery})
        this.props.onSearchUpdate(searchQuery)
    }

    onSearchFocus = () => {
        this.setState({ searchIconSrc: del })
    }

    onSearchBlur = () => {
        if (this.state.searchQuery.trim().length === 0) {
            this.setState({ searchIconSrc: search })
        }
    }

    onDeleteClick = () => {
        if (this.state.searchIconSrc === del) {
            this.setState({ searchQuery: "", searchIconSrc: search })
            this.props.onSearchUpdate("")
        }
    }

    getCollectionValue = (data) => {
        const dataLoose = data.filter(item => item.priceCategory === "loose"),
              dataCib = data.filter(item => item.priceCategory === "cib"),
              dataNewg = data.filter(item => item.priceCategory === "newg")

        console.log(dataLoose)
        console.log(dataCib)
        console.log(dataNewg)

        let looseSum = 0, 
            cibSum = 0, 
            newgSum = 0

        dataLoose.forEach(item => { console.log(Number.isInteger(item.loose)); if (Number.isInteger(item.loose)) looseSum += item.loose })
        dataCib.forEach(item => { console.log(Number.isInteger(item.cib)); if (Number.isInteger(item.cib)) cibSum += item.cib })
        dataNewg.forEach(item => { console.log(Number.isInteger(item.newg)); if (Number.isInteger(item.newg)) newgSum += item.newg })

        return {
            loose: looseSum,
            cib: cibSum,
            newg: newgSum
        }
    }

    renderProgress = (activeFilter, data, count, progressCount, progressbarStyle, label) => {
        if (activeFilter === "wish") {
            const value = this.getCollectionValue(data)
            console.log(value)
            return (
                <section className="nav__progress nav__progress--value" aria-label="Gaming progress information">
                    <div className="game-price game-price--value">
                        <button type="button" className="btn btn--price btn--loose btn--value">
                            <img className="game__icon game__icon--loose game__icon--value" src={looseIcon} alt="Loose price" />
                            <div>
                                <span className="usd usd--value">$</span>
                                <span>{value.loose}</span>
                            </div>
                        </button>
                        <button type="button" className="btn btn--price btn--cib btn--value">
                            <img className="game__icon game__icon--cib game__icon--value" src={cibIcon} alt="CIB price" />
                            <div>
                                <span className="usd usd--value">$</span>
                                <span>{value.cib}</span>
                            </div>
                        </button>
                        <button type="button" className="btn btn--price btn--newg btn--value">
                            <img className="game__icon game__icon--newg game__icon--value" src={newgIcon} alt="New price" />
                            <div>
                                <span className="usd usd--value">$</span>
                                <span>{value.newg}</span>
                            </div>
                        </button>
                        <div className="nav__total">
                            <p className="nav__total-label">Total: </p>
                            <span className="usd usd--total">$</span>
                            <span>{value.loose + value.cib + value.newg}</span>
                        </div>
                    </div>
                    {/* <p className="nav__progress-count">Loose: <span>{value.loose}</span></p>
                    <p className="nav__progress-count">CIB: <span>{value.cib}</span></p>
                    <p className="nav__progress-count">New: <span>{value.newg}</span></p>
                    <p className="nav__progress-count">Total: <span>{value.loose + value.cib + value.newg}</span></p> */}
                </section>
            )
        }
        return (
            <section className="nav__progress" aria-label="Gaming progress information">
                <p className="nav__progress-count"><span className="a11y">{"Games in " + label.toLowerCase() + ":"}</span><span>{count}</span> / <span className="a11y">Total games:</span><span>{data.length}</span></p>
                <div className="nav__progress-bar">
                    <p className={"progress-bar__label progress-bar__label--" + label.toLowerCase()}>{label + " progress"}</p>
                    <div className="progress-bar" style={progressbarStyle}></div>
                </div>
                <span className="a11y">Percentage progress count:</span>
                <span className="nav__progress-percent">{progressCount}</span>
            </section>
        )
    }

    render() {
        const { searchQuery, searchIconSrc } = this.state
        const { data, activeFilter, onFilterChange, onAsideChange, addGameIsActive, aboutIsActive, playCount, progressPlayCount, progressbarPlayStyle, wishCount, progressWishCount, progressbarWishStyle } = this.props

        const navControls = (mediaClass) => {
            return (
                <div className={"nav__controls-" + mediaClass}>
                    <button type="button" className={aboutBtnClass} onClick={() => onAsideChange("aboutIsActive")} tabIndex={0}>
                        <span className="btn-about__span btn-about__span--one"></span>
                        <span className="btn-about__span btn-about__span--two"></span>
                    </button>
                    <button type="button" className={addGameBtnClass} onClick={() => onAsideChange("addGameIsActive")} tabIndex={0}>
                        <img className={addGameImgClass} src={menuImg} alt={addGameMenuAlt}/>
                    </button>
                </div>
            )
        }

        let searchAlt = "Search",
            searchAria = true,
            searchLabel = "Search",
            addGameMenuAlt = "Open add game form",
            addGameImgClass = "btn__img",
            addGameBtnClass = "btn btn--menu",
            aboutBtnClass = "btn btn--about",
            tabIndex = 0,
            count = wishCount, 
            progressCount = progressWishCount, 
            progressbarStyle = progressbarWishStyle,
            label = "Collection"

        if (addGameIsActive) { 
            addGameMenuAlt = "Close add game form"
            addGameImgClass += " is-active" 
            addGameBtnClass += " is-active" 
            aboutBtnClass += " is-inactive" 
            tabIndex = -1
        }
        if (aboutIsActive) {
            aboutBtnClass += " is-active"  
            addGameBtnClass += " is-inactive" 
            tabIndex = -1           
        }
        if (searchIconSrc === del) { 
            searchAlt = "Clear search input"
            searchAria = false
            searchLabel = "Clear" 
        }
        if (activeFilter === "play") {
            count = playCount
            progressCount = progressPlayCount
            progressbarStyle = progressbarPlayStyle
            label = "Played"
        }

        return (
            <nav className="nav">
                <div className="nav__title-wrapper">
                    <img src={ps} width="30px" alt=""/>
                    <h1 className="nav__title"><span className="a11y">PS2 Game Library — </span>Survival Horror Classics</h1>
                    {navControls("mobile")}
                </div>
                {this.renderProgress(activeFilter, data, count, progressCount, progressbarStyle, label)}
                <section className="nav__filters" aria-label="Filter controls" aria-describedby="nav__filters-description">
                    <span id="nav__filters-description" className="a11y">Use filters to show games previously marked as played or the ones added to your collection. Combine filters and search to look for games under specific filter option.</span> 
                    {navControls("desktop")}
                    <button className={`btn btn--filter ${activeFilter === "all" ? "is-active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("all")}>All games</button>
                    <button className={`btn btn--filter btn--played ${activeFilter === "play" ? "is-active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("play")}><img className="nav__filter-icon" src={game} alt="" />Played</button>
                    <button className={`btn btn--filter ${activeFilter === "wish" ? "is-active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("wish")}><img className="nav__filter-icon" src={star} alt="" />Collected</button>
                </section>
                <section className="nav__search" aria-label="Search input" aria-describedby="nav__search-description">
                    <span id="nav__search-description" className="a11y">Filter games that have a matching character string in the title with the character string provided by the user in the input field. When input has focus, it's associated button can be used to clear the input.</span>
                    <input className="nav__search-input" type="text" placeholder="Enter game title" id="nav__search-input" value={searchQuery} tabIndex={tabIndex} onChange={this.onSearchUpdate} onFocus={this.onSearchFocus} onBlur={this.onSearchBlur} />
                    <button className="nav__search-btn" type="button" aria-hidden={searchAria} tabIndex={tabIndex} onClick={this.onDeleteClick}>
                        <label htmlFor="nav__search-input" className="nav__search-label">{searchLabel}</label>
                        <img className="nav__search-icon" alt={searchAlt} src={searchIconSrc} />
                    </button>
                </section>
            </nav>
        )
    }
}

export default Navigation
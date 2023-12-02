import { Component } from "react"
import GamePrice from "./game-price"
import "../assets/styles/navigation.css"

import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import ps from "../assets/img/ps-logo.svg"
import search from "../assets/img/search.png"
import del from "../assets/img/del.png"
import menuImg from "../assets/img/plus.svg"

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            logoRotated: false,
            searchQuery: "",
            searchIconSrc: search
        }
    }
    
    rotateLogo = () => {
        const {logoRotated} = this.state
        this.setState({logoRotated: !logoRotated})
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

    onDeleteClick = (e) => {
        if (this.state.searchIconSrc === del) {
            this.setState({ searchQuery: "", searchIconSrc: search })
            this.props.onSearchUpdate("")
        }
    }

    renderNavControls = (mediaClass, onAsideChange, aboutBtnClass, addGameBtnClass, addGameImgClass, aboutBtnTitle, addGameMenuAlt ) => {
        return (
            <section className={"nav__controls-" + mediaClass} aria-label="Sidebar controls">
                <button 
                    type="button" 
                    className={aboutBtnClass} 
                    onClick={() => onAsideChange("aboutIsActive")} 
                    tabIndex={0}
                    ref={this.props.aboutBtnRef}
                    title={aboutBtnTitle} >
                    <span className="nav__about-span nav__about-span--one"></span>
                    <span className="nav__about-span nav__about-span--two"></span>
                </button>
                <button 
                    type="button" 
                    className={addGameBtnClass} 
                    onClick={() => onAsideChange("addGameIsActive")} 
                    tabIndex={0}
                    ref={this.props.addBtnRef}>
                    <img className={addGameImgClass} src={menuImg} alt={addGameMenuAlt}/>
                </button>
            </section>
        )
    }

    render() {
        const { logoRotated, searchQuery, searchIconSrc } = this.state
        const { data, 
            activeFilter, 
            onFilterChange, 
            onAsideChange, 
            addGameIsActive, 
            aboutIsActive, 
            playCount, 
            progressPlayCount, 
            progressbarPlayStyle, 
            collCount, 
            progressCollCount, 
            progressbarCollStyle 
        } = this.props

        let tabIndex = 0,
            count = collCount, 
            progressCount = progressCollCount, 
            progressbarStyle = progressbarCollStyle,
            label = "Collection",
            searchAlt = "Search",
            searchAria = true,
            searchLabel = "Search",
            aboutBtnTitle = "Open about section",
            addGameMenuAlt = "Open add game form",
            addGameImgClass = "btn__img",
            addGameBtnClass = "btn nav__menu-btn",
            aboutBtnClass = "btn nav__about-btn",
            btnFilterAllClass = "btn nav__filter-btn nav__filter-btn--all",
            btnFilterCollClass = "btn nav__filter-btn",
            btnFilterWishClass = "btn nav__filter-btn",
            btnFilterPlayedClass = "btn nav__filter-btn",
            navProgressClass = "nav__progress",
            navProgressAlt = "",
            searchLabelClass = "nav__search-label",
            logoClass = "nav__logo",
            navClass = "nav"

        if (logoRotated) logoClass += " has-rotated"

        if (addGameIsActive) { 
            addGameMenuAlt = "Close add game form"
            addGameImgClass += " is-active" 
            addGameBtnClass += " is-active" 
            aboutBtnClass += " is-inactive" 
            tabIndex = -1
        }
        
        if (aboutIsActive) {
            aboutBtnTitle = "Close about section"
            aboutBtnClass += " is-active"  
            addGameBtnClass += " is-inactive" 
            tabIndex = -1 
        }

        if (!addGameIsActive && !aboutIsActive) navClass += " nav--sticky"

        if (searchIconSrc === del) { 
            searchAlt = "Clear search input"
            searchAria = false
            searchLabel = "Clear" 
            searchLabelClass += " nav__search-label--z"
        }

        switch (activeFilter) {
            case "play": {
                count = playCount
                progressCount = progressPlayCount
                progressbarStyle = progressbarPlayStyle
                label = "Played"
                btnFilterPlayedClass += " is-active"
                navProgressAlt = "Played progress"
                break
            }
            case "wish": {
                btnFilterWishClass += " is-active"
                navProgressClass += " nav__progress--value"
                navProgressAlt = "Wishlist value"
                break
            }
            case "all": {
                btnFilterAllClass += " is-active"
                navProgressAlt = "Collection progress"
                break
            }
            case "coll": {
                btnFilterCollClass += " is-active"
                navProgressClass += " nav__progress--value"
                navProgressAlt = "Collection value"
                break
            }
            default: break
        }

        return (
            <nav className={navClass}>
                <div className="nav__title-wrapper">
                    <img className={logoClass} src={ps} width="30px" alt="" onClick={this.rotateLogo}/>
                    <h1 className="nav__title">
                        <span className="a11y">PS2 Collection App — </span>
                        Survival Horror Classics
                    </h1>
                    {this.renderNavControls(
                        "mobile", 
                        onAsideChange, 
                        aboutBtnClass, 
                        addGameBtnClass, 
                        addGameImgClass, 
                        aboutBtnTitle,
                        addGameMenuAlt
                    )}
                </div>
                <section 
                    className="nav__filters" 
                    role="toolbar"
                    aria-label="Filter and sidebar controls" 
                    aria-describedby="nav__filters-description">
                    {this.renderNavControls(
                        "desktop", 
                        onAsideChange, 
                        aboutBtnClass, 
                        addGameBtnClass, 
                        addGameImgClass, 
                        aboutBtnTitle,
                        addGameMenuAlt
                    )}
                    <p id="nav__filters-description" className="a11y">Use filters to show all games, games previously marked as played, the ones added to your collection or wishlist. Combine filters and search for games under specific filter option.</p> 
                    <button 
                        type="button" 
                        tabIndex={tabIndex} 
                        className={btnFilterAllClass} 
                        onClick={() => onFilterChange("all")}>
                        All
                    </button>
                    <button 
                        type="button" 
                        tabIndex={tabIndex} 
                        className={btnFilterPlayedClass} 
                        onClick={() => onFilterChange("play")}>
                        <img className="nav__filter-icon" src={game} alt="" />
                        Played
                    </button>
                    <button 
                        type="button" 
                        tabIndex={tabIndex} 
                        className={btnFilterWishClass} 
                        onClick={() => onFilterChange("wish")}>
                        <img className="nav__filter-icon" src={star} alt="" />
                        Wishlist
                    </button>
                    <button 
                        type="button" 
                        tabIndex={tabIndex} 
                        className={btnFilterCollClass} 
                        onClick={() => onFilterChange("coll")}>
                        Collection
                    </button>
                </section>
                <section className={navProgressClass} role="status" aria-label={navProgressAlt}>
                    { (activeFilter === "coll" || activeFilter === "wish") 
                        ? <GamePrice data={data} nav={true} activeFilter={activeFilter} /> 
                        : (
                        <>
                            <p className="nav__progress-count">
                                <span className="a11y">
                                    {"Games in " + label.toLowerCase() + ": "}
                                </span>
                                <span>{count}</span>
                                <span>&nbsp;/&nbsp;</span>
                                <span className="a11y">Total games: </span>
                                <span>{data.length}</span>
                            </p>
                            <div className="nav__progress-bar">
                                <p className={"progress-bar__label progress-bar__label--" + label.toLowerCase()}>
                                    {label + " progress"}
                                </p>
                                <div className="progress-bar" style={progressbarStyle}></div>
                            </div>
                            <span className="a11y">Percentage progress count:</span>
                            <span className="nav__progress-percent">{progressCount}</span>
                        </>
                    )}
                </section>
                <section 
                    className="nav__search" 
                    aria-label="Search input" 
                    aria-describedby="nav__search-description">
                    <span id="nav__search-description" className="a11y">Filter games that have a matching character string in the title with the character string provided by the user in the input field. When input has focus, it's associated button can be used to clear the input.</span>
                    <input 
                        type="text" 
                        tabIndex={tabIndex} 
                        value={searchQuery} 
                        id="nav__search-input" 
                        className="nav__search-input" 
                        placeholder="Enter game title" 
                        onChange={this.onSearchUpdate} 
                        onFocus={this.onSearchFocus} 
                        onBlur={this.onSearchBlur} 
                    />
                    <button 
                        type="button" 
                        tabIndex={tabIndex} 
                        aria-hidden={searchAria} 
                        className="nav__search-btn" 
                        onClick={this.onDeleteClick}>
                        <label htmlFor="nav__search-input" className={searchLabelClass}>{searchLabel}</label>
                        <img className="nav__search-icon" alt={searchAlt} src={searchIconSrc} />
                    </button>
                </section>
            </nav>
        )
    }
}

export default Navigation
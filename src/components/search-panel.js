import { Component } from "react"
import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import ps from "../assets/img/ps-logo.svg"
import search from "../assets/img/search.png"
import del from "../assets/img/del.png"
import menuImg from "../assets/img/plus.svg"
import "../assets/styles/search-panel.css"

class SearchPanel extends Component {
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

    renderProgress = (data, count, progressCount, progressbarStyle, label) => {
        return (
            <section className="mobile-progress" aria-label="Gaming progress information">
                <p><span className="_a11y">{"Games in " + label.toLowerCase() + ":"}</span><span>{count}</span> / <span className="_a11y">Total games:</span><span>{data.length}</span></p>
                <div className="progress-bar--container">
                    <p className={"progress-bar-label --" + label.toLowerCase()}>{label + " progress"}</p>
                    <div className="progress-bar" style={progressbarStyle}></div>
                </div>
                <span className="_a11y">Percentage progress count:</span>
                <span className="mobile-progress--span progress-count">{progressCount}</span>
            </section>
        )
    }

    renderCollectionValue = () => {
        return (
            <section className="mobile-progress" aria-label="Gaming progress information">
                <p><span className="_a11y">Games played:</span><span></span> / <span className="_a11y">Total games:</span><span></span></p>
                <span className="_a11y">Percentage progress count:</span>
                <span className="mobile-progress--span progress-count"></span>
            </section>
        )
    }

    render() {
        const { searchQuery, searchIconSrc } = this.state
        const { data, activeFilter, onFilterChange, onAsideChange, addGameIsActive, aboutIsActive, 
                playCount, progressPlayCount, progressbarPlayStyle, wishCount, progressWishCount, progressbarWishStyle } = this.props

        const btnGroupAside = (mediaClass) => {
            return (
                <div className={"btn-group--aside" + mediaClass}>
                    <button type="button" className={aboutBtnClass} onClick={() => onAsideChange("aboutIsActive")} tabIndex={0}>
                        <span id="btn-about1"></span>
                        <span id="btn-about2"></span>
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
            addGameBtnClass = "btn --menu",
            aboutBtnClass = "btn --about",
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
            <nav className="search-panel">
                <div className="mobile-title-wrapper">
                    <img src={ps} width="30px" alt=""/>
                    <h1 className="mobile-title"><span className="_a11y">PS2 Game Library — </span>Survival Horror Classics</h1>
                    {btnGroupAside(" mobile")}
                </div>
                {this.renderProgress(data, count, progressCount, progressbarStyle, label)}
                <section className="btn-group" aria-label="Filter controls" aria-describedby="filter-description">
                    <span id="filter-description" className="_a11y">Use filters to show games previously marked as played or the ones added to your collection. Combine filters and search to look for games under specific filter option.</span> 
                    {btnGroupAside(" desktop")}
                    <button className={`btn ${activeFilter === "all" ? "is-active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("all")}>All games</button>
                    <button className={`btn --played ${activeFilter === "play" ? "is-active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("play")}><img className="icon" src={game} alt="" />Played</button>
                    <button className={`btn ${activeFilter === "wish" ? "is-active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("wish")}><img className="icon" src={star} alt="" />Collected</button>
                </section>
                <section className="search-wrapper" aria-label="Search input" aria-describedby="search-description">
                    <span id="search-description" className="_a11y">Filter games that have a matching character string in the title with the character string provided by the user in the input field. When input has focus, it's associated button can be used to clear the input.</span>
                    <input type="text" id="search-input" aria-describedby="search-description" placeholder="Enter game title" value={searchQuery} tabIndex={tabIndex} onChange={this.onSearchUpdate} onFocus={this.onSearchFocus} onBlur={this.onSearchBlur} />
                    <button className="search-btn" type="button" aria-hidden={searchAria} tabIndex={tabIndex} onClick={this.onDeleteClick}>
                        <label htmlFor="search-input" className="search-label">{searchLabel}</label>
                        <img className="icon-search" alt={searchAlt} src={searchIconSrc} />
                    </button>
                </section>
            </nav>
        )
    }
}

export default SearchPanel
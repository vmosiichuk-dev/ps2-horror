import { Component } from "react";
import game from "../list-item/img/game.png";
import star from "../list-item/img/star.png";
import ps from "./img/ps-logo.svg";
import search from "./img/search.png";
import del from "./img/del.png";
import menuImg from "./img/plus.svg";
import "./search-panel.css";

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addGameToggle: true,
            searchQuery: "",
            searchIconSrc: search,
            wishlist: false
        }
    }

    onSearchUpdate = (e) => {
        const searchQuery = e.target.value;
        this.setState({searchQuery});
        this.props.onSearchUpdate(searchQuery);
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
            this.props.onSearchUpdate("");
        }
    }

    toggleAddGame = () => {
        this.setState(({ addGameToggle }) => ({ addGameToggle: !addGameToggle }))
        this.props.onAddGameUpdate(this.state.addGameToggle);
    }

    render() {
        const { searchQuery, searchIconSrc } = this.state;
        const { data, playCount, progressCount, activeFilter, onFilterChange, progressBarStyle, addGameIsActive } = this.props;

        let searchAlt = "Search",
            searchAria = true,
            menuImgClass = "menu-img",
            menuBtnClass = "btn btn-menu",
            menuAlt = "Open add game form",
            tabIndex = 0;

        if (addGameIsActive) { 
            menuImgClass += " --active"; 
            menuBtnClass += " --active"; 
            menuAlt = "Close add game form";
            tabIndex = -1;
        }

        if (searchIconSrc === del) { searchAlt = "Clear search input"; searchAria = false }

        return (
            <nav className="search-panel">
                <h1 className="mobile-title"><span className="a11y">PS2 Game Library — </span><img src={ps} alt=""/>Survival Horror Classics</h1>
                <section className="mobile-progress" aria-label="Gaming progress information">
                    <p><span className="a11y">Games played:</span><span>{playCount}</span> / <span className="a11y">Total games:</span><span>{data.length}</span></p>
                    <div className="progress-bar--container">
                        <div className="progress-bar" style={progressBarStyle}></div>
                    </div>
                    <span className="a11y">Percentage progress count:</span>
                    <span className="mobile-progress--span progress-count">{progressCount}</span>
                </section>
                <section className="btn-group" aria-label="Filter controls" aria-describedby="filter-description">
                    <span id="filter-description" className="a11y">Use filters to show games previously marked as played or the ones added to the wishlist. Combine filters and search to look for games under specific filter option.</span> 
                    <button type="button" className={menuBtnClass} onClick={this.toggleAddGame} tabIndex={0}>
                        <img className={menuImgClass} src={menuImg} alt={menuAlt}/>
                    </button>
                    <button className={`btn ${activeFilter === "all" ? "--active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("all")}>All games</button>
                    <button className={`play btn ${activeFilter === "play" ? "--active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("play")}><img className="icon" src={game} alt="" />Played</button>
                    <button className={`btn ${activeFilter === "wish" ? "--active" : ""}`} type="button" tabIndex={tabIndex} onClick={() => onFilterChange("wish")}><img className="icon" src={star} alt="" />Wishlist</button>
                </section>
                <section className="search-wrapper" aria-label="Search input" aria-describedby="search-description">
                    <span id="search-description" className="a11y">Filter games that have a matching character string in the title with the character string provided by the user in the input field. When input has focus, it's associated button can be used to clear the input.</span>
                    <input type="text" id="search-input" aria-describedby="search-description" placeholder="Enter game title" value={searchQuery} tabIndex={tabIndex} onChange={this.onSearchUpdate} onFocus={this.onSearchFocus} onBlur={this.onSearchBlur} />
                    <label htmlFor="search-input" className="search-label">Search</label>
                    <button className="search-btn" type="button" aria-hidden={searchAria} tabIndex={tabIndex} onClick={this.onDeleteClick}><img className="icon-search" alt={searchAlt} src={searchIconSrc} /></button>
                </section>
            </nav>
        )
    }
}

export default SearchPanel;
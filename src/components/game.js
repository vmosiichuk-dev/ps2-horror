import React, { Component } from "react"
import GamePrice from "./game-price"
import "../assets/styles/game.css"

import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import info from "../assets/img/info.png"
import question from "../assets/img/question.png"
import overlay from "../assets/img/overlay.png"

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            priceCategory: "",
            delSrc: props.delSrc,
            clickCount: 0,
            activeClass: "",
            confirmDeleteAria: true,
            itemButtonsStyle: { opacity: 0 }
        }
    } 

    handleDeleteClick = () => {
        const { title, onDelete, delSrc } = this.props
        const { clickCount } = this.state
    
        if (clickCount === 0) {
          this.setState({ delSrc: question, clickCount: 1, activeClass: " is-active", confirmDeleteAria: false })
          setTimeout(() => {
            this.setState({ delSrc: delSrc, clickCount: 0, activeClass: "", confirmDeleteAria: true })
          }, 3000)
        } else if (clickCount === 1) {
          onDelete(title)
        }
    }

    handleTabFocus = () => {
        this.setState(() => {
            const newItemButtonsStyle = { opacity: 1 }
            return { itemButtonsStyle: newItemButtonsStyle }
        })  
    }

    handleTabBlur = () => {
        this.setState(() => {
            const newItemButtonsStyle = { opacity: 0 }
            return { itemButtonsStyle: newItemButtonsStyle }
        })  
    }

    handlePriceClick = (category) => {
        if (this.state.priceCategory === category) return this.setState({ priceCategory: "" })
        this.setState({ priceCategory: category })
    }

    render() {
        const { slug, title, src, wish, play, loose, cib, newg, onMarkState, onOpenInfo, onPriceCategoryChange, priceCategory, wishPriceCategory, activeFilter } = this.props
        const { delSrc, activeClass, itemButtonsStyle, confirmDeleteAria } = this.state

        let gameClass = "game",
            deleteAlt = "Delete game",
            statusContainerClass = "game__status-container"

        if (wish) gameClass += " --wish"
        if (play) gameClass += " --play"
        if (delSrc === question) deleteAlt = "Confirm deletion"
        if (!confirmDeleteAria) statusContainerClass += " is-active"

        switch (priceCategory) {
            case "loose": gameClass += " game--loose"; break
            case "cib": gameClass += " game--cib"; break 
            case "newg": gameClass += " game--newg"; break 
            default: break
        }

        if (activeFilter === "wish") {
            switch (wishPriceCategory) {
                case "loose": gameClass += " game--loose"; break
                case "cib": gameClass += " game--cib"; break 
                case "newg": gameClass += " game--newg"; break 
                default: break
            }
        }

        return (
            <li className={gameClass} id={slug}>
                <div className={statusContainerClass}>
                    <img className="game__status --wish" src={star} alt="Added to Collection" />
                    <img className="game__status --play" src={game} alt="Marked as Played" />
                </div>
                <img className="game__cover-img" src={src} alt={title + " — PS2 game cover"} />
                <img className="game__cover-overlay" src={overlay} alt="" />
                <div className={"game-buttons" + activeClass} tabIndex={0} role="toolbar" aria-activedescendant={slug + "toolbar--wish"} onFocus={this.handleTabFocus} onBlur={this.handleTabBlur} onMouseOver={this.handleTabFocus} onMouseOut={this.handleTabBlur} style={itemButtonsStyle} >
                    <button type="button" id={slug + "--toolbar-wish"} className="btn-sm btn-wish" onClick={() => onMarkState("wish")} data-toggle="wish">
                        <img className="icon icon-wish" src={star} alt="Add to collection" />
                    </button>
                    <button type="button" id={slug + "--toolbar-play"} className="btn-sm btn-play" onClick={() => onMarkState("play")} data-toggle="play">
                        <img className="icon icon-played" src={game} alt="Mark as played" />
                    </button>
                    <button type="button" id={slug + "--toolbar-info"} className="btn-sm btn-info" onClick={() => onOpenInfo(slug)}>
                        <img className="icon icon-info" src={info} alt="Toggle game information" />
                    </button>
                    <button type="button" id={slug + "--toolbar-delete"} className="btn-sm btn-delete" onClick={this.handleDeleteClick}>
                        <img className="icon icon-delete" src={delSrc} alt={deleteAlt} />
                    </button>
                    <p className={"delete-p" + activeClass} aria-hidden={confirmDeleteAria}>Are you sure?<br/>Click again to delete.</p>
                </div>
                <GamePrice 
                    nav={false} 
                    activeFilter={activeFilter}
                    onPriceCategoryChange={onPriceCategoryChange} 
                    priceCategory={priceCategory} 
                    wishPriceCategory={wishPriceCategory} 
                    loose={loose} 
                    cib={cib} 
                    newg={newg} 
                />{/* 
                <h2 className="game-data">
                    <span className="game-name">
                        {title}
                    </span>
                </h2> */}
            </li>
        )
    }
}

export default Game
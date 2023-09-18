import React, { Component } from "react"
import game from "../assets/img/game.png"
import star from "../assets/img/star.png"
import info from "../assets/img/info.png"
import question from "../assets/img/question.png"
import overlay from "../assets/img/overlay.png"
import loose from "../assets/img/loose.png"
import cib from "../assets/img/cib.png"
import newg from "../assets/img/newg.png"
import "../assets/styles/list-item.css"

class ListItem extends Component {
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
          this.setState({ delSrc: question, clickCount: 1, activeClass: " --active", confirmDeleteAria: false })
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
        if (this.state.priceCategory === category) {
            return this.setState({ priceCategory: "" })
        }
        this.setState({ priceCategory: category })
    }

    render() {
        const { itemId, title, src, wish, play, onMarkState } = this.props
        const { delSrc, activeClass, itemButtonsStyle, confirmDeleteAria, priceCategory } = this.state

        let listItemClass = "list-item",
            btnLooseClass = "btn btn-loose",
            btnCibClass = "btn btn-cib",
            btnNewgClass = "btn btn-newg",
            statusContainerClass = "list-item-status-container",
            deleteAlt = "Delete game"

        if (wish) listItemClass += " wish"
        if (play) listItemClass += " play"
        if (delSrc === question) deleteAlt = "Confirm deletion"
        if (!confirmDeleteAria) statusContainerClass += " --active"

        switch (priceCategory) {
            case "loose": {
                listItemClass += " --loose" 
                btnLooseClass += " --active"
                break
            }
            case "cib": {
                listItemClass += " --cib" 
                btnCibClass += " --active"
                break
            }
            case "newg": {
                listItemClass += " --newg" 
                btnNewgClass += " --active"
                break
            }
            default: break
        }

        return (
            <li className={listItemClass} id={itemId}>
                <div className={statusContainerClass}>
                    <img className="status-icon wish" src={star} alt="Added to Wishlist" />
                    <img className="status-icon play" src={game} alt="Marked as Played" />
                </div>
                <img className="img-cover" src={src} alt={title + " — PS2 game cover"} />
                <img className="img-overlay" src={overlay} alt="" />
                <div className={"list-item-buttons" + activeClass} tabIndex={0} role="toolbar" aria-activedescendant={itemId + "toolbar--wish"} onFocus={this.handleTabFocus} onBlur={this.handleTabBlur} onMouseOver={this.handleTabFocus} onMouseOut={this.handleTabBlur} style={itemButtonsStyle} >
                    <button type="button" id={itemId + "--toolbar-wish"} className="btn-sm btn-wish" onClick={() => onMarkState("wish")} data-toggle="wish">
                        <img className="icon icon-wish" src={star} alt="Add to wishlist" />
                    </button>
                    <button type="button" id={itemId + "--toolbar-play"} className="btn-sm btn-play" onClick={() => onMarkState("play")} data-toggle="play">
                        <img className="icon icon-played" src={game} alt="Mark as played" />
                    </button>
                    <button type="button" id={itemId + "--toolbar-info"} className="btn-sm btn-info" onClick={this.handleInfoClick}>
                        <img className="icon icon-info" src={info} alt="Toggle game information" />
                    </button>
                    <button type="button" id={itemId + "--toolbar-delete"} className="btn-sm btn-delete" onClick={this.handleDeleteClick}>
                        <img className="icon icon-delete" src={delSrc} alt={deleteAlt} />
                    </button>
                    <p className={"delete-p" + activeClass} aria-hidden={confirmDeleteAria}>Are you sure?<br/>Click again to delete.</p>
                </div>
                <h2 className="list-item-data">
                    <span className="list-item-name">
                        {title}
                    </span>
                    <div className="list-item-price">
                        <button type="button" className={btnLooseClass} onClick={() => { this.handlePriceClick("loose") }}>
                            <img className="cd-icon" src={loose} alt="Loose price" />
                            <span className="usd">$</span>
                            <span>86</span>
                        </button>
                        <button type="button" className={btnCibClass} onClick={() => { this.handlePriceClick("cib") }}>
                            <img className="cd-icon" src={cib} alt="CIB price" />
                            <span className="usd">$</span>
                            <span>124</span>
                        </button>
                        <button type="button" className={btnNewgClass} onClick={() => { this.handlePriceClick("newg") }}>
                            <img className="cd-icon" src={newg} alt="New price" />
                            <span className="usd">$</span>
                            <span>299</span>
                        </button>
                    </div>
                </h2>
            </li>
        )
    }
}

export default ListItem
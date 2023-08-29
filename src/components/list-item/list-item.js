import React, { Component } from "react";
import game from "./img/game.png";
import star from "./img/star.png";
import question from "./img/question.png";
import "./list-item.css";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delSrc: props.delSrc,
            clickCount: 0,
            activeClass: "",
            confirmDeleteAria: true,
            itemButtonsStyle: { opacity: 0 }
        }
    } 

    handleDeleteClick = () => {
        const { title, onDelete, delSrc } = this.props;
        const { clickCount } = this.state;
    
        if (clickCount === 0) {
          this.setState({ delSrc: question, clickCount: 1, activeClass: " --active", confirmDeleteAria: false });
          setTimeout(() => {
            this.setState({ delSrc: delSrc, clickCount: 0, activeClass: "", confirmDeleteAria: true });
          }, 3000);
        } else if (clickCount === 1) {
          onDelete(title);
        }
    }

    handleTabFocus = () => {
        this.setState(() => {
            const newItemButtonsStyle = { opacity: 1 }
            return { itemButtonsStyle: newItemButtonsStyle }
        });  
    }

    handleTabBlur = () => {
        this.setState(() => {
            const newItemButtonsStyle = { opacity: 0 }
            return { itemButtonsStyle: newItemButtonsStyle }
        });  
    }

    render() {
        const { itemId, title, rating, src, wish, play, onMarkState } = this.props;
        const { delSrc, activeClass, itemButtonsStyle, confirmDeleteAria } = this.state;

        let listItemClass = "list-item",
            deleteAlt = "Delete game";

        if (wish) listItemClass += " wish"
        if (play) listItemClass += " play"
        if (delSrc === question) deleteAlt = "Confirm deletion"

        return (
            <li className={listItemClass} id={itemId}>
                <h2 className="list-item-data">
                    <span className="list-item-name">
                        {title}
                    </span>
                    <span className="list-item-rating">
                        <span className="a11y">| Rating:</span>
                        {rating}
                        <img className="status-icon play" src={game} alt="Marked as Played" />
                        <img className="status-icon wish" src={star} alt="Added to Wishlist" />
                    </span>
                </h2>
                <img className="img-cover" src={src} alt={title + " — PS2 game cover image"} />
                <div className={"list-item-buttons" + activeClass} tabIndex={0} role="toolbar" aria-activedescendant={itemId + "toolbar--wish"} onFocus={this.handleTabFocus} onBlur={this.handleTabBlur} onMouseOver={this.handleTabFocus} onMouseOut={this.handleTabBlur} style={itemButtonsStyle} >
                    <button type="button" id={itemId + "--toolbar-wish"} className="btn-sm btn-wish" onClick={() => onMarkState("wish")} data-toggle="wish">
                        <img className="icon icon-wish" src={star} alt="Add to wishlist" />
                    </button>
                    <button type="button" id={itemId + "--toolbar-play"} className="btn-sm btn-play" onClick={() => onMarkState("play")} data-toggle="play">
                        <img className="icon icon-played" src={game} alt="Mark as played" />
                    </button>
                    <button type="button" id={itemId + "--toolbar-delete"} className="btn-sm" onClick={this.handleDeleteClick}>
                        <img className="icon icon-delete" src={delSrc} alt={deleteAlt} />
                    </button>
                    <p className={"delete-p" + activeClass} aria-hidden={confirmDeleteAria}>Are you sure?<br/>Click again to delete.</p>
                </div>
            </li>
        );
    }
}

export default ListItem;
import React, { Component } from "react"
import "../assets/styles/add-game.css"

class AddGame extends Component {
    constructor(props) {
        super(props)
        this.addGameRef = React.createRef()
    }  

    componentDidMount() { 
        this.addGameRef.current.addEventListener("keydown", this.handleKeydown)
    }
    
    componentWillUnmount() { 
        this.addGameRef.current.removeEventListener("keydown", this.handleKeydown)
    }

    handleKeydown = (e) => {
        if (this.props.addGameIsActive) {
            const focusableElements = [document.querySelector(".btn-menu"), ...this.addGameRef.current.querySelectorAll("input, button")],
                  firstElement = focusableElements[0],
                  secondElement = focusableElements[1],
                  lastElement = focusableElements[focusableElements.length - 1]

            if (e.key === "Tab") {
                if (e.shiftKey && document.activeElement === secondElement) {
                    e.preventDefault()
                    firstElement.focus()
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault()
                    firstElement.focus()
                }
            }
        }
    }

    renderSearchData = (searchData) => {
        return searchData.map(item => {    
            return (
                <div className="searchdata-radio-wrapper" key={item.id}>
                    <input type="radio" className="searchdata-radio" id={item.id} name="searchdata-radio" value={item.id} />
                    <label htmlFor={item.id}>{item.name}</label>
                </div>
            )
        })
    }

    render() {
        const { addedTitle, addFormClass, addFormMessage, onTitleChange, addGameIsActive, onAddGameSearch, searchData, searchDataLoaded, onAddGameSubmit, onSearchRadioChange } = this.props 

        let formClass = "add-form-wrapper",
            tabIndex = -1,
            ariaHidden = true
    
        if (addGameIsActive) { 
            formClass += " --active" 
            tabIndex = 0
            ariaHidden = false
        }

        return (
            <aside className={formClass} tabIndex={-1} ref={this.addGameRef}>  
                <div className="add-item" aria-hidden={ariaHidden}>
                    <h3>Add a game to the list</h3>
                    <p className="a11y" id="add-game-description">To add a game to the library provide a game title and rating of the game. Title should be at least 4 characters long and rating should be a number from 0 to 100. You can decrease and increase an input for rating by 1 using respective buttons. Both fields are required to submit a form.</p>
                    {/* <form className="add-form" onSubmit={onAdd} aria-label="Add game form" aria-describedby="add-game-description"> */}
                    <form className="add-form" onSubmit={onAddGameSubmit} aria-label="Add game form" aria-describedby="add-game-description">
                        <section className="form-searchinput" aria-label="Seacrh input">
                            <label htmlFor="add-game-title" className="add-title--label">Game title (at least 4 characters)</label>
                            <input type="text" placeholder="Enter title" name="title" id="add-game-title" onChange={onTitleChange} value={addedTitle} tabIndex={tabIndex}/>
                            <button type="button" className="btn btn-add-search" onClick={onAddGameSearch} tabIndex={tabIndex}><span className="search-symbol">&#9740;</span></button>
                        </section>
                        <section className="searchdata" aria-label="Seacrh results group" onChange={onSearchRadioChange}>
                            {this.renderSearchData(searchData)}
                        </section>
                        {searchDataLoaded 
                            ? <button type="submit" className="btn btn-add-submit" tabIndex={tabIndex}>Submit</button>
                            : null
                        }
                        {/* <label htmlFor="add-game-title" className="add-title--label">Game title (at least 4 characters)</label>
                        <input type="text" placeholder="Enter title" name="title" id="add-game-title" onChange={onTitleChange} value={addedTitle} tabIndex={tabIndex}/> 
                        <section className="add-rating-wrapper" aria-label="Rating input group">
                            <label htmlFor="add-game-rating" className="add-rating--label">Game rating (between 0 and 100)</label>
                            <button className="btn btn-decrease" aria-label="Decrease rating" onClick={onRatingDecr} tabIndex={tabIndex}>–</button>
                            <input type="number" min="0" max="100" placeholder="Enter rating" name="rating" id="add-game-rating" onChange={onRatingChange} value={addedRating} tabIndex={tabIndex}/>
                            <button className="btn btn-increase" aria-label="Increase rating" onClick={onRatingIncr} tabIndex={tabIndex}>+</button>
                        </section> */}
                        <p className={addFormClass} role="status">{addFormMessage}</p> 
                    </form>
                </div>
            </aside>
        )
    }
}

export default AddGame
import React, { Component } from "react"
import "../assets/styles/add-game.css"

class AddGame extends Component {
    constructor(props) {
        super(props)
        this.addGameRef = React.createRef()
        this.searchRef = React.createRef()
    }

    componentDidMount() { 
        this.addGameRef.current.addEventListener("keydown", this.handleAddGameKeydown)
        this.searchRef.current.addEventListener("keydown", this.handleSearchKeydown)
    }
    
    componentWillUnmount() { 
        this.addGameRef.current.removeEventListener("keydown", this.handleAddGameKeydown)
        this.searchRef.current.removeEventListener("keydown", this.handleSearchKeydown)
    }

    handleAddGameKeydown = (e) => {
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

    handleSearchKeydown = (e) => {
        console.log(e)
        if (e.key === "Enter") {
            e.preventDefault()
            this.props.onAddGameSearch()
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
                    <h2 className="addgame-title">Search and Add PS2 games to your library</h2>
                    <p className="a11y" id="add-game-description">To add a game to the library you first need to search PS2 games by providing a title. Title should be at least 4 characters long. Submit your search query by pressing the button next to an input field. You will get all PS2 games containing the search query, from which you may choose one option to add to the library. If title is not already in the library it will be successfully added to the list. Remember, that added games will not have price information, as well as, additional information for the game may also be incomplete in the database.</p>
                    <form className="add-form" onSubmit={onAddGameSubmit} aria-label="Add game form" aria-describedby="add-game-description">
                        <section className="form-searchinput" aria-label="Seacrh input" ref={this.searchRef}>
                            <label htmlFor="add-game-title" className="add-title--label">Game title (at least 4 characters)</label>
                            <input type="text" placeholder="Enter title" name="title" id="add-game-title" onChange={onTitleChange} value={addedTitle} tabIndex={tabIndex} autoComplete="off"/>
                            <button type="button" className="btn btn-add-search" onClick={onAddGameSearch} tabIndex={tabIndex}><span className="search-symbol">&#9740;</span></button>
                        </section>
                        <section className="searchdata" aria-label="Seacrh results group" onChange={onSearchRadioChange}>
                            {this.renderSearchData(searchData)}
                        </section>
                        {searchDataLoaded 
                            ? <button type="submit" className="btn btn-add-submit" tabIndex={tabIndex}>Submit</button>
                            : null
                        }
                        <p className={addFormClass} role="status">{addFormMessage}</p> 
                    </form>
                </div>
            </aside>
        )
    }
}

export default AddGame
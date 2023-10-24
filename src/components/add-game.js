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
        this.props.addBtnRef.current.addEventListener("keydown", this.handleAddGameKeydown)
        this.searchRef.current.addEventListener("keydown", this.handleSearchKeydown)
    }
    
    componentWillUnmount() { 
        this.addGameRef.current.removeEventListener("keydown", this.handleAddGameKeydown)
        this.props.addBtnRef.current.addEventListener("keydown", this.handleAddGameKeydown)
        this.searchRef.current.removeEventListener("keydown", this.handleSearchKeydown)
    }

    handleAddGameKeydown = (e) => {
        if (this.props.addGameIsActive) {
            const focusableElements = [this.props.addBtnRef.current, ...this.addGameRef.current.querySelectorAll("input, button")]
            
            const firstElement = focusableElements[0]
            const secondElement = focusableElements[1]
            const lastElement = focusableElements[focusableElements.length - 1]

            console.log(focusableElements)

            if (e.key === "Tab") {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault()
                    lastElement.focus()          
                }
                if (!e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault()
                    secondElement.focus()                 
                }
                if (e.shiftKey && document.activeElement === secondElement) {
                    e.preventDefault()
                    firstElement.focus()       
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault()
                    firstElement.focus()       
                }
            }

            if (e.key === "Enter" && document.activeElement.type === "radio") {
                console.log(document.activeElement)
                e.preventDefault()
                document.activeElement.checked = !document.activeElement.checked
                this.props.onSearchRadioChange(e)
            }
        }
    }

    handleSearchKeydown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            this.props.onAddGameSearch()
        }
    }

    renderSearchData = (searchData) => {
        return (
            <div className="add-game__output">
                <div className="add-game__output-border add-game__output-border--t-solid"></div>
                {this.renderSearchDataElements(searchData)}
                <div className="add-game__output-border add-game__output-border--b-solid"></div>
            </div>
        )
    }

    renderSearchDataElements = (searchData) => {
        return searchData.map(item => {    
            return (
                <div className="add-game__output-option" key={item.id}>
                    <input type="radio" className="add-game__output-radio" id={item.id} name="add-game__output-radio" value={item.id} defaultChecked={false} />
                    <label htmlFor={item.id}>{item.name}</label>
                </div>
            )
        })
    }

    render() {
        const { addedTitle, addFormClass, addFormMessage, onTitleChange, addGameIsActive, onAddGameSearch, searchData, searchDataLoaded, onAddGameSubmit, onSearchRadioChange } = this.props 

        let addGameClass = "add-game",
            tabIndex = -1,
            ariaHidden = true
    
        if (addGameIsActive) { 
            addGameClass += " is-active" 
            tabIndex = 0
            ariaHidden = false
        }

        return (
            <aside 
                className={addGameClass} 
                ref={this.addGameRef} 
                tabIndex={-1} >  
                <div className="add-game__wrapper" aria-hidden={ariaHidden} >
                    <h2 className="add-game__title">Search and Add PS2 games to your library</h2>
                    <p className="a11y" id="add-game__description">To add a game to the library you first need to search PS2 games by providing a title. Title should be at least 3 characters long. Submit your search query by pressing enter or the button next to an input field. You will get all PS2 games with the title matching the search query, from which you may choose one option to add to the library. If the title is already in the library you will be prompted to choose a unique title to avoid duplication. Remember, that added games will not have price information. Also, additional information for newly added games is limited to the completeness of such information in the database.</p>
                    <form 
                        className="add-game__form" 
                        onSubmit={onAddGameSubmit} 
                        aria-label="Add game form" aria-describedby="add-game__description" >
                        <section 
                            className="add-game__search" 
                            aria-label="Search input" 
                            ref={this.searchRef} >
                            <label 
                                className="add-game__search-label" htmlFor="add-game__search-input" >
                                Game title (at least 4 characters)
                            </label>
                            <input 
                                type="text" 
                                className="add-game__search-input" 
                                id="add-game__search-input" 
                                name="title" 
                                autoComplete="off"
                                placeholder="Enter title" 
                                onChange={onTitleChange} 
                                value={addedTitle} 
                                tabIndex={tabIndex} 
                            />
                            <button 
                                type="button" 
                                className="btn add-game__search-btn" 
                                onClick={onAddGameSearch} 
                                tabIndex={tabIndex} >
                                <span className="add-game__search-icon">&#9740;</span>
                            </button>
                        </section>
                        <p className={addFormClass} role="status">{addFormMessage}</p> 
                        <section 
                            className="add-game__output-container" 
                            aria-label="Search results group" 
                            onChange={onSearchRadioChange} >
                            <div className="add-game__output-border add-game__output-border--t-dashed"></div>
                            {searchData.length < 1 
                                ? null 
                                : this.renderSearchData(searchData)
                            }
                            <div className="add-game__output-border add-game__output-border--b-dashed"></div>
                        </section>
                        {searchDataLoaded 
                            ? <button 
                                type="submit" 
                                className="btn add-game__submit-btn" 
                                tabIndex={tabIndex} >
                                Submit
                              </button>
                            : null
                        }
                    </form>
                </div>
            </aside>
        )
    }
}

export default AddGame
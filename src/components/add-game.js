import React, { useRef, useCallback, useEffect } from "react"
import "../assets/styles/add-game.css"

function AddGame({ 
    addedTitle,
    addFormClass,
    addFormMessage,
    addGameIsActive,
    searchData,
    searchDataLoaded,
    onTitleChange,
    onSearchRadioChange,
    onAddGameSearch,
    onAddGameSubmit,
    addBtnRef,
    onWindowResize,
    onTabKeydown
 }) {
    const addGameRef = useRef()
    const searchRef = useRef()

    const handleAddGameKeydown = useCallback((e) => {
        if (addGameIsActive) {
            const focusableElements = [
                addBtnRef.current, 
                ...addGameRef.current.querySelectorAll("input, button")
            ]

            onTabKeydown(e, focusableElements)

            if (e.key === "Enter" && document.activeElement.type === "radio") {
                e.preventDefault()
                document.activeElement.checked = !document.activeElement.checked
                onSearchRadioChange(e)
            }
        }
    }, [addBtnRef, addGameIsActive, onSearchRadioChange, onTabKeydown])

    const handleSearchKeydown = useCallback((e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            onAddGameSearch()
        }
    }, [onAddGameSearch])

    const renderSearchData = (searchData) => {
        return (
            <div className="add-game__output">
                <div className="add-game__output-border add-game__output-border--top add-game__output-border--solid"></div>
                {renderSearchDataElements(searchData)}
                <div className="add-game__output-border add-game__output-border--bottom add-game__output-border--solid"></div>
            </div>
        )
    }

    const renderSearchDataElements = (searchData) => {
        return searchData.map(item => {    
            return (
                <div className="add-game__output-option" key={item.id}>
                    <input type="radio" className="add-game__output-radio" id={item.id} name="add-game__output-radio" value={item.id} defaultChecked={false} />
                    <label htmlFor={item.id}>{item.name}</label>
                </div>
            )
        })
    }

    useEffect(() => {
        const handleMount = () => {
            onWindowResize()

            addGameRef.current.addEventListener("keydown", handleAddGameKeydown)
            addBtnRef.current.addEventListener("keydown", handleAddGameKeydown)
            searchRef.current.addEventListener("keydown", handleSearchKeydown)
        }

        const handleUnmount = () => { 
            addGameRef.current.removeEventListener("keydown", handleAddGameKeydown)
            addBtnRef.current.addEventListener("keydown", handleAddGameKeydown)
            searchRef.current.removeEventListener("keydown", handleSearchKeydown)
        }

        handleMount()
        return () => handleUnmount()
    }, [addBtnRef, handleAddGameKeydown, handleSearchKeydown, onWindowResize])

    useEffect(() => {
        if (addGameIsActive) {
            addGameRef.current.scrollIntoView({
                behavior: "smooth", 
                block: "start", 
                inline: "nearest"
            })
        }
    }, [addGameIsActive])

    const tabIndex = addGameIsActive ? 0 : -1

    return (
        <aside 
            className={`add-game ${addGameIsActive ? "is-active" : ""}`} 
            ref={addGameRef} 
            tabIndex={-1} >  
            <div className="add-game__wrapper" >
                <h2 className="add-game__title">Search and add PS2 games to your library</h2>
                <form 
                    className="add-game__form" 
                    onSubmit={onAddGameSubmit} 
                    aria-label="Add game form" aria-describedby="add-game__description" >
                    <section 
                        className="add-game__search" 
                        aria-label="Search input" 
                        ref={searchRef} >
                        <label 
                            className="add-game__search-label" htmlFor="add-game__search-input" >
                            Game title (at least 3 characters)
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
                            <span className="add-game__search-icon" aria-hidden="true">&#9740;</span>
                            <span className="a11y">Search</span>
                        </button>
                    </section>
                    <p className={addFormClass} role="status">{addFormMessage}</p> 
                    <section 
                        className="add-game__output-container" 
                        aria-label="Search results group" 
                        onChange={onSearchRadioChange}
                        tabIndex={tabIndex}  >
                        <div className="add-game__output-border add-game__output-border--top add-game__output-border--dashed"></div>
                        {searchData.length < 1 
                            ? null 
                            : renderSearchData(searchData)
                        }
                        <div className="add-game__output-border add-game__output-border--bottom add-game__output-border--dashed"></div>
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
            <p className="a11y" id="add-game__description">To add a game to the library you first need to search PS2 games in the IGDB database by providing a title. Title should be at least 3 characters long.<br/><br/>Submit your search query by pressing the button next to an input field (or Enter on&nbsp;desktop). You will get all PS2 games with the title matching the search query, from which you may choose one option to add to the library. If the title is already in the library you will be prompted to choose a unique title to avoid duplication.<br/><br/>Remember, that added games will not have price information. Also, additional information for newly added games is limited to the completeness of such information in the database.</p>
        </aside>
    )
}

export default AddGame
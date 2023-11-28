import looseIcon from "../assets/img/loose.png"
import cibIcon from "../assets/img/cib.png"
import newgIcon from "../assets/img/newg.png"
import "../assets/styles/game-price.css"

function getCollectionValue(data, activeFilter) {
    let looseSum = 0, cibSum = 0, newgSum = 0,
        dataLoose, dataCib, dataNewg

    if (activeFilter === "wish") {
        dataLoose = data.filter(
            item => (item.wish && item.wishPriceCategory === "loose")
        )
        dataCib = data.filter(
            item => (item.wish && item.wishPriceCategory === "cib")
        )
        dataNewg = data.filter(
            item => (item.wish && item.wishPriceCategory === "newg")
        )
    } else {
        dataLoose = data.filter(item => item.priceCategory === "loose")
        dataCib = data.filter(item => item.priceCategory === "cib")
        dataNewg = data.filter(item => item.priceCategory === "newg")
    }

    dataLoose.forEach(item => { 
        if (Number.isInteger(item.loose)) looseSum += item.loose 
    })
    dataCib.forEach(item => { 
        if (Number.isInteger(item.cib)) cibSum += item.cib 
    })
    dataNewg.forEach(item => { 
        if (Number.isInteger(item.newg)) newgSum += item.newg 
    })

    return {
        loose: looseSum,
        cib: cibSum,
        newg: newgSum
    }
}

function GamePrice({ data, nav, slug, activeFilter, onPriceCategoryChange, priceCategory, wishPriceCategory, loose, cib, newg }) {
    let value,
        gamePriceClass = "game-price", 
        btnLooseClass = "btn game-price__btn",
        btnCibClass = "btn game-price__btn",
        btnNewgClass = "btn game-price__btn",
        iconLooseClass = "game-price__icon",
        iconCibClass = "game-price__icon",
        iconNewgClass = "game-price__icon",
        usdClass = "game-price__usd",
        tabIndex = 0,
        toolbarLabel = "Value of games in your "

    if (activeFilter === "wish") {
        toolbarLabel += "wishlist:"

        switch (wishPriceCategory) {
            case "loose": {
                btnLooseClass += " game-price__btn--loose"
                iconLooseClass += " game-price__icon--loose"
                break
            } 
            case "cib": {
                btnCibClass += " game-price__btn--cib"
                iconCibClass += " game-price__icon--cib"
                break
            }
            case "newg": {
                btnNewgClass += " game-price__btn--newg"
                iconNewgClass += " game-price__icon--newg"
                break
            }
            default: break
        }
    } else {
        toolbarLabel += "collection:"

        switch (priceCategory) {
            case "loose": {
                btnLooseClass += " game-price__btn--loose"
                iconLooseClass += " game-price__icon--loose"
                break
            } 
            case "cib": {
                btnCibClass += " game-price__btn--cib"
                iconCibClass += " game-price__icon--cib"
                break
            }
            case "newg": {
                btnNewgClass += " game-price__btn--newg"
                iconNewgClass += " game-price__icon--newg"
                break
            }
            default: break
        }
    }

    if (nav) {
        value = getCollectionValue(data, activeFilter)
        gamePriceClass += " game-price--value"
        btnLooseClass += " game-price__btn--loose game-price__btn--value"
        btnCibClass += " game-price__btn--cib game-price__btn--value"
        btnNewgClass += " game-price__btn--newg game-price__btn--value"  
        iconLooseClass += " game-price__icon--loose game-price__icon--value"
        iconCibClass += " game-price__icon--cib game-price__icon--value"
        iconNewgClass += " game-price__icon--newg game-price__icon--value"
        usdClass += " game-price__usd--value"
        tabIndex = -1
        slug = "nav"
    } else {
        activeFilter === "wish" ? 
            toolbarLabel = "Choose a price category you would like to own to calculate a value of your wishlist:" : 
            toolbarLabel = "Choose a price category you own to add a game to your collection:"
    }

    const PriceOption = nav ? "div" : "button"
    const priceOptionContent = (iconClass, iconSrc, iconAlt, category, categoryKey) => {
        return (
        <>
            <img className={iconClass} src={iconSrc} alt={iconAlt} />
            {nav || category !== "n/a" ? <span className={usdClass}>$</span> : null}
            <span>{nav ? value[categoryKey] : category}</span>
        </>
        )
    }

    return (
        <div className={gamePriceClass} role={!nav ? "toolbar" : null} tabIndex={!nav ? 0 : -1} aria-activedescendant={!nav ? slug + "--toolbar-loose" : null} aria-label={toolbarLabel}>
            <PriceOption
                type={!nav ? "button" : null} 
                className={btnLooseClass} 
                id={slug + "--toolbar-loose"}
                onClick={!nav ? () => onPriceCategoryChange("loose") : undefined}
                tabIndex={tabIndex} >
                { priceOptionContent(iconLooseClass, looseIcon, "Loose price", loose, "loose") }
            </PriceOption>
            <PriceOption
                type={nav ? "button" : null} 
                className={btnCibClass} 
                id={slug + "--toolbar-cib"}
                onClick={!nav ? () => onPriceCategoryChange("cib") : undefined}
                tabIndex={tabIndex} >
                { priceOptionContent(iconCibClass, cibIcon, "CIB price", cib, "cib") }
            </PriceOption>
            <PriceOption
                type={nav ? "button" : null} 
                className={btnNewgClass} 
                id={slug + "--toolbar-new"}
                onClick={!nav ? () => onPriceCategoryChange("newg") : undefined}
                tabIndex={tabIndex} >
                { priceOptionContent(iconNewgClass, newgIcon, "New price", newg, "newg") }
            </PriceOption>
            {!nav ? null : (
                <div className="game-price__total">
                    <p className="game-price__total-label">Total: </p>
                    <span className="game-price__usd game-price__usd--value">$</span>
                    <span>{value.loose + value.cib + value.newg}</span>
                </div>
            )}
        </div>
    )
}

export default GamePrice
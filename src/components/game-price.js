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

function GamePrice({ data, nav, activeFilter, onPriceCategoryChange, priceCategory, wishPriceCategory, loose, cib, newg }) {
    let value,
        gamePriceClass = "game-price", 
        btnLooseClass = "btn game-price__btn",
        btnCibClass = "btn game-price__btn",
        btnNewgClass = "btn game-price__btn",
        iconLooseClass = "game-price__icon",
        iconCibClass = "game-price__icon",
        iconNewgClass = "game-price__icon",
        usdClass = "game-price__usd"

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

    if (activeFilter === "wish") {
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
    }

    return (
        <div className={gamePriceClass}>
            <button 
                type="button" 
                className={btnLooseClass} 
                onClick={!nav ? () => onPriceCategoryChange("loose") : undefined}>
                <img className={iconLooseClass} src={looseIcon} alt="Loose price" />
                {nav || loose !== "n/a" ? <span className={usdClass}>$</span> : null}
                <span>{nav ? value.loose : loose}</span>
            </button>
            <button 
                type="button" 
                className={btnCibClass} 
                onClick={!nav ? () => onPriceCategoryChange("cib") : undefined}>
                <img className={iconCibClass} src={cibIcon} alt="CIB price" />
                {nav || cib !== "n/a" ? <span className={usdClass}>$</span> : null}
                <span>{nav ? value.cib : cib}</span>
            </button>
            <button 
                type="button" 
                className={btnNewgClass} 
                onClick={!nav ? () => onPriceCategoryChange("newg") : undefined}>
                <img className={iconNewgClass} src={newgIcon} alt="New price" />
                {nav || newg !== "n/a" ? <span className={usdClass}>$</span> : null}
                <span>{nav ? value.newg : newg}</span>
            </button>
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
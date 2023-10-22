import looseIcon from "../assets/img/loose.png"
import cibIcon from "../assets/img/cib.png"
import newgIcon from "../assets/img/newg.png"
import "../assets/styles/game-price.css"

function getCollectionValue(data) {
    const dataLoose = data.filter(item => item.priceCategory === "loose")
    const dataCib = data.filter(item => item.priceCategory === "cib")
    const dataNewg = data.filter(item => item.priceCategory === "newg")

    let looseSum = 0, cibSum = 0, newgSum = 0

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

function GamePrice({ data, nav, onPriceCategoryChange, priceCategory, loose, cib, newg }) {
    let value,
        gamePriceClass = "game-price", 
        btnLooseClass = "btn btn--price",
        btnCibClass = "btn btn--price",
        btnNewgClass = "btn btn--price",
        iconLooseClass = "game__icon",
        iconCibClass = "game__icon",
        iconNewgClass = "game__icon",
        usdClass = "usd"

    switch (priceCategory) {
        case "loose": {
            btnLooseClass += " btn--loose"
            iconLooseClass += " game__icon--loose"
            break
        } 
        case "cib": {
            btnCibClass += " btn--cib"
            iconCibClass += " game__icon--cib"
            break
        }
        case "newg": {
            btnNewgClass += " btn--newg"
            iconNewgClass += " game__icon--newg"
            break
        }
        default: break
    }

    if (nav) {
        value = getCollectionValue(data)
        gamePriceClass += " game-price--value"
        btnLooseClass += " btn--loose btn--value"
        btnCibClass += " btn--cib btn--value"
        btnNewgClass += " btn--newg btn--value"  
        iconLooseClass += " game__icon--loose game__icon--value"
        iconCibClass += " game__icon--cib game__icon--value"
        iconNewgClass += " game__icon--newg game__icon--value"
        usdClass += " usd--value"
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
                {nav || loose !== "n/a" ? <span className={usdClass}>$</span> : null}
                <span>{nav ? value.cib : cib}</span>
            </button>
            <button 
                type="button" 
                className={btnNewgClass} 
                onClick={!nav ? () => onPriceCategoryChange("newg") : undefined}>
                <img className={iconNewgClass} src={newgIcon} alt="New price" />
                {nav || loose !== "n/a" ? <span className={usdClass}>$</span> : null}
                <span>{nav ? value.newg : newg}</span>
            </button>
            {!nav ? null : (
                <div className="game-price__total">
                    <p className="game-price__total-label">Total: </p>
                    <span className="usd usd--value">$</span>
                    <span>{value.loose + value.cib + value.newg}</span>
                </div>
            )}
        </div>
    )
}

export default GamePrice
import React, {useState, useEffect} from "react"
import loaderGif from "../assets/img/loader.gif"
import "../assets/styles/loader.css"

function Loader({ welcomeClick, loaderError }) {
    const [loaderMessage, setLoaderMessage] = useState("Fetching horror titles from the digital archive...")
    let loaderClass = "loader",
        loaderMessageClass = "loader__error"

    if (welcomeClick) {
        loaderClass += " is-active"
        loaderMessageClass += " is-active"
    }

    useEffect(() => {
        if (welcomeClick) {
            const secondMessageTimeout = setTimeout(() => {
                setLoaderMessage("Arranging your game library by the fear factor...")
            }, 1900)

            return () => clearTimeout(secondMessageTimeout)
        } else if (loaderError) {
            setLoaderMessage("An error occured while connecting to the database. Try reloading the page or visit our PS2 Collection App later.")
        }
    }, [welcomeClick, loaderError])

    return (
        <div className={loaderClass} role="status">
            <img className="loader__gif" src={loaderGif} alt="" />
            <p className={loaderMessageClass}>{loaderMessage}</p>
        </div>
    )
}

export default Loader
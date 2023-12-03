import loaderGif from "../assets/img/loader.gif"
import "../assets/styles/loader.css"

function Loader({ welcomeClick, loaderError }) {
    let loaderClass = "loader",
        loaderMessageClass = "loader__error",
        loaderMessage = ""

    if (welcomeClick) {
        loaderClass += " is-active"
        loaderMessageClass += " is-active"
        loaderMessage = "Fetching data from the PS2 database..."
    }
    if (loaderError) {
        loaderMessage = "An error occured while connecting to the database. Try reloading the page or visit our PS2 Collection App later."
    }

    return (
        <div className={loaderClass} role="status">
            <img className="loader__gif" src={loaderGif} alt="" />
            <p className={loaderMessageClass}>{loaderMessage}</p>
        </div>
    )
}

export default Loader
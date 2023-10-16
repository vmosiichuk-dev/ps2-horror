import loaderGif from "../assets/img/loader.gif"
import "../assets/styles/loader.css"

function Loader({ welcomeClick, loaderError }) {
    let loaderClass = "loader",
        loaderErrorClass = "loader-error"

    if (welcomeClick) loaderClass += " is-active"
    if (loaderError) loaderErrorClass += " is-active"

    return (
        <div className={loaderClass}>
            <img className="loader-gif" src={loaderGif} alt="" />
            <p className={loaderErrorClass}>An error occured while connecting to the database. Try reloading the page or visit our PS2 Collection App later.</p>
        </div>
    )
}

export default Loader
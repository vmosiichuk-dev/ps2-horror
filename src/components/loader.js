import loaderGif from "../assets/img/loader.gif"
import "../assets/styles/loader.css"

function Loader({ welcomeClick, loaderError }) {
    let loaderContainerClass = "loader-container",
        loaderErrorClass = "loader-error"

    if (welcomeClick) loaderContainerClass += " --active"
    if (loaderError) loaderErrorClass += " --active"

    return (
        <div className={loaderContainerClass}>
            <img className="loader-gif" src={loaderGif} alt="" />
            <p className={loaderErrorClass}>An error occured while connecting to the database. Try reloading the page or visit our PS2 Collection App later.</p>
        </div>
    )
}

export default Loader
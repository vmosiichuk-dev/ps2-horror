import loaderGif from "../assets/img/loader.gif"
import "../assets/styles/loader.css"

function Loader({ welcomeClick }) {
    let loaderContainerClass = "loader-container"
    if (welcomeClick) {
        loaderContainerClass += " --active"
    }
    return (
        <div className={loaderContainerClass}>
            <img className="loader-gif" src={loaderGif} alt="" />
            <span className="loader"></span>
        </div>
    )
}

export default Loader
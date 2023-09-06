import ps from "../assets/img/ps-logo.svg"
import "../assets/styles/info.css"

function Info({ data, playCount, progressCount, progressBarStyle }) {
    return (
        <header className="info">
            <h1>PS2<span className="a11y"> Game Library — </span><img src={ps} alt=""/>Survival Horror Classics</h1>
            <section className="info-wrapper"aria-label="Gaming progress information">   
                <p className="info-p">Total<span className="a11y"> Games</span>:
                    <span>{data.length}</span>
                </p>
                <p className="info-p"><span className="a11y">Games </span>Played:
                    <span>{playCount}</span>
                </p>
                <div className="progress-bar--container">
                    <div className="progress-bar" style={progressBarStyle}></div>
                </div>
                <span className="a11y">Percentage progress count:</span>
                <p className="progress-count">{progressCount}</p>
            </section>

        </header>
    )
}

export default Info
import Game from "./game"
import "../assets/styles/game-list.css"

function GameList({ onDelete, onMarkState, onPriceCategoryChange, onOpenInfo, delSrc, filteredData, activeFilter, infoRef, activeButtonRef }) {
    const renderGames = () => {
        return filteredData.map(item => {    
            return (
                <Game 
                    {...item} 
                    infoRef={infoRef}
                    activeButtonRef={activeButtonRef}
                    key={item.slug} 
                    delSrc={delSrc} 
                    activeFilter={activeFilter}
                    onDelete={() => onDelete(item.slug)} 
                    onMarkState={toggle => onMarkState(item.slug, toggle)} 
                    onOpenInfo={slug => onOpenInfo(slug)} 
                    onPriceCategoryChange={category => onPriceCategoryChange(item.slug, category)} 
                />
            )
        })
    }

    const games = renderGames()
    let gameListClass = "game-list"

    if (filteredData.length <= 8) {
        gameListClass += " game-list--8"
    } 
    if (filteredData.length <= 24) {
        gameListClass += " game-list--24"
    } 
    if (filteredData.length <= 10) {
        gameListClass += " game-list--10"
    } 
    if (filteredData.length <= 12) {
        gameListClass += " game-list--12"
    } 

    return (
        <ul className={gameListClass}>
            {games}
        </ul>
    )
}

export default GameList
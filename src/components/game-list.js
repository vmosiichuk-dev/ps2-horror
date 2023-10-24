import Game from "./game"
import "../assets/styles/game-list.css"

function GameList({ onDelete, onMarkState, onPriceCategoryChange, onOpenInfo, delSrc, filteredData, activeFilter }) {
    const renderGames = () => {
        return filteredData.map(item => {    
            return (
                <Game 
                    {...item} 
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

    if (filteredData.length > 4 && filteredData.length <= 12) {
        gameListClass += " game-list--4_12"
    } 
    if (filteredData.length > 6 && filteredData.length <= 30) {
        gameListClass += " game-list--6_30"
    } 
    if (filteredData.length > 5 && filteredData.length <= 10) {
        gameListClass += " game-list--5_10"
    } 
    if (filteredData.length > 4 && filteredData.length <= 8) {
        gameListClass += " game-list--4_8"
    } 

    return (
        <ul className={gameListClass}>
            {games}
        </ul>
    )
}

export default GameList
import Game from "./game"
import "../assets/styles/game_list.css"

function GameList({ onDelete, onMarkState, onPriceCategoryChange, onOpenInfo, delSrc, filteredData }) {
    const renderGames = () => {
        return filteredData.map(item => {    
            return (
                <Game 
                    {...item} 
                    key={item.slug} 
                    delSrc={delSrc} 
                    onDelete={() => onDelete(item.slug)} 
                    onMarkState={toggle => onMarkState(item.slug, toggle)} 
                    onOpenInfo={slug => onOpenInfo(slug)} 
                    onPriceCategoryChange={category => onPriceCategoryChange(item.slug, category)} 
                />
            )
        })
    }

    const games = renderGames()

    return (
        <ul className="game_list">
            {games}
        </ul>
    )
}

export default GameList
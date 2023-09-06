import ListItem from "./list-item"
import "../assets/styles/list.css"

function List({ onDelete, onMarkState, delSrc, filteredData }) {
    const renderElements = () => {
        return filteredData.map(item => {
            const id = item.title.replace(/\W+/g, "-").toLowerCase()
    
            return (
                <ListItem key={id} {...item} itemId={id} delSrc={delSrc} onDelete={() => onDelete(item.title)} onMarkState={toggle => onMarkState(item.title, toggle)} />
            )
        })
    }

    const elements = renderElements()

    return (
        <ul className="list">
            {elements}
        </ul>
    )
}

export default List
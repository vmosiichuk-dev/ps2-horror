import ListItem from "./list-item"
import "../assets/styles/list.css"

function List({ onDelete, onMarkState, onPriceCategoryChange, onOpenInfo, delSrc, filteredData }) {
    const renderElements = () => {
        return filteredData.map(item => {    
            return (
                <ListItem 
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

    const elements = renderElements()

    return (
        <ul className="list">
            {elements}
        </ul>
    )
}

export default List
import ListItem from "../list-item/list-item";
import "./list.css";

function List({ onDelete, onMarkState, delSrc, filteredData }) {
    const renderElements = () => {
        return filteredData.map(item => {
            const id = item.title.replace(/\W+/g, "-").toLowerCase();
            const src = item.source ? `./img/${item.source}.jpg` : `./img/${id}.jpg`;
    
            return (
                <ListItem key={id} src={src} {...item} itemId={id} delSrc={delSrc} onDelete={() => onDelete(item.title)} onMarkState={toggle => onMarkState(item.title, toggle)} />
            );
        });
    }

    const elements = renderElements();

    return (
        <ul className="list">
            {elements}
        </ul>
    );
}

export default List;
import { ReactElement, createElement } from "react";
import { ListValue, ListWidgetValue } from "mendix";
import { DraggableItem } from "./Draggable";

export interface ItemListProps {
    items: ListValue;
    widgetList: ListWidgetValue;
}

export const ItemList = ({ items, widgetList }: ItemListProps): ReactElement => {
    return (
        items && (
            <div>
                {items.items &&
                    items.items.map((item, i) => {
                        return <DraggableItem item={item} key={i} i={i} widgetList={widgetList} />;
                    })}
            </div>
        )
    );
};

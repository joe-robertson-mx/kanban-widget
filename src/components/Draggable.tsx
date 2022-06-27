import { ReactElement, createElement } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ObjectItem, ListWidgetValue } from "mendix";

export interface DraggableProps {
    item: ObjectItem;
    i: number;
    widgetList: ListWidgetValue;
}

export function DraggableItem({ item, i, widgetList }: DraggableProps): ReactElement {
    return (
        <Draggable draggableId={item.id} index={i} key={item.id}>
            {provided => (
                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    {widgetList.get(item)}
                </div>
            )}
        </Draggable>
    );
}

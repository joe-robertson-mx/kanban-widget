import { ReactElement, createElement } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { ItemList } from "./components/ItemList";
import { KanbanContainerProps } from "../typings/KanbanProps";

import "./ui/Kanban.css";
import Big from "big.js";

export function Kanban({ myObject, newSort, prevSort }: KanbanContainerProps): ReactElement {
    function onDragEnd(result: DropResult): void {
        const { source, destination } = result;
        if (!destination) {
            return;
        }
        prevSort.setValue(new Big(source.index));
        newSort.setValue(new Big(destination.index));

        const destObj = myObject[parseInt(destination.droppableId, 10)];
        const destObjItem = destObj.allItems.items!.find(item => {
            return item.id === result.draggableId;
        });
        const actionOnObj = destObj.action!.get(destObjItem!);
        if (actionOnObj.canExecute) {
            actionOnObj.execute();
        }
    }

    return (
        <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={onDragEnd}>
                {myObject.map((obj, i) => {
                    return (
                        <Droppable droppableId={i.toString()} key={i}>
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="kanban-col"
                                    style={{ width: `${100 / myObject.length}%` }}
                                >
                                    <h6>{obj.sectionName}</h6>
                                    <ItemList items={obj.sectionItems} widgetList={obj.widgetList} />
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    );
                })}
            </DragDropContext>
        </div>
    );
}

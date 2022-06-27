import { ReactElement, createElement } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { DraggableItem } from "./components/Draggable";
import { ListValue, ListWidgetValue, ReferenceSetValue, ObjectItem } from "mendix";

import { KanbanContainerProps } from "../typings/KanbanProps";

import "./ui/Kanban.css";

export function Kanban({
    // todoWidgetList,
    // doneWidgetList,
    // todoitems,
    // doneitems,
    // todo,
    // done,
    myObject
}: KanbanContainerProps): ReactElement {
    const ItemList = (items: ListValue, widgetList: ListWidgetValue): ReactElement => {
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

    function addOrRemoveObjToAss(objItem: ObjectItem | undefined, ass: ReferenceSetValue, add: boolean): void {
        console.dir(objItem);
        if (objItem) {
            const assItems = ass.value;
            console.dir(ass);
            if (Array.isArray(assItems)) {
                if (add) {
                    console.log(`Adding obj ${objItem.id} to ${ass.value}`);
                    const updatedAssItems = [...assItems!, objItem];
                    console.dir(updatedAssItems);
                    ass.setValue(updatedAssItems);
                } else {
                    console.log(`Removing obj ${objItem.id} from ${ass.value}`);
                    const updatedAssItems = assItems!.filter(arrItem => {
                        return objItem.id !== arrItem.id;
                    });
                    ass.setValue(updatedAssItems);
                }
            } else {
                if (add) {
                    console.log(`Adding obj ${objItem.id} to empty ass`);
                    ass.setValue([objItem]);
                } else {
                    if (assItems === undefined) {
                        console.error(`Trying to remove object Id ${objItem.id} from empty association`);
                    } else {
                        ass.setValue([]);
                        console.log(`Removing obj ${objItem.id} from ass`);
                    }
                }
            }
        }
    }

    const width = `${100 / myObject.length}%`;

    function onDragEndObj(result: DropResult): void {
        const { source, destination } = result;

        console.dir(result);

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            return;
        }
        const sourcObj = myObject[parseInt(source.droppableId, 10)];
        const destObj = myObject[parseInt(destination.droppableId, 10)];

        console.dir(destObj);

        const sourceObjItem = sourcObj.sectionItems.items!.find(item => {
            return item.id === result.draggableId;
        });

        const destObjItem = destObj.selectableItems.items!.find(item => {
            return item.id === result.draggableId;
        });
        console.dir(sourceObjItem);
        console.dir(destObjItem);
        console.dir(destObj.selectableItems);
        console.dir(sourcObj.selectableItems);

        destObj.sectionAsssociation.setValue([destObjItem!]);

        // addOrRemoveObjToAss(destObjItem, destObj.sectionAsssociation, true);
        addOrRemoveObjToAss(sourceObjItem, sourcObj.sectionAsssociation, false);
    }

    return (
        <div style={{ display: "flex" }}>
            <DragDropContext onDragEnd={onDragEndObj}>
                {myObject.map((obj, i) => {
                    return (
                        <Droppable key={i} droppableId={i.toString()}>
                            {provided => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{ height: "500px", width, border: "1px solid black", display: "flex" }}
                                >
                                    {ItemList(obj.sectionItems, obj.widgetList)}
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

/**
 * This file was generated from Kanban.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { ListValue, ListWidgetValue, ReferenceSetValue } from "mendix";

export interface MyObjectType {
    sectionName: string;
    sectionAsssociation: ReferenceSetValue;
    sectionItems: ListValue;
    selectableItems: ListValue;
    widgetList: ListWidgetValue;
}

export interface MyObjectPreviewType {
    sectionName: string;
    sectionAsssociation: string;
    sectionItems: {} | { type: string } | null;
    selectableItems: {} | { type: string } | null;
    widgetList: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}

export interface KanbanContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    myObject: MyObjectType[];
    todo: ReferenceSetValue;
    done: ReferenceSetValue;
    allItems: ListValue;
    todoitems: ListValue;
    doneitems: ListValue;
    todoWidgetList: ListWidgetValue;
    doneWidgetList: ListWidgetValue;
}

export interface KanbanPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    myObject: MyObjectPreviewType[];
    todo: string;
    done: string;
    allItems: {} | { type: string } | null;
    todoitems: {} | { type: string } | null;
    doneitems: {} | { type: string } | null;
    todoWidgetList: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    doneWidgetList: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}

/**
 * This file was generated from Kanban.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties } from "react";
import { EditableValue, ListValue, ListActionValue, ListWidgetValue } from "mendix";
import { Big } from "big.js";

export interface MyObjectType {
    sectionName: string;
    sectionItems: ListValue;
    widgetList: ListWidgetValue;
    action?: ListActionValue;
    allItems: ListValue;
}

export interface MyObjectPreviewType {
    sectionName: string;
    sectionItems: {} | { type: string } | null;
    widgetList: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    action: {} | null;
    allItems: {} | { type: string } | null;
}

export interface KanbanContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    newSort: EditableValue<Big>;
    prevSort: EditableValue<Big>;
    myObject: MyObjectType[];
}

export interface KanbanPreviewProps {
    className: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    newSort: string;
    prevSort: string;
    myObject: MyObjectPreviewType[];
}

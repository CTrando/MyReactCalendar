import * as React from 'react';
import "./EventLayer.css";
import {EventPlacer} from "./layout/EventPlacer";
import {Event} from "../../event/Event";
import {EventViewProps} from "../../event/EventView";
import {ReactElement} from "react";

type EventLayerProps = {
    events: Event[],

    name: string;
    eventClassName: string,
    numDays: number,
    startHour: number,
    endHour: number

    getEvent(props: EventViewProps): ReactElement;
    onEventDrag(dragEvent: React.DragEvent, evt: Event, name: string): void;
    onEventDrop(dropEvent: React.MouseEvent): void;
    onEventResize(resizeEvent: React.DragEvent, evt: Event, resizeType: string): void;
    onEventDragStart(dragStartEvent: React.DragEvent): void;
    onEventDragOver(dragOverEvent: React.DragEvent): void;
}

export class EventLayer extends React.PureComponent<EventLayerProps> {
    static defaultProps = {
        onEventDrag: () => {},
        onEventResize: () => {},
        onEventDrop: () => {},
        onEventDragOver: (e: React.DragEvent) => {
            e.stopPropagation();
            e.preventDefault();
        },
        onEventDragStart: (e: React.DragEvent) => {
            e.dataTransfer.setData('text', JSON.stringify({
                mouseY: e.clientY,
                id: (e.target as HTMLDivElement).id
            }));
            e.stopPropagation();
        }
    };

    /**
     * Called when event is dragged, is a closure that appends the layer name
     */
    onEventDrag(dragEvent: React.DragEvent, evt: Event) {
        this.props.onEventDrag(dragEvent, evt, this.props.name);
    }

    /**
     * Gets the style for the specific layer
     */
    getEventCalendarStyle() {
        return {
            gridTemplateColumns: `repeat(${this.props.numDays}, minmax(20px, 1fr))`
        }
    }

    render() {
        const placer = new EventPlacer();
        const styledEvents = placer.layout({
            ...this.props,
            onEventDrag: this.onEventDrag.bind(this),
        }, this.props.events);

        return (
            <div style={this.getEventCalendarStyle()} className="event-layer">
                {styledEvents}
            </div>
        )
    }
}

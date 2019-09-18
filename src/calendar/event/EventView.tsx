import * as React from 'react';
import {format} from 'date-fns';
import {Event} from "./Event";

export type EventViewProps = {
    event: Event;

    onEventDrag(dragEvent: React.DragEvent, evt: Event): void;
    onEventDrop(dropEvent: React.MouseEvent): void;
    onEventDragStart(dragStartEvent: React.DragEvent): void;
    onEventDragOver(dragOverEvent: React.DragEvent): void;
}

export type EventViewState = {
    editing: boolean
}

export class EventView extends React.PureComponent<EventViewProps, EventViewState> {
    constructor(props: EventViewProps) {
        super(props);
        this.state = {
            editing: false
        }
    }

    /**
     * Returns a renderable react component
     */
    render() {
        const startFormatted = format(this.props.event.start, 'h:mma');
        const endFormatted = format(this.props.event.end, 'h:mma');

        const formatStr = `${startFormatted}-${endFormatted}`;

        return (
            <div
                id={`${this.props.event.id}-drag`}
                key={this.props.event.start.toString() + this.props.event.end.toString()}

                draggable={true}
                onDrag={(e: React.DragEvent) => this.props.onEventDrag(e, this.props.event)}
                onDrop={this.props.onEventDrop.bind(this)}
                // setting data onto dataTransfer so that can recognize what div was dragged on drop
                onDragStart={this.props.onEventDragStart.bind(this)}
                onDragOver={this.props.onEventDragOver.bind(this)}
                style={{height: "100%"}}>

                <div onDoubleClick={() => this.setState({editing: true})}
                     style={{height: "100%"}}>
                    {this.state.editing && <div>hello </div>}
                    <div>{formatStr}</div>
                </div>
            </div>
        )
    }
}

import * as React from 'react';
import {Event} from "../calendar/event/Event";
import "./Resizable.css";

export const END = "end";
export const START = "start";

type ResizableEventProps = {
    onEventResize(evt: React.DragEvent, e: Event, resizeType: string): void;
    active: boolean;
    evt: Event;
}

export class ResizableEvent extends React.PureComponent<ResizableEventProps> {
    static defaultProps = {
        onEventResize: () => {},
        active: true,
        id: "test"
    };

    startResize(evt: React.DragEvent) {
        this.props.onEventResize(evt, this.props.evt, START);
    }

    endResize(evt: React.DragEvent) {
        this.props.onEventResize(evt, this.props.evt, END);
    }

    getStartResizeWidget() {
        if (!this.props.active)
            return null;

        return (
            <div draggable={true}
                 key={this.props.evt.id + "resize-start"}
                 className="resize-widget resize-widget-start"
                 onDragOver={(e) => e.preventDefault()}
                 onDrag={this.startResize.bind(this)}
            />
        )
    }

    getEndResizeWidget() {
        if (!this.props.active)
            return null;

        return (
            <div draggable={true}
                 key={this.props.evt.id + "resize-end"}
                 className="resize-widget resize-widget-end"
                 onDragOver={(e) => e.preventDefault()}
                 onDrag={this.endResize.bind(this)}
            />
        )
    }

    render() {
        return (
            <div className="resize-context">
                {this.getStartResizeWidget()}
                {this.props.children}
                {this.getEndResizeWidget()}
            </div>
        )
    }
}

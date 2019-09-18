import * as React from 'react';
import "./EventCalendar.css";
import {DayLayer} from "../layers/day/DayLayer";
import {HourLayer} from "../layers/hour/HourLayer";
import {decodeEvent, decodeEventRespectElement} from "../../decoder/MouseDecoder";
import {InputLayer} from "../layers/input/InputLayer";
import {EventLayer} from "../layers/event/EventLayer";
import {DEFAULT_END_HOUR, DEFAULT_NUM_DAYS, DEFAULT_START_HOUR} from "../../Constants";
import {ReactElement} from "react";
import {Layer} from "../layers/Layer";
import {EventViewProps} from "./EventView";
import {Event} from "./Event";

const RESIZE = "resize";
const DRAG = "drag";

interface EventCalendarState {
    draggedEvent: Event,
    dragType: string,
    dragLayer: string
}

interface EventCalendarProps {
    onCalendarClick(timeClickedOn: Date): void;

    onEventDrop(evt: Event, dragLayer: string, timeEventDropped: Date): void;

    onEventResize(evt: Event, timeEventResizedTo: Date, resizeType: string): void;

    getEvent(props: EventViewProps): ReactElement;

    numDays: number;
    startHour: number;
    endHour: number;
    layers: Layer[];
}

export class EventCalendar extends React.PureComponent<EventCalendarProps, EventCalendarState> {

    static defaultProps = {
        startHour: DEFAULT_START_HOUR,
        endHour: DEFAULT_END_HOUR,
        numDays: DEFAULT_NUM_DAYS,
        onEventDrop: () => {},
        onEventResize: () => {},
        onCalendarClick: () => {},
        layers: []
    };

    /**
     * Called when a user clicks anywhere on the event calendar
     * @param evt the click event
     */
    onCalendarClick(evt: Event) {
        const timeClickedOn = decodeEvent(evt, this.props.numDays, this.props.startHour, this.props.endHour)!;
        this.props.onCalendarClick(timeClickedOn);
    }

    /**
     * Called when a user starts dragging an event on the event calendar anywhere
     * @param dragEvent
     * @param evt the drag event
     * @param layerName the name of which layer the event should be dragged on
     */
    onEventDrag(dragEvent: React.DragEvent, evt: Event, layerName: string) {
        this.setState({draggedEvent: evt, dragType: DRAG, dragLayer: layerName});
    }

    /**
     * Called when an event is dropped, finds what time the event was dropped on and then
     * calls callback from props with params
     * @param dropEvent
     */
    onEventDrop(dropEvent: React.MouseEvent) {
        if (this.state.dragType !== DRAG)
            return;

        try {
            const timeEventDroppedOn = decodeEventRespectElement(dropEvent, this.props.numDays, this.props.startHour, this.props.endHour);

            if (this.state.draggedEvent && timeEventDroppedOn) {
                this.props.onEventDrop(this.state.draggedEvent, this.state.dragLayer, timeEventDroppedOn);
            }
        } catch (error) {
            console.warn(error);
        }
    }

    /**
     * Calls resize event passed in from props
     * @param resizeEvent the event object
     * @param evt event that got resized
     * @param resizeType whether the resize occurred at the start or the end
     */
    onEventResize(resizeEvent: React.DragEvent, evt: Event, resizeType: string) {
        // TODO consider adding a delay here so this doesn't get called so often
        this.setState({draggedEvent: evt, dragType: RESIZE});
        const timeEventDroppedOn = decodeEvent(resizeEvent, this.props.numDays, this.props.startHour, this.props.endHour);

        if (timeEventDroppedOn && this.props.onEventResize)
            this.props.onEventResize(evt, timeEventDroppedOn, resizeType);

        resizeEvent.stopPropagation();
    }

    /**
     * Generates the style for the event calendar based on the number of days, start hour and end hour
     */
    getEventCalendarWrapperStyle() {
        let ret = {
            gridColumn: `2 / ${this.props.numDays + 2}`,
            gridRow: `2 / ${this.props.endHour - this.props.startHour + 2}`
        };
        console.log(ret);
        console.log(this.props);
        return ret;
    }

    render() {
        // TODO support passing in an object mapping layername to layer properties such as events, classnames etc
        const eventLayers = this.props.layers.map(layer => {
            return (
                <EventLayer key={layer.name}
                            eventClassName={layer.eventClassName}
                            getEvent={this.props.getEvent}

                            name={layer.name}
                            events={layer.events}
                            startHour={this.props.startHour}
                            endHour={this.props.endHour}
                            numDays={this.props.numDays}

                            onEventDrag={this.onEventDrag.bind(this)}
                            onEventDrop={this.onEventDrop.bind(this)}
                            onEventResize={this.onEventResize.bind(this)}
                />
            )
        });

        return (
            <div id="event-calendar" className="event-calendar" style={this.getEventCalendarWrapperStyle()}>
                <HourLayer startHour={this.props.startHour} endHour={this.props.endHour}/>
                <DayLayer numDays={this.props.numDays}/>
                <InputLayer
                    onDoubleClick={this.onCalendarClick.bind(this)}
                    onEventDrop={this.onEventDrop.bind(this)}/>
                {eventLayers}
            </div>
        )
    }
}

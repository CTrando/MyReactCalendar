import React from 'react';
import PropTypes from 'prop-types';

import "./EventCalendar.css";
import {DayLayer} from "../layers/day/DayLayer";
import {HourLayer} from "../layers/hour/HourLayer";
import {decodeEvent, decodeEventRespectElement} from "../../decoder/MouseDecoder";
import {InputLayer} from "../layers/input/InputLayer";
import {EventLayer} from "../layers/event/EventLayer";

const RESIZE = "resize";
const DRAG = "drag";

export class EventCalendar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            draggedEvent: null,
            dragType: null,
            dragLayer: null
        }
    }

    /**
     * Called when a user clicks anywhere on the event calendar
     * @param evt the click event
     */
    onDoubleClick(evt) {
        const timeClickedOn = decodeEvent(evt, this.props.numDays, this.props.startHour, this.props.endHour);

        if (this.props.onDoubleClick)
            this.props.onDoubleClick(timeClickedOn);
    }

    /**
     * Called when a user starts dragging an event on the event calendar anywhere
     * @param evt the drag event
     * @param key the unique key for the given event
     * @param layerName the name of which layer the event should be dragged on
     */
    onEventDrag(evt, key, layerName) {
        this.setState({draggedEvent: key, dragType: DRAG, dragLayer: layerName});
    }

    onEventDrop(evt) {
        if (this.state.dragType !== DRAG)
            return;

        try {
            const timeEventDroppedOn = decodeEventRespectElement(evt, this.props.numDays, this.props.startHour, this.props.endHour);

            // we know it is a drag event event if the second part of conditional is not null (no typos here)
            if (this.props.onEventDrop && this.state.draggedEvent && timeEventDroppedOn)
                this.props.onEventDrop(this.state.draggedEvent, this.state.dragLayer, timeEventDroppedOn);
        } catch(error)  {
            console.warn(error);
        }
    }

    onEventResize(evt, key, typeResize) {
        // should add a delay here so this doesn't get called so often
        this.setState({draggedEvent: key, dragType: RESIZE});
        const timeEventDroppedOn = decodeEvent(evt, this.props.numDays, this.props.startHour, this.props.endHour);

        if (timeEventDroppedOn && this.props.onEventResize)
            this.props.onEventResize(key, timeEventDroppedOn, typeResize);

        evt.stopPropagation();
    }

    getEventCalendarWrapperStyle() {
        return {
            position: "relative",
            gridColumn: `2 / ${this.props.numDays + 2}`,
            gridRow: `2 / ${this.props.endHour - this.props.startHour + 2}`
        }
    }

    render() {
        // TODO allow them to pass in an object mapping layername to layer properties such as events, classnames etc
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
            <div id="event-calendar" style={this.getEventCalendarWrapperStyle()}>
                <HourLayer startHour={this.props.startHour} endHour={this.props.endHour}/>
                <DayLayer numDays={this.props.numDays}/>
                <InputLayer
                    onDoubleClick={this.onDoubleClick.bind(this)}
                    onEventDrop={this.onEventDrop.bind(this)}/>

                {eventLayers}
            </div>
        )
    }
}

EventCalendar.propTypes = {
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func,
    onDoubleClick: PropTypes.func,
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
    numDays: PropTypes.number.isRequired,
    layers: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        events: PropTypes.arrayOf(PropTypes.object),
        eventClassName: PropTypes.string
    })),
};

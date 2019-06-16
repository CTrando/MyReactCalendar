import React from 'react';
import PropTypes from 'prop-types';

import "./EventCalendar.css";
import {DayLines} from "../../lines/day/DayLines";
import {HourLines} from "../../lines/hour/HourLines";
import {decodeEvent, decodeEventRespectElement} from "../../decoder/MouseDecoder";
import {differenceInCalendarDays, startOfWeek} from "date-fns";
import {Resizable} from "../../resize/Resizable";

const RESIZE = "resize";
const DRAG = "drag";

export class EventCalendar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            draggedEvent: null,
            dragType: null
        }
    }

    /**
     * Called when a user clicks anywhere on the event calendar
     * @param evt the click event
     */
    onClick(evt) {
        const timeClickedOn = decodeEvent(evt, this.props.numDays, this.props.startHour, this.props.endHour);

        if (this.props.onClick)
            this.props.onClick(timeClickedOn);
    }

    allowDrag(e) {
        e.preventDefault();
    }

    /**
     * Called when a user starts dragging an event on the event calendar anywhere
     * @param evt the drag event
     * @param key the unique key for the given event
     */
    onEventDrag(evt, key) {
        this.setState({draggedEvent: key, dragType: DRAG});
    }

    onEventDrop(evt) {
        const timeEventDroppedOn = decodeEventRespectElement(evt, this.props.numDays, this.props.startHour, this.props.endHour);

        // we know it is a drag event event if the second part of conditional is not null (no typos here)
        if (this.props.onEventDrop && this.state.draggedEvent && timeEventDroppedOn)
            this.props.onEventDrop(this.state.draggedEvent, timeEventDroppedOn);
    }

    onEventResize(evt, key, typeResize) {
        // should add a delay here so this doesn't get called so often
        this.setState({draggedEvent: key, dragType: RESIZE});
        const timeEventDroppedOn = decodeEvent(evt, this.props.numDays, this.props.startHour, this.props.endHour);

        if (timeEventDroppedOn && this.props.onEventResize)
            this.props.onEventResize(key, timeEventDroppedOn, typeResize);

        evt.stopPropagation();
    }

    onDrop(evt) {
        if (this.state.dragType === RESIZE) {

        } else if (this.state.dragType === DRAG) {
            this.onEventDrop(evt);
        }
    }

    onDragStart(e) {
        e.dataTransfer.setData('text', JSON.stringify({
            mouseY: e.clientY,
            id: e.target.id
        }));
    }

    getEventCalendarStyle() {
        const earliestHour = this.props.startHour;
        const latestHour = this.props.endHour;

        const diff = latestHour - earliestHour;
        const diffIn5MinuteIntervals = diff * 12;

        return {
            gridTemplateRows: `repeat(${diffIn5MinuteIntervals}, 1fr)`,
            gridTemplateColumns: `repeat(${this.props.numDays}, minmax(20px, 1fr))`
        }
    }

    getEventStyle(calendarStart, eventStart, eventEnd) {
        let backgroundColor = "grey";

        const referenceStart = startOfWeek(eventStart, {weekStartsOn: 1});
        const eventColStart = differenceInCalendarDays(eventStart, referenceStart) + 1;
        const eventColEnd = differenceInCalendarDays(eventEnd, referenceStart) + 1;

        const startTime5MinuteIntervals = Math.floor((eventStart.getHours() - calendarStart) * 12) + Math.floor(eventStart.getMinutes() / 5) + 1;
        const endTime5MinuteIntervals = Math.floor((eventEnd.getHours() - calendarStart) * 12) + Math.floor(eventEnd.getMinutes() / 5) + 1;

        if (eventColStart !== eventColEnd)
            backgroundColor = "red";


        return {
            position: "relative",
            backgroundColor: backgroundColor,
            gridRow: `${startTime5MinuteIntervals}/${endTime5MinuteIntervals}`,

            // only support events that start and end on the same day, so can just use one
            gridColumn: `${eventColStart}/${eventColEnd}`,
            border: "1px solid white",
            zIndex: 1,
            height: "100%"
        }
    }

    getEventDivs(layer) {
        return layer.map((evt) => {
            const style = this.getEventStyle(this.props.startHour, evt.props.start, evt.props.end);
            // TODO consider cloning all the functions into the evt component and then having the component rendering itself how it wants
            return (
                <div key={evt.props.id} style={style}>
                    <Resizable onResize={(e, position) => this.onEventResize(e, evt.props.id, position)}>
                        <div
                            id={`${evt.props.id}-drag`}
                            draggable
                            key={evt.props.start.toString() + evt.props.end.toString()}
                            onDrag={(e) => this.onEventDrag(e, evt.props.id)}
                            // have to normalize getDay() because it thinks start of week is on sunday
                            onDrop={this.onDrop.bind(this)}
                            // setting data onto dataTransfer so that can recognize what div was dragged on drop
                            onDragStart={this.onDragStart.bind(this)}
                            onDragOver={this.allowDrag}
                            style={{height: "100%"}}>

                            {evt}
                        </div>
                    </Resizable>
                </div>
            );
        });
    }

    getEventCalendarWrapperStyle() {
        return {
            position: "relative",
            gridColumn: `2 / ${this.props.numDays + 2}`,
            gridRow: `2 / ${this.props.endHour - this.props.startHour + 2}`
        }
    }

    render() {

        const eventDivsPerLayer = this.props.events.map((layer, index) => {
            return (
                <div key={index} style={this.getEventCalendarStyle()} className="event-calendar">
                    {this.getEventDivs(layer)}
                </div>
            )
        });

        return (
            <div id="event-calendar" style={this.getEventCalendarWrapperStyle()}>
                <HourLines startHour={this.props.startHour} endHour={this.props.endHour}/>
                <DayLines numDays={this.props.numDays} onEventDrop={this.onDrop.bind(this)}
                          onClick={this.onClick.bind(this)}/>
                {eventDivsPerLayer}
            </div>
        )
    }
}

EventCalendar.propTypes = {
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func,
    onClick: PropTypes.func,
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
    numDays: PropTypes.number.isRequired,
    events: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
};

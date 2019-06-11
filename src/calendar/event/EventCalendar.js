import React from 'react';
import PropTypes from 'prop-types';
import {Event} from './Event';

import "./EventCalendar.css";
import {DayLines} from "../../lines/day/DayLines";
import {HourLines} from "../../lines/hour/HourLines";
import {decodeEvent} from "../../decoder/MouseDecoder";
import 'react-resizable/css/styles.css';
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

    allowDrag(e) {
        e.preventDefault();
    }

    onEventDrag(evt, key) {
        this.setState({draggedEvent: key, dragType: DRAG});
    }

    onEventDrop(evt) {
        const timeEventDroppedOn = decodeEvent(evt, this.props.numDays, this.props.startHour, this.props.endHour);

        // we know it is a drag event event if the second part of conditional is not null (no typos here)
        if (this.props.onEventDrop && this.state.draggedEvent)
            this.props.onEventDrop(this.state.draggedEvent, timeEventDroppedOn);
    }

    onEventResize(evt, key) {
        // should add a delay here so this doesn't get called so often
        this.setState({draggedEvent: key, dragType: RESIZE});
        const timeEventDroppedOn = decodeEvent(evt, this.props.numDays, this.props.startHour, this.props.endHour);

        if(this.props.onEventResize)
            this.props.onEventResize(key, timeEventDroppedOn);

        evt.stopPropagation();
    }

    onDrop(evt) {
        if(this.state.dragType === RESIZE) {

        } else if(this.state.dragType === DRAG) {
            this.onEventDrop(evt);
        }
    }

    getEventCalendarStyle() {
        const earliestHour = this.props.startHour;
        const latestHour = this.props.endHour;

        const diff = latestHour - earliestHour;
        const diffIn5MinuteIntervals = diff * 12;

        return {
            gridTemplateRows: `repeat(${diffIn5MinuteIntervals}, 1fr)`,
            gridTemplateColumns: `repeat(${this.props.numDays}, 1fr)`
        }
    }

    getEventDivs() {
        return this.props.events.map((evt) => {
            const style = evt.getEventStyle(this.props.startHour);
            return (
                <div key={evt.id} style={style}>
                    <Resizable onResize={(e) => this.onEventResize(e, evt.id)}>
                        <div
                            draggable
                            key={evt.start.toString() + evt.end.toString()}
                            onDrag={(e) => this.onEventDrag(e, evt.id)}
                            // have to normalize getDay() because it thinks start of week is on sunday
                            onDrop={this.onDrop.bind(this)}
                            onDragOver={this.allowDrag}
                            style={{height: "100%"}}>

                            {evt.getView(this.props.startHour)}
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
        return (
            <div style={this.getEventCalendarWrapperStyle()}>
                <HourLines startHour={this.props.startHour} endHour={this.props.endHour}/>
                <DayLines numDays={this.props.numDays} onEventDrop={this.onDrop.bind(this)}/>
                <div id="event-calendar" style={this.getEventCalendarStyle()} className="event-calendar">
                    {this.getEventDivs()}
                </div>
            </div>
        )
    }
}

EventCalendar.propTypes = {
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func,
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
    numDays: PropTypes.number.isRequired,
    events: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
};

import React from 'react';
import PropTypes from 'prop-types';

import "./EventCalendar.css";
import {startOfWeek, differenceInCalendarDays} from "date-fns";
import {DayLines} from "../../lines/day/DayLines";
import {HourLines} from "../../lines/hour/HourLines";

export class EventCalendar extends React.PureComponent {

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

    getEventStyle(start, end) {
        const referenceStart = startOfWeek(start, {weekStartsOn: 1});
        const eventCol = differenceInCalendarDays(start, referenceStart) + 1;

        const startTime5MinuteIntervals = Math.floor((start.getHours() - this.props.startHour) * 12) + Math.floor(start.getMinutes() / 5) + 1;
        const endTime5MinuteIntervals = Math.floor((end.getHours() - this.props.startHour) * 12) + Math.floor(end.getMinutes() / 5) + 1;

        return {
            position: "relative",
            backgroundColor: "grey",
            gridRow: `${startTime5MinuteIntervals}/${endTime5MinuteIntervals}`,

            // only support events that start and end on the same day, so can just use one
            gridColumn: `${eventCol}/${eventCol}`,
            border: "1px solid white",
            zIndex: 1,
        }
    }

    getEventDivs() {
        return this.props.events.map((evt) => {
            const style = this.getEventStyle(evt.start, evt.end);

            return (
                <div key={"event" + evt.start + evt.end} style={style}>
                    <div
                        draggable
                        onDragStart={() => console.log("hello drag start")}
                        onDragOver={(e) => {
                            e.preventDefault();
                            console.log("hello world")
                        }}
                        onDrop={(e) => {
                            console.log("dropped on an event")
                        }}
                        onClick={() => console.log("clicked on an event")} style={{height: "100%"}}>
                        hello world
                    </div>
                </div>
            )
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
                <DayLines numDays={this.props.numDays}/>
                <div style={this.getEventCalendarStyle()} className="event-calendar">
                    {this.getEventDivs()}
                </div>
            </div>
        )
    }
}

EventCalendar.propTypes = {
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
    numDays: PropTypes.number.isRequired,
    events: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.instanceOf(Date).isRequired,
        end: PropTypes.instanceOf(Date).isRequired
    })),
};

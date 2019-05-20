import React from 'react';
import PropTypes from 'prop-types';

import "./EventCalendar.css";
import {startOfWeek, differenceInCalendarDays} from "date-fns";

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
            zIndex: "10",
            backgroundColor: "grey",
            gridRow: `${startTime5MinuteIntervals}/${endTime5MinuteIntervals}`,

            // only support events that start and end on the same day, so can just use one
            gridColumn: `${eventCol}/${eventCol}`,
            border: "1px solid white"
        }
    }

    getEventDivs() {
        return this.props.events.map((evt) => {
            const style = this.getEventStyle(evt.start, evt.end);
            console.log(style);

            return (
                <div key={"event" + evt.start + evt.end} style={style}>
                    <div onClick={() => console.log("clicked on an event")} style={{height: "100%"}}>
                        hello world
                    </div>
                </div>
            )
        });
    }

    render() {
        return (
            <div style={this.getEventCalendarStyle()} className="event-calendar">
                {this.getEventDivs()}
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

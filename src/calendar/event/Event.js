import React from 'react';
import {startOfWeek, differenceInCalendarDays} from "date-fns";

export class Event {

    constructor({id, start, end}) {
        this.id = id;
        this.start = start;
        this.end = end;
    }

    onDrag(e) {
        console.log("dropped event");
    }

    onClick(e) {
        console.log("clicked on an event")
    }

    allowDrag(e) {
        e.preventDefault();
    }

    /**
     * Returns a renderable react component
     */
    getView(calendarStart) {
        return (
            <div onClick={(e) => console.log("string from event on click")} style={{height: "100%"}}>
                how are you
            </div>
        )
    }

    getEventStyle(calendarStart) {
        let backgroundColor = "grey";

        const referenceStart = startOfWeek(this.start, {weekStartsOn: 1});
        const eventColStart = differenceInCalendarDays(this.start, referenceStart) + 1;
        const eventColEnd = differenceInCalendarDays(this.end, referenceStart) + 1;

        const startTime5MinuteIntervals = Math.floor((this.start.getHours() - calendarStart) * 12) + Math.floor(this.start.getMinutes() / 5) + 1;
        const endTime5MinuteIntervals = Math.floor((this.end.getHours() - calendarStart) * 12) + Math.floor(this.end.getMinutes() / 5) + 1;

        if(eventColStart !== eventColEnd)
           backgroundColor = "red" ;


        return {
            position: "relative",
            backgroundColor: backgroundColor,
            gridRow: `${startTime5MinuteIntervals}/${endTime5MinuteIntervals}`,

            // only support events that start and end on the same day, so can just use one
            gridColumn: `${eventColStart}/${eventColEnd}`,
            border: "1px solid white",
            zIndex: 1,
        }
    }
}

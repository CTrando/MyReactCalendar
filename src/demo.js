import React from 'react';
import {
    max,
    addSeconds,
    differenceInSeconds,
    setHours,
    setMinutes,
    setSeconds,
    setMilliseconds,
    setDay
} from 'date-fns';
import {Event} from "./calendar/event/Event";
import {WeekCalendar} from "./calendar/week/WeekCalendar";

export class Demo extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            events: [
                new Event({
                    id: "event1",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 8), 0), 0), 0), 2),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 20), 0), 0), 0), 2)
                }),
                new Event({
                    id: "event2",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 10), 30), 0), 0), 3),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 12), 50), 0), 0), 3)
                }),
                new Event({
                    id: "event3",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 16), 20), 0), 0), 5),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 20), 30), 0), 0), 5)
                }),
                new Event({
                    id: "event4",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 5), 20), 0), 0), 5),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 7), 30), 0), 0), 5)
                }),
                new Event({
                    id: "event5",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 11), 0), 0), 0), 1),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 12), 20), 0), 0), 1)
                }),
                new Event({
                    id: "event6",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 22), 0), 0), 0), 3),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 23), 20), 0), 0), 3)
                })]
        }
    }

    onEventDrop(droppedEventId, timeEventDroppedOn) {
        const droppedEvent = this.state.events.filter((evt) => evt.id === droppedEventId)[0];
        const secondsDiff = differenceInSeconds(droppedEvent.end, droppedEvent.start);

        droppedEvent.start = timeEventDroppedOn;
        droppedEvent.end = addSeconds(timeEventDroppedOn, secondsDiff);

        if (droppedEvent.start.getDay() !== droppedEvent.end.getDay())
            return;

        const newEvent = new Event(droppedEvent);

        const eventsWithoutDroppedEvent = this.state.events.filter((evt) => evt.id !== droppedEventId);
        this.setState({
            events: [...eventsWithoutDroppedEvent, newEvent]
        });
    }

    onEventResize(droppedEventId, timeEventDroppedOn) {
        const droppedEvent = this.state.events.filter((evt) => evt.id === droppedEventId)[0];
        const prevStart = droppedEvent.start;

        droppedEvent.end = max(prevStart, timeEventDroppedOn);

        if (droppedEvent.start.getDay() !== droppedEvent.end.getDay())
            return;

        const newEvent = new Event(droppedEvent);

        const eventsWithoutDroppedEvent = this.state.events.filter((evt) => evt.id !== droppedEventId);
        this.setState({
            events: [...eventsWithoutDroppedEvent, newEvent]
        });
    }


    render() {
        return (
            <WeekCalendar events={this.state.events} onEventDrop={this.onEventDrop.bind(this)} onEventResize={this.onEventResize.bind(this)}/>
        )
    }
}

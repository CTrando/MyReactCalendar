import React from 'react';
import {
    max,
    addHours,
    addSeconds,
    addMinutes,
    differenceInSeconds,
    setHours,
    setMinutes,
    setSeconds,
    setMilliseconds,
    setDay
} from 'date-fns';
import {Event} from "./calendar/event/Event";
import {WeekCalendar} from "./calendar/week/WeekCalendar";
import {END, START} from "./resize/Resizable";

export class Demo extends React.PureComponent {

    getEvent({id, start, end}) {
        return (
            <Event id={id} start={start} end={end}/>
        )
    }

    constructor(props) {
        super(props);

        this.state = {
            numCreated: 0,
            events: [
                {
                    id: "event1",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 8), 0), 0), 0), 2),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 20), 0), 0), 0), 2)
                },
                {
                    id: "event2",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 10), 30), 0), 0), 3),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 12), 50), 0), 0), 3)
                },
                {
                    id: "event3",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 16), 20), 0), 0), 5),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 20), 30), 0), 0), 5)
                },
                {
                    id: "event4",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 5), 20), 0), 0), 5),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 7), 30), 0), 0), 5)
                },
                {
                    id: "event5",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 11), 0), 0), 0), 1),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 12), 20), 0), 0), 1)
                },
                {
                    id: "event6",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 22), 0), 0), 0), 3),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 23), 20), 0), 0), 3)
                },
            ]
        }
    }

    onEventDrop(droppedEventId, timeEventDroppedOn) {
        const droppedEvent = this.state.events.filter((evt) => evt.id === droppedEventId)[0];
        const secondsDiff = differenceInSeconds(droppedEvent.end, droppedEvent.start);

        const newEvent = Object.assign({}, droppedEvent);

        newEvent.start = timeEventDroppedOn;
        newEvent.end = addSeconds(timeEventDroppedOn, secondsDiff);

        if (newEvent.start.getDay() !== newEvent.end.getDay())
            return;


        const eventsWithoutDroppedEvent = this.state.events.filter((evt) => evt.id !== droppedEventId);
        this.setState({
            events: [...eventsWithoutDroppedEvent, newEvent]
        });
    }

    onEventResize(droppedEventId, timeEventResizedTo, typeResize) {
        const droppedEvent = this.state.events.filter((evt) => evt.id === droppedEventId)[0];
        const minVal = addMinutes(droppedEvent.start, 30);

        const newEvent = Object.assign({}, droppedEvent);

        if (newEvent.start.getDay() !== newEvent.end.getDay())
            return;

        if (newEvent.start.getDay() !== timeEventResizedTo.getDay())
            return;

        if (typeResize === END) {
            newEvent.end = max(minVal, timeEventResizedTo);
        } else if (typeResize === START) {
            newEvent.start = timeEventResizedTo;
        }

        const eventsWithoutDroppedEvent = this.state.events.filter((evt) => evt.id !== droppedEventId);
        this.setState({
            events: [...eventsWithoutDroppedEvent, newEvent]
        });
    }

    onCalendarClick(timeClickedOn) {
        const start = timeClickedOn;
        const end = addHours(timeClickedOn, 1);

        if (start.getDay() !== end.getDay())
            return;

        const newEvent = {id: "created-event" + this.state.numCreated, start: start, end: end};
        this.setState({numCreated: this.state.numCreated + 1, events: [...this.state.events, newEvent]});
    }


    render() {
        const eventComponents = this.state.events.map(this.getEvent);
        return (
            <WeekCalendar events={eventComponents}
                          onCalendarClick={this.onCalendarClick.bind(this)}
                          onEventDrop={this.onEventDrop.bind(this)}
                          onEventResize={this.onEventResize.bind(this)}/>
        )
    }
}
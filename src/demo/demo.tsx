import * as React from 'react';
import {ReactElement} from 'react';
import {
    addHours,
    addMinutes,
    addSeconds,
    differenceInSeconds,
    max,
    setDay,
    setHours,
    setMilliseconds,
    setMinutes,
    setSeconds
} from 'date-fns';
import {EventView, EventViewProps} from "../calendar/event/EventView";
import {Event} from "../calendar/event/Event";
import {WeekCalendar} from "../calendar/week/WeekCalendar";
import {END, START} from "../resize/ResizableEvent";

import "./demo.css";
import {Layer} from "../calendar/layers/Layer";

const EVENT = "event";
const PREFERENCE = "preference";

interface DemoState {
    numEventsCreated: number;
    events: Event[];
    preferences: Event[];
}

export class Demo extends React.PureComponent<any, DemoState> {
    getEvent(props: EventViewProps): ReactElement {
        return (
            <EventView {...props}/>
        )
    }

    constructor(props: any) {
        super(props);

        this.state = {
            numEventsCreated: 0,
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
            ],
            preferences: [
                {
                    id: "preference1",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 13), 0), 0), 0), 2),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 15), 0), 0), 0), 2)
                },
                {
                    id: "preference2",
                    start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 5), 30), 0), 0), 3),
                    end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 7), 50), 0), 0), 3)
                },
            ]
        }
    }

    onEventDrop(droppedEvent: Event, layerName: string, timeEventDroppedOn: Date) {
        let dropType = EVENT;
        if (!droppedEvent) {
            dropType = PREFERENCE;
        }

        const secondsDiff = differenceInSeconds(droppedEvent.end, droppedEvent.start);

        const newEvent = Object.assign({}, droppedEvent);

        newEvent.start = timeEventDroppedOn;
        newEvent.end = addSeconds(timeEventDroppedOn, secondsDiff);

        if (newEvent.start.getDay() !== newEvent.end.getDay())
            return;

        if (dropType === EVENT) {
            const eventsWithoutDroppedEvent = this.state.events.filter((evt) => evt !== droppedEvent);
            this.setState({
                events: [...eventsWithoutDroppedEvent, newEvent]
            });
        } else {
            const preferencesWithoutDroppedEvent = this.state.preferences.filter((evt) => evt !== droppedEvent);
            this.setState({
                preferences: [...preferencesWithoutDroppedEvent, newEvent]
            });
        }
    }

    onEventResize(resizedEvent: Event, timeEventResizedTo: Date, resizeType: string) {
        let dropType = EVENT;
        if (!resizedEvent) {
            dropType = PREFERENCE;
        }

        const minVal = addMinutes(resizedEvent.start, 30);

        const newEvent = Object.assign({}, resizedEvent);

        if (newEvent.start.getDay() !== newEvent.end.getDay())
            return;

        if (newEvent.start.getDay() !== timeEventResizedTo.getDay())
            return;

        if (resizeType === END) {
            newEvent.end = max(minVal, timeEventResizedTo);
        } else if (resizeType === START) {
            newEvent.start = timeEventResizedTo;
        }

        if (dropType === EVENT) {
            const eventsWithoutDroppedEvent = this.state.events.filter((evt) => evt !== resizedEvent);
            this.setState({
                events: [...eventsWithoutDroppedEvent, newEvent]
            });
        } else {
            const preferencesWithoutDropEvent = this.state.preferences.filter((evt) => evt !== resizedEvent);
            this.setState({
                preferences: [...preferencesWithoutDropEvent, newEvent]
            });
        }
    }

    onCalendarClick(timeClickedOn: Date) {
        const start = timeClickedOn;
        const end = addHours(timeClickedOn, 1);

        if (start.getDay() !== end.getDay())
            return;

        const newEvent = {id: "created-event" + this.state.numEventsCreated, start: start, end: end};
        this.setState({numEventsCreated: this.state.numEventsCreated + 1, events: [...this.state.events, newEvent]});
    }


    render() {
        const eventComponents = this.state.events;
        const preferenceComponents = this.state.preferences;

        const layers: Layer[] = [
            {name: EVENT, events: eventComponents, eventClassName: EVENT},
            {name: PREFERENCE, events: preferenceComponents, eventClassName: PREFERENCE}
        ];

        return (
            <WeekCalendar layers={layers}
                          getEvent={this.getEvent.bind(this)}
                          onCalendarClick={this.onCalendarClick.bind(this)}
                          onEventDrop={this.onEventDrop.bind(this)}
                          onEventResize={this.onEventResize.bind(this)}/>
        )
    }
}


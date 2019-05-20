import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {WeekCalendar} from "./calendar/week/WeekCalendar";

import {setHours, setMinutes, setSeconds, setMilliseconds, setDay} from 'date-fns';

let events = [
    {
        start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 8), 0), 0), 0), 2),
        end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 20), 0), 0), 0), 2)
    },
    {
        start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 10), 30), 0), 0), 3),
        end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 12), 50), 0), 0), 3)
    },
    {
        start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 16), 20), 0), 0), 5),
        end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 20), 30), 0), 0), 5)
    },
    {
        start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 5), 20), 0), 0), 5),
        end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 7), 30), 0), 0), 5)
    },
    {
        start: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 11), 0), 0), 0), 1),
        end: setDay(setMilliseconds(setSeconds(setMinutes(setHours(new Date(), 12), 20), 0), 0), 1)
    }
];

ReactDOM.render(
    <div style={{height: "100%", padding: "10em"}}>
        <WeekCalendar events={events}/>
    </div>
    , document.getElementById('root'));


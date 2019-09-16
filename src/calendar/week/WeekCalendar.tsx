import * as React from 'react';
import {HourBar} from "../../bar/hour/HourBar";
import "./WeekCalendar.css";
import {EventCalendar} from "../event/EventCalendar";
import {DayBar} from "../../bar/day/DayBar";
import {DEFAULT_END_HOUR, DEFAULT_START_HOUR} from "../../Constants";

const NUM_DAYS_IN_WEEK = 7;
const NUM_DAYS_IN_WORK_WEEK = 5;

interface WeekCalendarState {
    numDays: number
}

interface WeekCalendarProps {
    workWeek: boolean,
    events: [],
    layers: [],
    onCalendarClick: Function,
    onEventDrop: Function,
    onEventResize: Function,
    getEvent: Function,
}

export class WeekCalendar extends React.PureComponent<WeekCalendarProps, WeekCalendarState> {
    static defaultProps = {
        workWeek: true,
        getEvent: () => {
            return <div/>
        }
    };

    constructor(props: WeekCalendarProps) {
        super(props);

        this.state = {
            numDays: props.workWeek ? NUM_DAYS_IN_WORK_WEEK : NUM_DAYS_IN_WEEK,
        };
    }

    getMinHour() {
        if (!this.props.layers)
            return DEFAULT_START_HOUR;
        let startHours = [].concat(...this.props.layers.map(e => e.events)).map(e => e.start.getHours());
        // subtracting one to have some more space
        return Math.max(0, Math.min(...startHours) - 1);
    }

    getMaxHour() {
        if (!this.props.layers)
            return DEFAULT_END_HOUR;

        //let endHours = [].concat(...this.props.layers.map(e => e.events)).map(e => e.end.getHours());
        let endHours: number[] = [];
        // adding one to have some more space
        return Math.min(Math.max(...endHours) + 1, 24);
    }

    getWeekCalendarStyle() {
        return {
            // extra 1 for the day bar
            gridTemplateRows: `min-content repeat(${this.getMaxHour() - this.getMinHour()}, 1fr)`,
            // extra 1 for the hour bar
            gridTemplateColumns: `min-content repeat(${this.state.numDays}, 1fr)`
        }
    }

    render() {
        return (
            <div style={this.getWeekCalendarStyle()} className="wc-container">
                <DayBar numDays={this.state.numDays}/>

                <HourBar startHour={this.getMinHour()} endHour={this.getMaxHour()}/>

                <EventCalendar startHour={this.getMinHour()}
                               onEventDrop={this.props.onEventDrop}
                               onEventResize={this.props.onEventResize}
                               onCalendarClick={this.props.onCalendarClick}
                               getEvent={this.props.getEvent}
                               endHour={this.getMaxHour()}
                               numDays={this.state.numDays}
                               layers={this.props.layers}/>
            </div>
        )
    }
}

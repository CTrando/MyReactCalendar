import * as React from 'react';
import {HourBar} from "../../bar/hour/HourBar";
import "./WeekCalendar.css";
import {EventCalendar} from "../event/EventCalendar";
import {Event} from "../event/Event";
import {DayBar} from "../../bar/day/DayBar";
import {DEFAULT_END_HOUR, DEFAULT_START_HOUR} from "../../Constants";
import {Layer} from "../layers/Layer";
import {ReactElement} from "react";
import {EventViewProps} from "../event/EventView";

const NUM_DAYS_IN_WEEK = 7;
const NUM_DAYS_IN_WORK_WEEK = 5;

interface WeekCalendarState {
    numDays: number
}

interface WeekCalendarProps {
    workWeek: boolean;
    layers: Layer[];

    onCalendarClick(timeClickedOn: Date): void;

    onEventDrop(event: Event, layerName: string, timeClickedOn: Date): void;

    onEventResize(event: Event, timeResizedTo: Date, resizeType: string): void;

    getEvent(props: EventViewProps): ReactElement;
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
            numDays: this.props.workWeek ? NUM_DAYS_IN_WORK_WEEK : NUM_DAYS_IN_WEEK,
        };
    }

    getMinHour() {
        if (!this.props.layers)
            return DEFAULT_START_HOUR;
        let startHours = this.props.layers.flatMap(e => e.events).map(e => e.start.getHours());
        // subtracting one to have some more space
        return Math.max(0, Math.min(...startHours) - 1);
    }

    getMaxHour() {
        if (!this.props.layers)
            return DEFAULT_END_HOUR;

        let endHours = this.props.layers.flatMap(e => e.events).map(e => e.end.getHours());
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

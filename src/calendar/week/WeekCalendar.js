import React from 'react';
import PropTypes from 'prop-types';
import {HourBar} from "../../bar/hour/HourBar";
import "./WeekCalendar.css";
import {EventCalendar} from "../event/EventCalendar";
import {DayBar} from "../../bar/day/DayBar";
import {Event} from "../event/Event";

const DEFAULT_MIN_HOUR = 8;
const DEFAULT_MAX_HOUR = 20;

const NUM_DAYS_IN_WEEK = 7;
const NUM_DAYS_IN_WORK_WEEK = 5;


export class WeekCalendar extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            numDays: props.workWeek ? NUM_DAYS_IN_WORK_WEEK : NUM_DAYS_IN_WEEK,
        };
    }

    getMinHour() {
        if (!this.props.events)
            return DEFAULT_MIN_HOUR;
        let startHours = this.props.events.map(e => e.start.getHours());
        // subtracting one to have some more space
        return Math.max(0, Math.min(...startHours) - 1);
    }

    getMaxHour() {
        if (!this.props.events)
            return DEFAULT_MAX_HOUR;

        let endHours = this.props.events.map(e => e.end.getHours());
        // adding one to have some more space
        return Math.min(Math.max(...endHours) + 1, 24);
    }

    getWeekCalendarStyle() {
        return {
            // extra 1 for the time bar
            gridTemplateRows: `repeat(${this.getMaxHour() - this.getMinHour() + 1}, 1fr)`,

            // extra 1 for the day bar
            gridTemplateColumns: `repeat(${this.state.numDays + 1}, 1fr)`
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
                               endHour={this.getMaxHour()}
                               numDays={this.state.numDays}
                               events={this.props.events}/>
            </div>
        )
    }
}

WeekCalendar.propTypes = {
    workWeek: PropTypes.bool.isRequired,
    events: PropTypes.arrayOf(PropTypes.instanceOf(Event)),
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func
};

WeekCalendar.defaultProps = {
    workWeek: true,
    events: []
};

import React from 'react';
import PropTypes from 'prop-types';
import {HourBar} from "../../bar/hour/HourBar";
import "./WeekCalendar.css";
import {EventCalendar} from "../event/EventCalendar";
import {HourLines} from "../../lines/hour/HourLines";
import {DayLines} from "../../lines/day/DayLines";
import {DayBar} from "../../bar/day/DayBar";

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
        return Math.min(...startHours) - 1;
    }

    getMaxHour() {
        if (!this.props.events)
            return DEFAULT_MAX_HOUR;

        let endHours = this.props.events.map(e => e.end.getHours());
        // adding one to have some more space
        return Math.max(...endHours) + 1;
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
                               endHour={this.getMaxHour()}
                               numDays={this.state.numDays}
                               events={this.props.events}/>
            </div>
        )
        /*
        return (
            <div className="week-calendar-container">
                <DayBar  numDays={this.state.numDays}/>
                <div className="week-calendar">
                    <HourBar startHour={this.getMinHour()} endHour={this.getMaxHour()}/>
                    <HourLines startHour={this.getMinHour()} endHour={this.getMaxHour()}/>

                    <div style={{position: "relative"}}>
                        <DayLines numDays={this.state.numDays}/>
                        <EventCalendar startHour={this.getMinHour()}
                                       endHour={this.getMaxHour()}
                                       numDays={this.state.numDays}
                                       events={this.props.events}/>
                    </div>
                </div>
            </div>
        )*/
    }
}

WeekCalendar.propTypes = {
    workWeek: PropTypes.bool.isRequired,
    events: PropTypes.arrayOf(PropTypes.shape({
        start: PropTypes.instanceOf(Date).isRequired,
        end: PropTypes.instanceOf(Date).isRequired
    }))
};

WeekCalendar.defaultProps = {
    workWeek: true,
    events: []
};

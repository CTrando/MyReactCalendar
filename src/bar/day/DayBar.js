import React from 'react';
import "./DayBar.css";
import PropTypes from 'prop-types';
import {startOfWeek, addDays, format} from "date-fns";

export class DayBar extends React.PureComponent {

    getDayBarStyle() {
        return {
            gridTemplateColumns: `min-content repeat(${this.props.numDays}, 1fr)`
        };
    }

    getDays() {
        const ret = [];
        let curDay = startOfWeek(new Date(), {weekStartsOn: 1});
        for (let i = 0; i < this.props.numDays; i++) {
            const dayStr = format(curDay, "ddd");
            curDay = addDays(curDay, 1);
            ret.push(
                <div key={dayStr} className="day">
                    {dayStr}
                </div>
            )
        }
        return ret;
    }

    render() {
        return (
            <div style={this.getDayBarStyle()} className="day-bar">
                <div className="invis-time">
                    <div style={{visibility: "hidden"}}>00:00 am</div>
                </div>
                {this.getDays()}
            </div>
        )
    }
}

DayBar.propTypes = {
    numDays: PropTypes.number.isRequired
};

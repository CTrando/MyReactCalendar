import React from 'react';
import PropTypes from 'prop-types';

import "./HourBar.css";

import {format} from "date-fns";

export class HourBar extends React.PureComponent {

    getHourBarStyle() {
        const hours = this.props.endHour - this.props.startHour;

        return {
            display: "grid",
            gridTemplateRows: `repeat(${hours}, 1fr)`,
            height: "100%",
        };
    }

    getHours() {
        const ret = [];
        const curTime = new Date();
        curTime.setMinutes(0, 0, 0);

        for (let i = this.props.startHour; i < this.props.endHour; i++) {
            curTime.setHours(i);
            const hourTime = format(curTime, "ha");
            ret.push((
                <div key={hourTime} className="hour-step">
                    {hourTime}
                </div>
            ));
        }
        return ret;
    }

    render() {
        return (
            <div className="hour-bar" style={this.getHourBarStyle()}>
                {this.getHours()}
            </div>
        );
    }
}

HourBar.propTypes = {
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired
};

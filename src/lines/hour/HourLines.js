import React from 'react';
import PropTypes from 'prop-types';

import "./HourLines.css"

export class HourLines extends React.PureComponent {

    getHourLines() {
        const ret = [];
        for (let i = this.props.startHour; i < this.props.endHour; i++) {
            const hourTime = `${i}:00`;
            ret.push((
                <div key={hourTime + "hour-line"} className="hour-line">
                </div>
            ))
        }
        return ret;
    }

    getHourLinesStyle() {
        const hours = this.props.endHour - this.props.startHour;
        return {
            display: "grid",
            gridTemplateRows: `repeat(${hours}, 1fr)`,
            height: "100%",
        };
    }

    render() {
        return (
            <div className="hour-lines" style={this.getHourLinesStyle()}>
                {this.getHourLines()}
            </div>
        );
    }
}

HourLines.propTypes = {
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired
}

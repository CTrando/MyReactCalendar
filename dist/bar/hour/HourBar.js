import React from 'react';
import PropTypes from 'prop-types';
import "./HourBar.css";
import { format } from "date-fns";
export class HourBar extends React.PureComponent {
  getHourBarStyle() {
    const hours = this.props.endHour - this.props.startHour;
    return {
      display: "grid",
      gridTemplateRows: `repeat(${hours}, 1fr)`,
      height: "100%"
    };
  }

  getHourStyle(start) {
    return {
      gridRow: `${start} / ${start + 1}`
    };
  }

  getHours() {
    const ret = [];
    const curTime = new Date();
    curTime.setMinutes(0, 0, 0);

    for (let i = this.props.startHour; i < this.props.endHour; i++) {
      curTime.setHours(i);
      const hourTime = format(curTime, "ha");
      ret.push(React.createElement(React.Fragment, {
        key: hourTime
      }, React.createElement("div", {
        key: hourTime,
        style: this.getHourStyle(i - this.props.startHour + 2),
        className: "hour-step-container"
      }, React.createElement("div", null, hourTime))));
    }

    return ret;
  }

  render() {
    return React.createElement(React.Fragment, null, this.getHours());
  }

}
HourBar.propTypes = {
  startHour: PropTypes.number.isRequired,
  endHour: PropTypes.number.isRequired
};
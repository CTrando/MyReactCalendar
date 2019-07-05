import React from 'react';
import PropTypes from 'prop-types';
import "./HourLayer.css";
export class HourLayer extends React.PureComponent {
  getHourLines() {
    const ret = [];

    for (let i = this.props.startHour; i < this.props.endHour; i++) {
      const hourTime = `${i}:00`;
      ret.push(React.createElement("div", {
        key: hourTime + "hour-line",
        className: "hour-line"
      }));
    }

    return ret;
  }

  getHourLinesStyle() {
    const hours = this.props.endHour - this.props.startHour;
    return {
      display: "grid",
      gridTemplateRows: `repeat(${hours}, 1fr)`,
      height: "100%"
    };
  }

  render() {
    return React.createElement("div", {
      className: "hour-layer",
      style: this.getHourLinesStyle()
    }, this.getHourLines());
  }

}
HourLayer.propTypes = {
  startHour: PropTypes.number.isRequired,
  endHour: PropTypes.number.isRequired
};
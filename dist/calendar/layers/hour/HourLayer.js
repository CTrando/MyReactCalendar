import React from 'react';
import PropTypes from 'prop-types';
import "./HourLayer.css";
import { DEFAULT_END_HOUR, DEFAULT_START_HOUR } from "../../../Constants";
/**
 * Renders the borders for the hours
 */

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
      gridTemplateRows: `repeat(${hours}, 1fr)`
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
HourLayer.defaultProps = {
  startHour: DEFAULT_START_HOUR,
  endHour: DEFAULT_END_HOUR
};
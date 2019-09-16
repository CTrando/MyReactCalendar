import React from 'react';
import "./DayLayer.css";
import PropTypes from 'prop-types';
import { DEFAULT_NUM_DAYS } from "../../../Constants";
/**
 * Renders the borders for the days
 */

export class DayLayer extends React.PureComponent {
  getDayLines() {
    const ret = [];

    for (let i = 0; i < this.props.numDays; i++) {
      ret.push(React.createElement("div", {
        key: i + "day-line",
        className: "day-line"
      }));
    }

    return ret;
  }

  getDayStyle() {
    return {
      gridTemplateColumns: `repeat(${this.props.numDays}, 1fr)`
    };
  }

  render() {
    return React.createElement("div", {
      className: "day-layer",
      style: this.getDayStyle()
    }, this.getDayLines());
  }

}
DayLayer.propTypes = {
  numDays: PropTypes.number.isRequired
};
DayLayer.defaultProps = {
  numDays: DEFAULT_NUM_DAYS
};
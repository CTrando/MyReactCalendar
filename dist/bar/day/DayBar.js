import React from 'react';
import "./DayBar.css";
import PropTypes from 'prop-types';
import { startOfWeek, addDays, format } from "date-fns";
export class DayBar extends React.PureComponent {
  getDayBarStyle() {
    return {
      gridTemplateColumns: `min-content repeat(${this.props.numDays}, 1fr)`
    };
  }

  getDayStyle(start) {
    return {
      gridColumn: `${start} / ${start + 1}`
    };
  }

  getDays() {
    const ret = [];
    let curDay = startOfWeek(new Date(), {
      weekStartsOn: 1
    });

    for (let i = 0; i < this.props.numDays; i++) {
      const dayStr = format(curDay, "ddd");
      curDay = addDays(curDay, 1);
      ret.push(React.createElement("div", {
        key: dayStr,
        className: "day",
        style: this.getDayStyle(i + 2)
      }, dayStr));
    }

    return ret;
  }

  render() {
    return React.createElement(React.Fragment, null, this.getDays());
  }

}
DayBar.propTypes = {
  numDays: PropTypes.number.isRequired
};
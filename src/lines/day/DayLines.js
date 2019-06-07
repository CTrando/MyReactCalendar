import React from 'react';
import "./DayLines.css";
import PropTypes from 'prop-types';


export class DayLines extends React.PureComponent {

    getDayLines() {
        const ret = [];
        for (let i = 0; i < this.props.numDays; i++) {
            ret.push((
                <div key={i + "day-line"} className="day-line"
                     onDragOver={(e) => {
                         e.preventDefault();
                     }}
                     // make methods in some other file and export them ad then put them in with EventCalendar too!
                     onDrop={(e) => {
                         console.log(e);
                         console.log("dropped on a day")
                     }}
                     onClick={() => console.log("clicked on a day")}>
                </div>
            ))
        }
        return ret;
    }

    getDayStyle() {
        return {
            display: "grid",
            gridTemplateColumns: `repeat(${this.props.numDays}, 1fr)`,
            height: "100%",
            zIndex: 1
        };
    }

    render() {
        return (
            <div className="day-lines" style={this.getDayStyle()}>
                {this.getDayLines()}
            </div>
        );
    }
}

DayLines.propTypes = {
    numDays: PropTypes.number.isRequired
};

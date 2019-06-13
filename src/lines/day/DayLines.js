import React from 'react';
import "./DayLines.css";
import PropTypes from 'prop-types';


export class DayLines extends React.PureComponent {

    getDayLines() {
        const ret = [];
        for (let i = 0; i < this.props.numDays; i++) {
            ret.push((
                <div key={i + "day-line"} className="day-line"/>
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
            <div className="day-lines"
                 style={this.getDayStyle()}
                 onDragOver={(e) => e.preventDefault()}
                 onClick={this.props.onClick}
                 onDrop={this.props.onEventDrop}>
                {this.getDayLines()}
            </div>
        );
    }
}

DayLines.propTypes = {
    onEventDrop: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    numDays: PropTypes.number.isRequired
};

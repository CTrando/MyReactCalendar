import React from 'react';
import "./DayLayer.css";
import PropTypes from 'prop-types';


export class DayLayer extends React.PureComponent {

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
        };
    }

    render() {
        return (
            <div className="day-layer" style={this.getDayStyle()}>
                {this.getDayLines()}
            </div>
        );
    }
}

DayLayer.propTypes = {
    numDays: PropTypes.number.isRequired
};

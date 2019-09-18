import *  as React from 'react';
import "./DayLayer.css";
import {DEFAULT_NUM_DAYS} from "../../../Constants";

interface DayLayerProps {
    numDays: number
}

/**
 * Renders the borders for the days
 */
export class DayLayer extends React.PureComponent<DayLayerProps> {
    static defaultProps = {
        numDays: DEFAULT_NUM_DAYS
    };

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
            gridTemplateColumns: `repeat(${this.props.numDays}, 1fr)`,
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

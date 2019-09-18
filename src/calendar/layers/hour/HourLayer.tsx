import * as React from 'react';

import "./HourLayer.css"
import {DEFAULT_END_HOUR, DEFAULT_START_HOUR} from "../../../Constants";

interface HourLayerProps {
    startHour: number,
    endHour: number
}

/**
 * Renders the borders for the hours
 */
export class HourLayer extends React.PureComponent<HourLayerProps> {
    static defaultProps = {
        startHour: DEFAULT_START_HOUR,
        endHour: DEFAULT_END_HOUR,
    };

    getHourLines() {
        const ret = [];
        for (let i = this.props.startHour; i < this.props.endHour; i++) {
            const hourTime = `${i}:00`;
            ret.push((
                <div key={hourTime + "hour-line"}
                     className="hour-line"/>
            ))
        }
        return ret;
    }

    getHourLinesStyle() {
        const hours = this.props.endHour - this.props.startHour;
        return {
            gridTemplateRows: `repeat(${hours}, 1fr)`,
        };
    }

    render() {
        return (
            <div className="hour-layer" style={this.getHourLinesStyle()}>
                {this.getHourLines()}
            </div>
        );
    }
}

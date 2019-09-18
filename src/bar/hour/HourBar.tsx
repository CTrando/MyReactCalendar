import * as React from 'react';
import "./HourBar.css";

import {format} from "date-fns";

interface HourBarProps {
    startHour: number,
    endHour: number
}

export class HourBar extends React.PureComponent<any, HourBarProps> {
    getHourStyle(start: number) {
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
            ret.push((
                <React.Fragment key={hourTime}>
                    <div key={hourTime} style={this.getHourStyle(i - this.props.startHour + 2)}
                         className="hour-step-container">
                        <div>
                            {hourTime}
                        </div>
                    </div>
                </React.Fragment>
            ));
        }
        return ret;
    }

    render() {
        return (
            <React.Fragment>
                {this.getHours()}
            </React.Fragment>
        );
    }
}

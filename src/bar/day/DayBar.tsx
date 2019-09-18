import * as React from 'react';
import "./DayBar.css";
import {startOfWeek, addDays, format} from "date-fns";

interface DayBarProps {
    numDays: number,
}

export class DayBar extends React.PureComponent<any, DayBarProps> {
    getDayStyle(start: number) {
        return {
            gridColumn: `${start} / ${start+1}`
        };
    }

    getDays() {
        const ret = [];
        let curDay = startOfWeek(new Date(), {weekStartsOn: 1});
        for (let i = 0; i < this.props.numDays; i++) {
            const dayStr = format(curDay, "ddd");
            curDay = addDays(curDay, 1);
            ret.push(
                <div key={dayStr} className="day" style={this.getDayStyle(i + 2)}>
                    {dayStr}
                </div>
            )
        }
        return ret;
    }

    render() {
        return (
            <React.Fragment>
                {this.getDays()}
            </React.Fragment>
        )
    }
}

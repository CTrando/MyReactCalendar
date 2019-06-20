/**
 * Event layer outer inator!!
 *
 * Will lay out events in the given column
 **/

import {getDay, isBefore} from 'date-fns';
import className from 'classnames';
import React from "react";
import {Resizable} from "../../../../resize/Resizable";

export class EventLayerOuterInator extends React.PureComponent {
    getEventStyle(eventStart, eventEnd, columnIndex, lastColumnIndex) {
        const lastColumn = columnIndex === lastColumnIndex;
        const startTime5MinuteIntervals = Math.floor((eventStart.getHours() - this.props.startHour) * 12) + Math.floor(eventStart.getMinutes() / 5) + 1;
        const endTime5MinuteIntervals = Math.floor((eventEnd.getHours() - this.props.startHour) * 12) + Math.floor(eventEnd.getMinutes() / 5) + 1;

        return {
            gridRow: `${startTime5MinuteIntervals}/${endTime5MinuteIntervals}`,
            gridColumn: `${columnIndex}/${lastColumn ? lastColumnIndex: columnIndex}`,
        }
    }

    /**
     * Returns an array of lists where the indices represent the days and the lists are the events for that specific day
     */
    getEventsByDays() {
        const ret = new Array(5);
        for (let event of this.props.events) {
            // arrays start at 0 so subtract 1 from it since Monday is 1 when I want it to be 0
            let day = getDay(event.props.start) - 1;
            if (!ret[day]) {
                ret[day] = [];
            }
            ret[day].push(event);
        }
        return ret;
    }

    getEventColumnMap(events) {
        // columns is a 2D array storing lists of events per column
        let columns = [];
        for (let event of events) {
            let start = event.props.start;
            let end = event.props.end;

            let curColumn = null;

            for (let column of columns) {
                if (column.length === 0) {
                    break;
                }

                let hasOverlapped;
                for (let eventPerColumn of column) {
                    let compStart = eventPerColumn.props.start;
                    let compEnd = eventPerColumn.props.end;

                    if (isBefore(start, compEnd) && isBefore(compStart, end)) {
                        hasOverlapped = true;
                        break;
                    }
                }

                if (!hasOverlapped) {
                    curColumn = column;
                    break;
                }
            }

            if (curColumn) {
                curColumn.push(event);
            } else {
                columns.push([event]);
            }
        }

        return columns;
    }

    /**
     * Returns divs for each events with the correct row/col start, row/end end
     */
    layoutEventsPerDay(eventColumnMap) {
        const ret = [];

        for (let column = 0; column < eventColumnMap.length; column++) {
            const eventsPerColumn = eventColumnMap[column];

            for (let evt of eventsPerColumn) {
                // adding 1 to column because in CSS arrays start at 1
                const style = this.getEventStyle(evt.props.start, evt.props.end, column + 1, eventColumnMap.length);
                const classNames = className(this.props.eventClassName, "event-wrapper");
                ret.push(
                    <div key={evt.props.id} style={style} className={classNames}>
                        <Resizable onResize={(e, position) => this.props.onEventResize(e, evt.props.id, position)}>
                            <div
                                id={`${evt.props.id}-drag`}
                                key={evt.props.start.toString() + evt.props.end.toString()}

                                draggable={true}
                                onDrag={this.props.onEventDrag.bind(this, evt.props.id)}
                                onDrop={this.props.onEventDrop.bind(this)}
                                // setting data onto dataTransfer so that can recognize what div was dragged on drop
                                onDragStart={this.props.onEventDragStart.bind(this)}
                                onDragOver={this.props.onEventDragOver.bind(this)}
                                style={{height: "100%"}}>

                                {evt}
                            </div>
                        </Resizable>
                    </div>
                );
            }
        }
        return ret;
    }

    getDayStyle(column) {
        const earliestHour = this.props.startHour;
        const latestHour = this.props.endHour;

        const diff = latestHour - earliestHour;
        const diffIn5MinuteIntervals = diff * 12;

        return {
            display: "grid",
            gridTemplateColumns: `repeat(${column}, ${100 / column}%)`,
            gridTemplateRows: `repeat(${diffIn5MinuteIntervals}, 1fr)`,
        };
    }

    layout() {
        const ret = [];
        let eventsByDay = this.getEventsByDays();

        console.log(eventsByDay);

        let idx = 0;
        for (let eventsPerDay of eventsByDay) {
            idx++;
            if (eventsPerDay) {
                // maps for a specific day how many columns are needed to represent them with conflicts
                // so the first column has X events, the second has Y events and so on, and each
                // event should be rendered in its respective column within the certain day
                const eventColumnMap = this.getEventColumnMap(eventsPerDay);
                let styledEvents = this.layoutEventsPerDay(eventColumnMap);
                console.log(styledEvents);
                const styledDays = (
                    <div key={idx} style={this.getDayStyle(eventColumnMap.length)}>
                        {styledEvents}
                    </div>
                );
                ret.push(styledDays);
            } else {
                ret.push(<div/>);
            }
        }
        console.log(ret);
        return ret;
    }

    render() {
        return (
            <React.Fragment>
                {this.layout()}
            </React.Fragment>
        )
    }
}

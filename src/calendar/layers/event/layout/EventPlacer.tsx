/**
 * EventView layer outer inator!!
 *
 * Will lay out events in the given column
 **/

import {differenceInMinutes, getDay, isBefore} from 'date-fns';
import * as React from "react";
import * as className from "classnames";
import {ReactElement} from "react";
import {ResizableEvent} from "../../../../resize/ResizableEvent";
import {Event} from "../../../event/Event";
import {EventViewProps} from "../../../event/EventView";

const NUM_DAYS = 5;
const INTERVALS = 5;
const INTERVALS_PER_HOUR = 60 / INTERVALS;

interface IEventLayerContext {
    startHour: number;
    endHour: number;
    eventClassName: string;

    getEvent(props: EventViewProps): ReactElement;

    onEventDrag(dragEvent: React.DragEvent, evt: Event): void;

    onEventDrop(dropEvent: React.MouseEvent): void;

    onEventDragStart(dragStartEvent: React.DragEvent): void;

    onEventDragOver(dragOverEvent: React.DragEvent): void;

    onEventResize(resizeEvent: React.DragEvent, evt: Event, resizeType: string): void;
}

interface IEventPlacer {
    getEventGridCol(event: Event, eventColumnMap: Event[][], columnIndex: number): string;

    getEventStyle(context: IEventLayerContext, event: Event, eventColumnMap: Event[][], columnIndex: number): object;

    getDayStyle(context: IEventLayerContext, gridColumns: number) : object;

    layout(context: IEventLayerContext, events: Event[]): ReactElement[];

    dayToEvents(events: Event[]): Event[][];

    sortEvents(events: Event[]): Event[];
}

export class EventPlacer implements IEventPlacer {
    /**
     * Returns the event column style inside a day
     *
     * e.g
     * Given E1, E2, E3, E4 we calculate such that the result is:
     *
     * E1 E2 E3
     * E1 E2
     * E1 E4 E4
     *
     * This method handles the internal styling of each event so the grid works out
     */
    getEventGridCol(event: Event, eventColumnMap: Array<Array<Event>>, columnIndex: number): string {
        // start endIndex one more than column index because if
        // we start with column index, it will immediately conflict with itself
        // in its own column
        let endIndex = columnIndex + 1;
        for (; endIndex < eventColumnMap.length; endIndex++) {
            const eventsPerColumn = eventColumnMap[endIndex];

            // check if events in the next column are contained by our current column
            // if so, then we cannot extend our current event anymore so return early
            if (eventsPerColumn.some((e) => this.isContainedBy(e, event))) {
                return `${columnIndex + 1}/${endIndex}`;
            }
        }

        // event can extend all the way to the end because no events were contained by it
        return `${columnIndex + 1}/${eventColumnMap.length + 1}`;
    }

    /**
     * Gets the styling for the events, including row style and column style
     */
    getEventStyle(context: IEventLayerContext, event: Event, eventColumnMap: Array<Array<Event>>, columnIndex: number): object {
        const eventStart = event.start;
        const eventEnd = event.end;
        const gridCol = this.getEventGridCol(event, eventColumnMap, columnIndex);

        const startTime5MinuteIntervals = Math.floor((eventStart.getHours() - context.startHour) * INTERVALS_PER_HOUR)
            + Math.floor(eventStart.getMinutes() / INTERVALS) + 1;
        const endTime5MinuteIntervals = Math.floor((eventEnd.getHours() - context.startHour) * INTERVALS_PER_HOUR)
            + Math.floor(eventEnd.getMinutes() / INTERVALS) + 1;

        return {
            gridRow: `${startTime5MinuteIntervals}/${endTime5MinuteIntervals}`,
            gridCol: gridCol,
        };
    }

    /**
     * Returns whether evt1 is contained by evt2
     */
    isContainedBy(evt1: Event, evt2: Event) {
        return isBefore(evt2.start, evt1.start) && isBefore(evt1.end, evt2.end);
    }

    /**
     * Returns an array of lists where the indices represent the days and the lists are the events for that specific day
     */
    dayToEvents(events: Event[]): Event[][] {
        const ret = new Array(NUM_DAYS);
        for (let event of events) {
            // arrays start at 0 so subtract 1 from it since Monday is 1 when I want it to be 0
            let day = getDay(event.start) - 1;
            if (!ret[day]) {
                ret[day] = [];
            }
            ret[day].push(event);
        }
        for (let i = 0; i < ret.length; i++) {
            ret[i] = this.sortEvents(ret[i]);
        }
        return ret;
    }

    /**
     * Takes an array of events per day, for example all events for Monday and then arranges them such that
     * they would be most optimally shown in columns in the case that some of them may collide
     *
     * e.g.
     *
     * E1 E2
     *    E2
     *
     * Would return an array with two elements for the two columns, and each column would have a list of events
     * for them.
     *
     * @param events array of events per a day
     */
    layoutEventsIntoGridColumns(events: Event[]) {
        // columns is a 2D array storing lists of events per grid column
        let columns = [];

        // for each event we will determine what column we should put it in
        for (let event of events) {
            let curColumn = null;

            // loop over the existing columns
            for (let column of columns) {
                if (column.length === 0) {
                    break;
                }

                // if the given event is not contained by any of the events in the column
                // then we can safely place down the event in that column
                let shouldPlaceInCol = column.every((eventPerColumn) => !this.isContainedBy(event, eventPerColumn));

                if (shouldPlaceInCol) {
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

    createEventViewProps(context: IEventLayerContext, event: Event): EventViewProps {
        return {
            event: event,
            onEventDrag: context.onEventDrag,
            onEventDrop: context.onEventDrop,
            onEventDragStart: context.onEventDragStart,
            onEventDragOver: context.onEventDragOver
        }
    }

    /**
     * Given event grid column map, essentially within one day, e.g Monday, how many grid columns are needed to
     * represent the events without their components overlapping
     *
     * Returns divs for each events with the correct row/col start, row/end end
     */
    styleEventsInGridColumns(context: IEventLayerContext, eventGridColumnMap: Event[][]) {
        const ret = [];

        for (let column = 0; column < eventGridColumnMap.length; column++) {
            const eventsPerColumn = eventGridColumnMap[column];

            for (let evt of eventsPerColumn) {
                const style = this.getEventStyle(context, evt, eventGridColumnMap, column);
                const classNames = className(context.eventClassName, "event-wrapper");

                // user will determine what kind of component to render based on the information given here
                const eventProps = this.createEventViewProps(context, evt);
                const userComponent = context.getEvent(eventProps);

                ret.push(
                    <div key={evt.id} style={style} className={classNames}>
                        <ResizableEvent active={evt.resize}
                                        evt={evt}
                                        onEventResize={context.onEventResize}>
                            {userComponent}
                        </ResizableEvent>
                    </div>
                );
            }
        }
        return ret;
    }

    getDayStyle(context: IEventLayerContext, gridColumns: number) : object {
        const earliestHour = context.startHour;
        const latestHour = context.endHour;

        const diff = latestHour - earliestHour;
        const diffIn5MinuteIntervals = diff * INTERVALS_PER_HOUR;

        return {
            display: "grid",
            gridTemplateColumns: `repeat(${gridColumns}, ${100 / gridColumns}%)`,
            gridTemplateRows: `repeat(${diffIn5MinuteIntervals}, 1fr)`,
        };
    }

    /**
     * Sort events by duration - longest duration first
     */
    sortEvents(events: Event[]): Event[] {
        if (!events) {
            return events;
        }

        return events.sort((e1, e2) => {
            let e1duration = differenceInMinutes(e1.start, e1.end);
            let e2duration = differenceInMinutes(e2.start, e2.end);

            return e1duration - e2duration;
        });
    }

    layout(context: IEventLayerContext, events: Event[]): ReactElement[] {
        const ret = [];
        let dayToEvents = this.dayToEvents(events);

        let idx = 0;
        for (let eventsPerDay of dayToEvents) {
            idx++;
            if (eventsPerDay) {
                // maps for a specific day how many columns are needed to represent them with conflicts
                // so the first column has X events, the second has Y events and so on, and each
                // event should be rendered in its respective grid column within the certain day
                const eventGridColumnMap = this.layoutEventsIntoGridColumns(eventsPerDay);
                const styledEvents = this.styleEventsInGridColumns(context, eventGridColumnMap);

                // put the styled events into one day column
                const styledDays = (
                    <div key={idx} style={this.getDayStyle(context, eventGridColumnMap.length)}>
                        {styledEvents}
                    </div>
                );

                ret.push(styledDays);
            } else {
                // no events push blank column
                ret.push(<div key={idx}/>);
            }
        }
        return ret;
    }
}

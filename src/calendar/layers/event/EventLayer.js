import React from 'react';
import PropTypes from 'prop-types';
import {differenceInCalendarDays, startOfWeek} from "date-fns";
import {Resizable} from "../../../resize/Resizable";

export class EventLayer extends React.PureComponent {
    onDragOver(e) {
        e.preventDefault();
    }

    onDragStart(e) {
        e.dataTransfer.setData('text', JSON.stringify({
            mouseY: e.clientY,
            id: e.target.id
        }));
    }

    getEventStyle(eventStart, eventEnd) {
        let backgroundColor = "grey";

        const referenceStart = startOfWeek(eventStart, {weekStartsOn: 1});
        const eventColStart = differenceInCalendarDays(eventStart, referenceStart) + 1;
        const eventColEnd = differenceInCalendarDays(eventEnd, referenceStart) + 1;

        const startTime5MinuteIntervals = Math.floor((eventStart.getHours() - this.props.startHour) * 12) + Math.floor(eventStart.getMinutes() / 5) + 1;
        const endTime5MinuteIntervals = Math.floor((eventEnd.getHours() - this.props.startHour) * 12) + Math.floor(eventEnd.getMinutes() / 5) + 1;

        if (eventColStart !== eventColEnd)
            backgroundColor = "red";


        return {
            position: "relative",
            backgroundColor: backgroundColor,
            gridRow: `${startTime5MinuteIntervals}/${endTime5MinuteIntervals}`,

            // only support events that start and end on the same day, so can just use one
            gridColumn: `${eventColStart}/${eventColEnd}`,
            border: "1px solid white",
            zIndex: 10,
            height: "100%"
        }
    }

    getEvents() {
        return this.props.events.map((evt) => {
            const style = this.getEventStyle(evt.props.start, evt.props.end);
            // TODO consider cloning all the functions into the evt component and then having the component rendering itself how it wants
            return (
                <div key={evt.props.id} style={style}>
                    <Resizable onResize={(e, position) => this.props.onEventResize(e, evt.props.id, position)}>
                        <div
                            id={`${evt.props.id}-drag`}
                            key={evt.props.start.toString() + evt.props.end.toString()}

                            draggable={true}
                            onDrag={(e) => this.props.onEventDrag(e, evt.props.id)}
                            onDrop={this.props.onEventDrop.bind(this)}
                            // setting data onto dataTransfer so that can recognize what div was dragged on drop
                            onDragStart={this.onDragStart.bind(this)}
                            onDragOver={this.onDragOver.bind(this)}
                            style={{height: "100%"}}>

                            {evt}
                        </div>
                    </Resizable>
                </div>
            );
        });
    }

    getEventCalendarStyle() {
        const earliestHour = this.props.startHour;
        const latestHour = this.props.endHour;

        const diff = latestHour - earliestHour;
        const diffIn5MinuteIntervals = diff * 12;

        return {
            gridTemplateRows: `repeat(${diffIn5MinuteIntervals}, 1fr)`,
            gridTemplateColumns: `repeat(${this.props.numDays}, minmax(20px, 1fr))`
        }
    }

    render() {
        return (
            <div style={this.getEventCalendarStyle()} className="event-calendar">
                {this.getEvents()}
            </div>
        )
    }
}

EventLayer.defaultProps = {
    onEventDrag: () => {},
    onEventResize: () => {},
    onEventDrop: () => {},
};

EventLayer.propTypes = {
    events: PropTypes.array.isRequired,
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
    numDays: PropTypes.number.isRequired,
    onEventDrag: PropTypes.func,
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func
};
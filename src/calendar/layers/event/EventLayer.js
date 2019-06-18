import React from 'react';
import PropTypes from 'prop-types';
import {differenceInCalendarDays, startOfWeek} from "date-fns";
import {Resizable} from "../../../resize/Resizable";
import "./EventLayer.css";
import className from 'classnames';
import {EventLayerOuterInator, layout} from "./layout/EventLayerOuter";

export class EventLayer extends React.PureComponent {
    onEventDrag(id, evt) {
        this.props.onEventDrag(evt, id, this.props.name);
    }

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
        const referenceStart = startOfWeek(eventStart, {weekStartsOn: 1});
        const eventColStart = differenceInCalendarDays(eventStart, referenceStart) + 1;
        const eventColEnd = differenceInCalendarDays(eventEnd, referenceStart) + 1;

        const startTime5MinuteIntervals = Math.floor((eventStart.getHours() - this.props.startHour) * 12) + Math.floor(eventStart.getMinutes() / 5) + 1;
        const endTime5MinuteIntervals = Math.floor((eventEnd.getHours() - this.props.startHour) * 12) + Math.floor(eventEnd.getMinutes() / 5) + 1;

        return {
            gridRow: `${startTime5MinuteIntervals}/${endTime5MinuteIntervals}`,
            gridColumn: `${eventColStart}/${eventColEnd}`,
        }
    }

    getEvents() {
        return this.props.events.map((evt) => {
            const style = this.getEventStyle(evt.props.start, evt.props.end);
            const classNames = className(this.props.eventClassName, "event-wrapper");
            // TODO consider cloning all the functions into the evt component and then having the component rendering itself how it wants
            return (
                <div key={evt.props.id} style={style} className={classNames}>
                    <Resizable onResize={(e, position) => this.props.onEventResize(e, evt.props.id, position)}>
                        <div
                            id={`${evt.props.id}-drag`}
                            key={evt.props.start.toString() + evt.props.end.toString()}

                            draggable={true}
                            onDrag={this.onEventDrag.bind(this, evt.props.id)}
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
        return {
            gridTemplateColumns: `repeat(${this.props.numDays}, minmax(20px, 1fr))`
        }
    }

    render() {
        return (
            <div style={this.getEventCalendarStyle()} className="event-layer">
                <EventLayerOuterInator
                    events={this.props.events}
                    startHour={this.props.startHour}
                    endHour={this.props.endHour}

                    eventClassName={this.props.eventClassName}
                    onEventDragStart={this.onDragStart.bind(this)}
                    onEventDragOver={this.onDragOver.bind(this)}
                    onEventDrag={this.onEventDrag.bind(this)}
                    onEventDrop={this.props.onEventDrop.bind(this)}
                    onEventResize={this.props.onEventResize.bind(this)}
                />
            </div>
        )
    }
}

EventLayer.defaultProps = {
    onEventDrag: () => {
    },
    onEventResize: () => {
    },
    onEventDrop: () => {
    },
};

EventLayer.propTypes = {
    name: PropTypes.string.isRequired,
    eventClassName: PropTypes.string,

    events: PropTypes.array.isRequired,
    startHour: PropTypes.number.isRequired,
    endHour: PropTypes.number.isRequired,
    numDays: PropTypes.number.isRequired,

    onEventDrag: PropTypes.func,
    onEventDrop: PropTypes.func,
    onEventResize: PropTypes.func
};

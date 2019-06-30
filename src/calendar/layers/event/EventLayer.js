import React from 'react';
import PropTypes from 'prop-types';
import "./EventLayer.css";
import {EventLayerOuterInator} from "./layout/EventLayerOuter";

export class EventLayer extends React.PureComponent {
    onEventDrag(id, evt) {
        this.props.onEventDrag(evt, id, this.props.name);
    }

    onEventDragOver(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    onEventDragStart(e) {
        e.dataTransfer.setData('text', JSON.stringify({
            mouseY: e.clientY,
            id: e.target.id
        }));
    }

    getEventCalendarStyle() {
        return {
            gridTemplateColumns: `repeat(${this.props.numDays}, minmax(20px, 1fr))`
        }
    }

    render() {
        const props = Object.assign({}, this.props, {
            // redefine prop functions with current functions which have bounded arguments
            onEventDrag: this.onEventDrag.bind(this),
            onEventDragOver: this.onEventDragOver.bind(this),
            onEventDragStart: this.onEventDragStart.bind(this)
        });

        // can just pass down the props
        const styledEvents = (
            <EventLayerOuterInator {...props} />
        );

        return (
            <div style={this.getEventCalendarStyle()} className="event-layer">
                {styledEvents}
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

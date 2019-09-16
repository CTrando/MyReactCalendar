import React from 'react';
import PropTypes from 'prop-types';
import "./EventLayer.css";
import { EventLayerOuterInator } from "./layout/EventLayerOuter";
export class EventLayer extends React.PureComponent {
  /**
   * Called when event is dragged, is a closure that appends the layer name
   */
  onEventDrag(id, evt) {
    this.props.onEventDrag(evt, id, this.props.name);
  }
  /**
   * Gets the style for the specific layer
   */


  getEventCalendarStyle() {
    return {
      gridTemplateColumns: `repeat(${this.props.numDays}, minmax(20px, 1fr))`
    };
  }

  render() {
    const props = Object.assign({}, this.props, {
      // redefine prop functions with current functions which have bounded arguments
      onEventDrag: this.onEventDrag.bind(this)
    }); // can just pass down the props

    const styledEvents = React.createElement(EventLayerOuterInator, props);
    return React.createElement("div", {
      style: this.getEventCalendarStyle(),
      className: "event-layer"
    }, styledEvents);
  }

}
EventLayer.defaultProps = {
  onEventDrag: () => {},
  onEventResize: () => {},
  onEventDrop: () => {},
  onEventDragOver: e => {
    e.stopPropagation();
    e.preventDefault();
  },
  onEventDragStart: e => {
    e.dataTransfer.setData('text', JSON.stringify({
      mouseY: e.clientY,
      id: e.target.id
    }));
    e.stopPropagation();
  }
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
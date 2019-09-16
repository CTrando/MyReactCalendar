import React from 'react';
import PropTypes from 'prop-types';
import "./EventCalendar.css";
import { DayLayer } from "../layers/day/DayLayer";
import { HourLayer } from "../layers/hour/HourLayer";
import { decodeEvent, decodeEventRespectElement } from "../../decoder/MouseDecoder";
import { InputLayer } from "../layers/input/InputLayer";
import { EventLayer } from "../layers/event/EventLayer";
import { DEFAULT_END_HOUR, DEFAULT_NUM_DAYS, DEFAULT_START_HOUR } from "../../Constants";
const RESIZE = "resize";
const DRAG = "drag";
export class EventCalendar extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      draggedEvent: null,
      dragType: null,
      dragLayer: null
    };
  }
  /**
   * Called when a user clicks anywhere on the event calendar
   * @param evt the click event
   */


  onCalendarClick(evt) {
    const timeClickedOn = decodeEvent(evt, this.props.numDays, this.props.startHour, this.props.endHour);
    this.props.onCalendarClick(timeClickedOn);
  }
  /**
   * Called when a user starts dragging an event on the event calendar anywhere
   * @param evt the drag event
   * @param key the unique key for the given event
   * @param layerName the name of which layer the event should be dragged on
   */


  onEventDrag(evt, key, layerName) {
    this.setState({
      draggedEvent: key,
      dragType: DRAG,
      dragLayer: layerName
    });
  }
  /**
   * Called when an event is dropped, finds what time the event was dropped on and then
   * calls callback from props with params
   * @param evt
   */


  onEventDrop(evt) {
    if (this.state.dragType !== DRAG) return;

    try {
      const timeEventDroppedOn = decodeEventRespectElement(evt, this.props.numDays, this.props.startHour, this.props.endHour);
      if (this.state.draggedEvent && timeEventDroppedOn) this.props.onEventDrop(this.state.draggedEvent, this.state.dragLayer, timeEventDroppedOn);
    } catch (error) {
      console.warn(error);
    }
  }
  /**
   * Calls resize event passed in from props
   * @param evt the event object
   * @param key the unique key for the event
   * @param resizeType whether the resize occurred at the start or the end
   */


  onEventResize(evt, key, resizeType) {
    // TODO consider adding a delay here so this doesn't get called so often
    this.setState({
      draggedEvent: key,
      dragType: RESIZE
    });
    const timeEventDroppedOn = decodeEvent(evt, this.props.numDays, this.props.startHour, this.props.endHour);
    if (timeEventDroppedOn && this.props.onEventResize) this.props.onEventResize(key, timeEventDroppedOn, resizeType);
    evt.stopPropagation();
  }
  /**
   * Generates the style for the event calendar based on the number of days, start hour and end hour
   */


  getEventCalendarWrapperStyle() {
    return {
      gridColumn: `2 / ${this.props.numDays + 2}`,
      gridRow: `2 / ${this.props.endHour - this.props.startHour + 2}`
    };
  }

  render() {
    // TODO support passing in an object mapping layername to layer properties such as events, classnames etc
    const eventLayers = this.props.layers.map(layer => {
      return React.createElement(EventLayer, {
        key: layer.name,
        eventClassName: layer.eventClassName,
        getEvent: this.props.getEvent,
        name: layer.name,
        events: layer.events,
        startHour: this.props.startHour,
        endHour: this.props.endHour,
        numDays: this.props.numDays,
        onEventDrag: this.onEventDrag.bind(this),
        onEventDrop: this.onEventDrop.bind(this),
        onEventResize: this.onEventResize.bind(this)
      });
    });
    return React.createElement("div", {
      id: "event-calendar",
      className: "event-calendar",
      style: this.getEventCalendarWrapperStyle()
    }, React.createElement(HourLayer, {
      startHour: this.props.startHour,
      endHour: this.props.endHour
    }), React.createElement(DayLayer, {
      numDays: this.props.numDays
    }), React.createElement(InputLayer, {
      onDoubleClick: this.onCalendarClick.bind(this),
      onEventDrop: this.onEventDrop.bind(this)
    }), eventLayers);
  }

}
EventCalendar.propTypes = {
  startHour: PropTypes.number,
  endHour: PropTypes.number,
  numDays: PropTypes.number,
  onEventDrop: PropTypes.func,
  onEventResize: PropTypes.func,
  onCalendarClick: PropTypes.func,
  layers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    events: PropTypes.arrayOf(PropTypes.object),
    eventClassName: PropTypes.string
  }))
};
EventCalendar.defaultProps = {
  startHour: DEFAULT_START_HOUR,
  endHour: DEFAULT_END_HOUR,
  numDays: DEFAULT_NUM_DAYS,
  onEventDrop: () => {},
  onEventResize: () => {},
  onCalendarClick: () => {},
  layers: []
};
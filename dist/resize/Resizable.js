import React from 'react';
import "./Resizable.css";
import PropTypes from 'prop-types';
export const END = "end";
export const START = "start";
export class Resizable extends React.PureComponent {
  startResize(e) {
    this.props.onResize(e, START);
  }

  endResize(e) {
    this.props.onResize(e, END);
  }

  getStartResize() {
    if (!this.props.active) return null;
    return React.createElement("div", {
      draggable: true,
      key: this.props.id + "resize-start",
      className: "resize-widget resize-widget-start",
      onDragOver: e => e.preventDefault(),
      onDrag: this.startResize.bind(this)
    });
  }

  getEndResize() {
    if (!this.props.active) return null;
    return React.createElement("div", {
      draggable: true,
      key: this.props.id + "resize-end",
      className: "resize-widget resize-widget-end",
      onDragOver: e => e.preventDefault(),
      onDrag: this.endResize.bind(this)
    });
  }

  render() {
    return React.createElement("div", {
      className: "resize-context"
    }, this.getStartResize(), this.props.children, this.getEndResize());
  }

}
Resizable.defaultProps = {
  onResize: () => {},
  active: true,
  id: "test"
};
Resizable.propTypes = {
  onResize: PropTypes.func,
  active: PropTypes.bool,
  id: PropTypes.string
};
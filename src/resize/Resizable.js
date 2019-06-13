import React from 'react';
import "./Resizable.css";
import PropTypes from 'prop-types';

export const END = "end";
export const START = "start";

export class Resizable extends React.PureComponent {

    getStartResize() {
        return (
            <button draggable={true} className="resize-widget resize-widget-start" onDrag={(e) => this.props.onResize(e, START)} />
        )
    }

    getEndResize() {
        return (
            <button draggable={true} className="resize-widget resize-widget-end" onDrag={(e) => this.props.onResize(e, END)} />
        )
    }

    render() {
        return (
            <div className="resize-context">
                {this.getStartResize()}
                {this.props.children}
                {this.getEndResize()}
            </div>
        )
    }
}


Resizable.propTypes = {
    onResize: PropTypes.func.isRequired
};

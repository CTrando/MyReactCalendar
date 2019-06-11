import React from 'react';
import "./Resizable.css";
import PropTypes from 'prop-types';

export const RESIZE = "resize";

export class Resizable extends React.PureComponent {

    getResizeWidget() {
        return (
            <button draggable={true} className="resize-widget" onDrag={this.props.onResize} />
        )
    }

    render() {

        return (
            <div className="resize-context">
                {this.props.children}
                {this.getResizeWidget()}
            </div>
        )
    }
}


Resizable.propTypes = {
    onResize: PropTypes.func.isRequired
};

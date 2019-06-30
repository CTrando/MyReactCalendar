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
        return (
            <div draggable={true}
                    className="resize-widget resize-widget-start"
                    onDrag={this.startResize.bind(this)}
                    onDragOver={this.props.onDragOver.bind(this)}
                    onDrop={this.props.onDrop.bind(this)}
            />
        )
    }

    getEndResize() {
                console.log(this.props);
        return (
            <div draggable={true}
                    className="resize-widget resize-widget-end"
                    onDrag={this.endResize.bind(this)}
                    onDragOver={this.props.onDragOver.bind(this)}
                    onDrop={this.props.onDrop.bind(this)}
            />
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

Resizable.defaultProps = {
    onResize: () => {
    },
    onDrop: () => {
    },
    onDragOver: () => {
    }
};

Resizable.propTypes = {
    onResize: PropTypes.func,
    onDrop: PropTypes.func,
    onDragOver: PropTypes.func
};

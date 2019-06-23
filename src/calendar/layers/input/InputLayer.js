import React from 'react';
import PropTypes from 'prop-types';

import "./InputLayer.css";

export class InputLayer extends React.PureComponent {

    render() {
        return (
            <div className="input-layer"
                 onDoubleClick={this.props.onDoubleClick}
                 onDrop={this.props.onEventDrop}
                 onDragOver={this.props.onEventDragOver}
            />
        );
    }
}

InputLayer.defaultProps = {
    onDoubleClick: () => {
    },
    onEventDrop: () => {
    },
    onEventDragOver: (e) => e.preventDefault(),
};

InputLayer.propTypes = {
    onDoubleClick: PropTypes.func,
    onEventDrop: PropTypes.func,
};

import React from 'react';
import PropTypes from 'prop-types';

import "./InputLayer.css";

export class InputLayer extends React.PureComponent {

    render() {
        return (
            <div className="input-layer"
                 onDoubleClick={this.props.onDoubleClick}
                 onDrop={this.props.onDrop}
                 onDragOver={this.props.onDragOver}
            />
        );
    }
}

InputLayer.defaultProps = {
    onDoubleClick: () => {
    },
    onDrop: () => {
    },
    onDragOver: (e) => e.preventDefault(),
};

InputLayer.propTypes = {
    onDoubleClick: PropTypes.func,
    onDrop: PropTypes.func,
};

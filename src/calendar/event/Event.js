import React from 'react';
import PropTypes from 'prop-types';

export class Event extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }
    /**
     * Returns a renderable react component
     */
    render() {
        return (
            <div onDoubleClick={(e) => this.setState({editing: true})} style={{height: "100%", backgroundColor: "grey"}}>
                {this.state.editing && <div>hello </div>}
                how are you
            </div>
        )
    }
}

Event.propTypes = {
    id: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
};

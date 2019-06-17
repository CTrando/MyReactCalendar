import React from 'react';
import PropTypes from 'prop-types';
import {format} from 'date-fns';

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
        const startFormatted = format(this.props.start, 'h:mma');
        const endFormatted = format(this.props.end, 'h:mma');

        const formatStr = `${startFormatted}-${endFormatted}`;
        return (
            <div onDoubleClick={(e) => this.setState({editing: true})}
                 style={{height: "100%"}}>
                {this.state.editing && <div>hello </div>}
                <div>how are you</div>
                <div>{formatStr}</div>
            </div>
        )
    }
}

Event.propTypes = {
    id: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,
};

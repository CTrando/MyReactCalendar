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

    onResize(e, position) {
        this.props.onEventResize(e, this.props.id, position)
    }

    /**
     * Returns a renderable react component
     */
    render() {
        const startFormatted = format(this.props.start, 'h:mma');
        const endFormatted = format(this.props.end, 'h:mma');

        const formatStr = `${startFormatted}-${endFormatted}`;

        return (
            <div
                id={`${this.props.id}-drag`}
                key={this.props.start.toString() + this.props.end.toString()}

                draggable={true}
                onDrag={this.props.onEventDrag.bind(this, this.props.id)}
                onDrop={this.props.onEventDrop.bind(this)}
                // setting data onto dataTransfer so that can recognize what div was dragged on drop
                onDragStart={this.props.onEventDragStart.bind(this)}
                onDragOver={this.props.onEventDragOver.bind(this)}
                style={{height: "100%"}}>

                <div onDoubleClick={(e) => this.setState({editing: true})}
                     style={{height: "100%"}}>
                    {this.state.editing && <div>hello </div>}
                    <div>how are you</div>
                    <div>{formatStr}</div>
                </div>
            </div>
        )
    }
}

Event.propTypes = {
    id: PropTypes.string.isRequired,
    start: PropTypes.instanceOf(Date).isRequired,
    end: PropTypes.instanceOf(Date).isRequired,

    onEventDrag: PropTypes.func.isRequired,
    onEventDrop: PropTypes.func.isRequired,
    onEventDragStart: PropTypes.func.isRequired,
    onEventDragOver: PropTypes.func.isRequired,
    onEventResize: PropTypes.func.isRequired,
};

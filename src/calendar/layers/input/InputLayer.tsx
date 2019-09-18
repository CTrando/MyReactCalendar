import * as React from 'react';

import "./InputLayer.css";

type InputLayerProps = {
    onEventDrop(evt: React.DragEvent<HTMLDivElement>): void;
    onDoubleClick(event: any): void;
    onEventDragOver(event: any): void;
};

export class InputLayer extends React.PureComponent<InputLayerProps> {
    static defaultProps = {
        onEventDrop: () => {},
        onDoubleClick: () => {},
        onEventDragOver: (e: any) => e.preventDefault(),
    };

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

import {Event} from "../event/Event";

export interface Layer {
    name: string;
    events: Event[];
    eventClassName: string;
}

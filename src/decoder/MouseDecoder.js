import {setHours, setMinutes, setSeconds, setDay} from 'date-fns';

export function decodeEvent(evt, numDays, startHour, endHour) {
    return decodeEvent0(evt, evt.clientX, evt.clientY, numDays, startHour, endHour);
}

/**
 * Returns the hour and day of where the click occurred
 */
function decodeEvent0(evt, clientX, clientY, numDays, startHour, endHour) {
    const calendar = document.getElementById("event-calendar");
    const boundingBox = calendar.getBoundingClientRect();

    // x is px for days
    const x = clientX - boundingBox.left; //x position within the element.

    // y is px for hours
    const y = clientY - boundingBox.top;

    if(x < 0 || y < 0) {
        console.error("Somehow could not decode event, event is" + evt);
        return undefined;
    }

    const numHours = endHour - startHour;

    const minuteIntervals = Math.floor(y / boundingBox.height * numHours * 12);
    const hours = Math.floor(minuteIntervals / 12);
    const minutes = 5 * (minuteIntervals % 12);

    const gridCol = Math.floor(x / boundingBox.width * numDays);

    return setHours(setMinutes(setSeconds(setDay(new Date(), gridCol + 1), 0), minutes), hours + startHour);
}

/**
 * Returns hour and day relative to top of target element
 */

export function decodeEventRespectElement(evt, numDays, startHour, endHour) {
    const data = JSON.parse(evt.dataTransfer.getData('text'));
    const droppedEl = document.getElementById(data.id);
    let newY = evt.clientY + droppedEl.getBoundingClientRect().top - data.mouseY;

    return decodeEvent0(evt, evt.clientX, newY, numDays, startHour, endHour);
}

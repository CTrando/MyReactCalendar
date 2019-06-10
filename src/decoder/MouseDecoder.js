import {setHours, setMinutes, setSeconds, setDay} from 'date-fns';

/**
 * Returns the hour and day of where the click occurred
 */
export function decodeEvent(evt, numDays, startHour, endHour) {
    const calendar = document.getElementById("event-calendar");
    const boundingBox = calendar.getBoundingClientRect();

    // x is px for days
    const x = evt.clientX - boundingBox.left; //x position within the element.

    // y is px for hours
    const y = evt.clientY - boundingBox.top;

    const numHours = endHour - startHour;

    const minuteIntervals = Math.floor(y / boundingBox.height * numHours * 12);
    const hours = Math.floor(minuteIntervals / 12);
    const minutes = 5 * (minuteIntervals % 12);

    const gridCol = Math.floor(x / boundingBox.width * numDays);

    return setHours(setMinutes(setSeconds(setDay(new Date(), gridCol + 1), 0), minutes), hours + startHour);
}

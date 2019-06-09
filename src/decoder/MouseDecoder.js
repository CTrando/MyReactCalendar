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

    const gridRow = Math.floor(y / boundingBox.height * numHours);
    const gridCol = Math.floor(x / boundingBox.width * numDays);

    // TODO convert this to an actual date object
    return {
        day: gridCol + 1,
        hour: gridRow + startHour
    }
}

const isEventDuplicated = (newEvent, currentEvents) => {
  const { day, time } = newEvent;
  const duplicate = currentEvents.find(
    (event) => event.day === day && event.time === time
  );
  return duplicate === undefined ? false : true;
};

const isValid = (eventText, participants, day, time) => {
  if (
    eventText.checkValidity() &&
    participants.checkValidity() &&
    day.checkValidity() &&
    time.checkValidity()
  ) {
    return true;
  }
  return false;
};

const deleteAllEvents = (events) => {
  events.map((event) => {
    const { day, time } = event;
    const cellClass = `cell-${day}-${time}`;
    const cell = document.querySelector(`#${cellClass}`);
    cell.innerHTML = '';
    cell.classList.remove('event');
    cell.setAttribute('draggable', false);
  });
};

export { isEventDuplicated, isValid, deleteAllEvents };

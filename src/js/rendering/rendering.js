const renderFilteredEvents = (events) => {
  return events.map((event) => {
    const { eventText, day, time } = event;
    const cellClass = `cell-${day}-${time}`;
    const cell = document.querySelector(`.${cellClass}`);
    cell.innerHTML = `<div id="${cellClass}" draggable="true">
      ${eventText}
      <button type="button" id="delete-event" class="close" aria-label="Close">
        <span class="delete-event">&times;</span>
      </button></div>`;
    cell.firstElementChild.classList.add('event');
  });
};

const renderFilteredEventsForUser = (events) => {
  return events.map((event) => {
    const { eventText, day, time } = event;
    const cellClass = `cell-${day}-${time}`;
    const cell = document.querySelector(`.${cellClass}`);
    cell.innerHTML = `<div id="${cellClass}">
      ${eventText}
      <button type="button" id="delete-event" class="close" aria-label="Close">
      </button></div>`;
    cell.firstElementChild.classList.add('event');
  });
};

const renderEvent = (event) => {
  const { eventText, day, time } = event;
  const cellClass = `cell-${day}-${time}`;
  const cell = document.querySelector(`.${cellClass}`);
  cell.innerHTML = `<div id="${cellClass}" draggable="true">
      ${eventText}
      <button type="button" id="delete-event" class="close" aria-label="Close">
        <span class="delete-event">&times;</span>
      </button></div>`;
  cell.firstElementChild.classList.add('event');
};

const showCalendarContainer = (calendarContainer, newEventContainer) => {
  calendarContainer.classList.remove('hidden');
  newEventContainer.classList.add('hidden');
};

export {
  renderFilteredEvents,
  renderEvent,
  showCalendarContainer,
  renderFilteredEventsForUser,
};

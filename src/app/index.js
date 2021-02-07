//import './styles/main.scss';
import '../style/main.scss';
const startApplication = () => {
  const cancelButton = document.querySelector('#cancel');
  const filter = document.querySelector('.custom-select');
  const table = document.querySelector('.table');
  const alert = document.querySelector('.alert-danger');
  const eventText = document.querySelector('#inputNameEvent');
  const form = document.querySelector('#form');
  const day = document.querySelector('#day');
  const time = document.querySelector('#time');
  const participants = document.querySelector('#participants');
  const newEvent = document.querySelector('.new-event');
  const confirmDelete = document.querySelector('.confirm-delete');
  const calendarContainer = document.querySelector('.container-calendar');
  const newEventContainer = document.querySelector('.container-newEvent');

  const currentEvents = [];

  const onSubmitCreateButton = (event) => {
    event.preventDefault();
    if (!isValid(eventText, participants, day, time)) {
      return;
    }
    const participantsValue = document
      .querySelector('.filter-option-inner-inner')
      .innerText.split(', ');

    const newEvent = {
      eventText: eventText.value,
      participants: participantsValue,
      day: day.value,
      time: time.value,
    };

    if (isEventDuplicated(newEvent)) {
      alert.classList.remove('hidden');
      return;
    }

    currentEvents.push(newEvent);
    renderEvent(newEvent);
    showCalendarContainer();
  };

  const onClickNewEventButton = () => {
    form.reset();
    alert.classList.add('hidden');
    // document.querySelector('.filter-option-inner-inner').innerText =
    //   'Nothing selected';
    $('.selectpicker').selectpicker('deselectAll');
    calendarContainer.classList.add('hidden');
    newEventContainer.classList.remove('hidden');
  };

  const onClickDeleteEvent = (event) => {
    if (event.target.className != 'delete-event') return;
    const cell = event.target.closest('.event');
    const cellClass = cell.classList[0].split('-');
    const cellEventText = document.querySelector(
      `.cell-${cellClass[1]}-${cellClass[2]}`
    ).firstChild.data;
    console.log(cellEventText);
    const index = currentEvents.findIndex((event) => {
      if (event.day === cellClass[1] && event.time === cellClass[2]) {
        return event;
      }
      return;
    });
    document.querySelector(
      '.modal-body'
    ).innerText = `Are you sure you want to delete "${cellEventText.trim()}" event?`;

    confirmDelete.addEventListener('click', () => {
      $('.modal').modal('hide');
      currentEvents.splice(index, 1);
      cell.innerHTML = '';
      cell.classList.remove('event');
    });
  };

  const onClickFilterParticipant = () => {
    const filteredEvents = currentEvents.filter((event) => {
      if (event.participants.includes(filter.value)) {
        return event;
      }
      return;
    });
    deleteAllEvents(currentEvents);
    if (filter.value === 'All members') {
      return renderFilteredEvents(currentEvents);
    }
    renderFilteredEvents(filteredEvents);
  };

  form.addEventListener('submit', onSubmitCreateButton);
  cancelButton.addEventListener('click', () => showCalendarContainer());
  newEvent.addEventListener('click', onClickNewEventButton);
  table.addEventListener('click', onClickDeleteEvent);
  filter.addEventListener('change', onClickFilterParticipant);

  const showCalendarContainer = () => {
    calendarContainer.classList.remove('hidden');
    newEventContainer.classList.add('hidden');
  };

  const isEventDuplicated = (newEvent) => {
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

  const renderEvent = (event) => {
    const { eventText, day, time } = event;
    const cellClass = `cell-${day}-${time}`;
    const cell = document.querySelector(`.${cellClass}`);
    cell.innerHTML = `
        ${eventText}
        <button type="button" id="delete-event" class="close" aria-label="Close" data-toggle="modal" data-target="#staticBackdrop">
          <span class="delete-event">&times;</span>
        </button>
      `;
    cell.classList.add('event');
  };

  const renderFilteredEvents = (events) => {
    return events.map((event) => {
      const { eventText, day, time } = event;
      const cellClass = `cell-${day}-${time}`;
      const cell = document.querySelector(`.${cellClass}`);
      cell.innerHTML = `
      ${eventText}
      <button type="button" id="delete-event" class="close" aria-label="Close" data-toggle="modal" data-target="#staticBackdrop">
        <span class="delete-event">&times;</span>
      </button>
    `;
      cell.classList.add('event');
    });
  };

  const deleteAllEvents = (events) => {
    events.map((event) => {
      const { day, time } = event;
      const cellClass = `cell-${day}-${time}`;
      const cell = document.querySelector(`.${cellClass}`);
      cell.innerHTML = '';
      cell.classList.remove('event');
    });
  };
};

startApplication();
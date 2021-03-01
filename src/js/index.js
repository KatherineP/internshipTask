import '../style/main.scss';
import { isEventDuplicated, isValid, deleteAllEvents } from './helpers/helpers';
import {
  renderFilteredEvents,
  renderEvent,
  showCalendarContainer,
  renderFilteredEventsForUser,
} from './rendering/rendering';
import users from '../config';
import { User, Admin } from './users/users';
import { postNewEvent, getAllEvents, deleteEvent, putEvent } from './api/api';

const startApplication = () => {
  const cancelButton = document.querySelector('#cancel');
  const filter = document.querySelector('.users-filter');
  const table = document.querySelector('.table');
  const alert = document.querySelector('.alert-event');
  const eventText = document.querySelector('#inputNameEvent');
  const form = document.querySelector('#form');
  const day = document.querySelector('#day');
  const time = document.querySelector('#time');
  const myModalEl = document.getElementById('staticBackdrop');
  const authModalEl = document.getElementById('auth');
  const participants = document.querySelector('#participants');
  const newEvent = document.querySelector('.new-event');
  const confirmDelete = document.querySelector('.confirm-delete');
  const calendarContainer = document.querySelector('.container-calendar');
  const newEventContainer = document.querySelector('.container-newEvent');
  const confirmAuth = document.querySelector('.confirm-auth');
  const authSelect = document.querySelector('.auth-select');
  const modal = new bootstrap.Modal(myModalEl, { backdrop: true });
  const authModal = new bootstrap.Modal(authModalEl, {
    backdrop: 'static',
    keyboard: false,
  });

  let currentEvents = [];
  let selectedEvent = {};
  let draggedElIndex = null;
  let authUser = null;
  let userObj = null;

  const onClickConfirmAuth = () => {
    authUser = authSelect.value;
    authModal.hide();
    const userType = users.find((user) => user.name === authUser).type;
    if (userType === 'user') {
      let user = new User(authUser);
      userObj = user;
    } else if (userType === 'admin') {
      let user = new Admin(authUser);
      userObj = user;
    }
    onAuthComplete(userObj);
  };

  const renderEventsFromServer = async () => {
    currentEvents = await getAllEvents();
    console.log(currentEvents);
    if (currentEvents.length) {
      renderFilteredEvents(currentEvents);
    }
  };

  renderEventsFromServer();

  const onAuthComplete = (user) => {
    if (user.can('create-event') && user.can('drag') && user.can('delete')) {
      renderFilteredEvents(currentEvents);
    } else {
      renderFilteredEventsForUser(currentEvents);
      newEvent.classList.add('hidden');
    }
  };

  // auth pop-up functionality
  authModal.show();

  // drag and drop functionality
  const drag = (event) => {
    if (!event.target.classList.contains('event')) return;
    const draggedElemId = event.target.id;
    const elemClass = event.target.parentElement.className;
    const elemClassArray = elemClass.split('-');
    const index = currentEvents.findIndex(
      (event) =>
        event.day === elemClassArray[1] && event.time === elemClassArray[2]
    );
    draggedElIndex = index;
    event.dataTransfer.setData('text/plain', draggedElemId);
  };

  for (const dropZone of [...document.querySelectorAll('td')]) {
    dropZone.addEventListener('dragover', (e) => {
      if (dropZone.childElementCount !== 0) return;
      e.preventDefault();
    });

    dropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      const draggedElemId = e.dataTransfer.getData('text/plain');
      const draggedElem = document.getElementById(`${draggedElemId}`);
      dropZone.append(draggedElem);
      const classNamesArrayOfNewCell = dropZone.className.split('-');
      const newEvent = {
        ...currentEvents[draggedElIndex],
        day: classNamesArrayOfNewCell[1],
        time: classNamesArrayOfNewCell[2],
      };

      const eventApiId = currentEvents[draggedElIndex].id;
      putEvent(eventApiId, newEvent).then(() => {
        currentEvents.push(newEvent);
        currentEvents.splice(draggedElIndex, 1);
      });
    });
  }

  const onSubmitCreateButton = (event) => {
    event.preventDefault();
    if (!isValid(eventText, participants, day, time)) {
      return;
    }
    const selectedParticipants = document.querySelectorAll(
      '#participants option:checked'
    );
    const participantsValue = Array.from(selectedParticipants).map(
      (el) => el.value
    );

    const newEvent = {
      eventText: eventText.value,
      participants: participantsValue,
      day: day.value,
      time: time.value,
    };

    if (isEventDuplicated(newEvent, currentEvents)) {
      alert.classList.remove('hidden');
      return;
    }

    postNewEvent(newEvent).then((event) => {
      currentEvents.push({ ...newEvent, id: event.id });
      renderEvent(newEvent);
      showCalendarContainer(calendarContainer, newEventContainer);
    });
  };

  const onClickNewEventButton = () => {
    form.reset();
    filter.value = 'All members';
    renderFilteredEvents(currentEvents);
    alert.classList.add('hidden');
    calendarContainer.classList.add('hidden');
    newEventContainer.classList.remove('hidden');
  };

  const onClickDeleteEvent = (event) => {
    if (!event.target.classList.contains('delete-event')) return;
    const cell = event.target.closest('.event');
    const cellClass = cell.parentElement.classList[0].split('-');
    const cellEventText = cell.firstChild.data.trim();
    const index = currentEvents.findIndex(
      (event) => event.day === cellClass[1] && event.time === cellClass[2]
    );

    selectedEvent = {
      cell,
      index,
      id: currentEvents[index].id,
    };

    document.querySelector(
      '.modal-body'
    ).innerText = `Are you sure you want to delete "${cellEventText}" event?`;
    modal.show();
  };

  const onClickConfirmDeleteEvent = () => {
    const { cell, index, id } = selectedEvent;
    modal.hide();
    deleteEvent(id).then(() => {
      currentEvents.splice(index, 1);
      cell.innerHTML = '';
      cell.classList.remove('event');
      cell.setAttribute('draggable', false);
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
  cancelButton.addEventListener('click', () =>
    showCalendarContainer(calendarContainer, newEventContainer)
  );
  newEvent.addEventListener('click', onClickNewEventButton);
  table.addEventListener('click', onClickDeleteEvent);
  filter.addEventListener('change', onClickFilterParticipant);
  confirmDelete.addEventListener('click', onClickConfirmDeleteEvent);
  confirmAuth.addEventListener('click', onClickConfirmAuth);
  table.addEventListener('dragstart', drag);
};

startApplication();

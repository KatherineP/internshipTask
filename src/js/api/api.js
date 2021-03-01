import { showNotification } from '../helpers/helpers';

const postNewEvent = async (eventObj) => {
  try {
    const res = await fetch(
      'http://158.101.166.74:8080/api/data/prokofievaK/event',
      {
        method: 'POST',
        body: `{"data": "${JSON.stringify(eventObj).replace(
          /"/g,
          '\\"'
        )}",\n  "id": "test11"}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) {
      console.log(`Looks like there was a problem. Status Code: ${res.status}`);
      showNotification('alert-api-fail', 'POST request failed');
      return false;
    }
    const data = await res.json();
    showNotification('alert-api-ok', 'POST request was successful');
    return data;
  } catch (err) {
    showNotification('alert-api-fail', 'POST request failed');
    console.log(err);
    return Promise.reject(err);
  }
};

const getAllEvents = async () => {
  try {
    const res = await fetch(
      'http://158.101.166.74:8080/api/data/prokofievaK/event'
    );
    if (!res.ok) {
      console.log(`Looks like there was a problem. Status Code: ${res.status}`);
      showNotification('alert-api-fail', 'GET request failed');
      return false;
    }
    const data = await res.json();
    const eventObjects = data.map((event) => {
      const { eventText, day, time, participants } = JSON.parse(event.data);
      return {
        id: event.id,
        eventText,
        day,
        time,
        participants,
      };
    });
    showNotification('alert-api-ok', 'GET request was successful');
    return eventObjects;
  } catch (err) {
    showNotification('alert-api-fail', 'GET request failed');
    console.log(err);
    return Promise.reject(err);
  }
};

const deleteEvent = async (eventId) => {
  try {
    const res = await fetch(
      `http://158.101.166.74:8080/api/data/prokofievaK/event/${eventId}`,
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      }
    );
    if (!res.ok) {
      console.log(`Looks like there was a problem. Status Code: ${res.status}`);
      showNotification('alert-api-fail', 'DELETE request failed');
      return false;
    }
    showNotification('alert-api-ok', 'DELETE request was successful');
  } catch (err) {
    showNotification('alert-api-fail', 'DELETE request failed');
    console.log(err);
    return Promise.reject(err);
  }
};

const putEvent = async (eventId, eventObj) => {
  try {
    const res = await fetch(
      `http://158.101.166.74:8080/api/data/prokofievaK/event/${eventId}`,
      {
        method: 'PUT',
        body: `{"data": "${JSON.stringify(eventObj).replace(
          /"/g,
          '\\"'
        )}",\n  "id": "test11"}`,
        headers: {
          Accept: 'application/json',
        },
      }
    );
    if (!res.ok) {
      console.log(`Looks like there was a problem. Status Code: ${res.status}`);
      showNotification('alert-api-fail', 'PUT request failed');
      return false;
    }
    const data = await res.json();
    const { eventText, day, time, participants } = JSON.parse(data.data);
    showNotification('alert-api-ok', 'PUT request was successful');
    return {
      eventText,
      day,
      time,
      participants,
    };
  } catch (err) {
    showNotification('alert-api-fail', 'PUT request failed');
    console.log(err);
    return Promise.reject(err);
  }
};

export { postNewEvent, getAllEvents, deleteEvent, putEvent };

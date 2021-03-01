import { ids } from 'webpack';

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
      return false;
    }
    const data = await res.json();
    return data;
  } catch (err) {
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
    return eventObjects;
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

// const generateEventObject = (arr) => {
//   return arr.map((event) => {
//     const { eventText, day, time, participants } = JSON.parse(event.data);
//     return {
//       id: event.id,
//       eventText,
//       day,
//       time,
//       participants,
//     };
//   });
// };

export { postNewEvent, getAllEvents };

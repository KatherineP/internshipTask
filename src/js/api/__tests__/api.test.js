import swagger from '../api';
import axios from 'axios';

const apiBase = 'http://158.101.166.74:8080/api/data/prokofievaK/event';
const eventsObj = [
  {
    day: 'mon',
    eventText: 'retro meeting',
    id: '3757f8f4-dd3c-49d1-99b0-dd8b72e43d25',
    participants: ['Kate Prokofieva'],
    time: '10',
  },
  {
    day: 'mon',
    eventText: 'retro meeting',
    id: 'fc237ebe-1e89-4952-a4f5-44c0f44a9d77',
    participants: ['Alex Prokofiev'],
    time: '11',
  },
  {
    day: 'mon',
    eventText: 'retro meeting',
    id: '2622f0b6-d7fd-44ad-ac5c-e7b6753303e4',
    participants: ['Alex Prokofiev', 'Kate Prokofieva'],
    time: '14',
  },
];
const eventsApi = [
  {
    id: '3757f8f4-dd3c-49d1-99b0-dd8b72e43d25',
    data:
      '{"id":"3757f8f4-dd3c-49d1-99b0-dd8b72e43d25","eventText":"retro meeting","day":"mon","time":"10","participants":["Kate Prokofieva"]}',
  },
  {
    id: 'fc237ebe-1e89-4952-a4f5-44c0f44a9d77',
    data:
      '{"id":"fc237ebe-1e89-4952-a4f5-44c0f44a9d77","eventText":"retro meeting","day":"mon","time":"11","participants":["Alex Prokofiev"]}',
  },
];

const transformedEvents = [
  {
    id: '3757f8f4-dd3c-49d1-99b0-dd8b72e43d25',
    eventText: 'retro meeting',
    day: 'mon',
    participants: ['Kate Prokofieva'],
    time: '10',
  },
  {
    id: 'fc237ebe-1e89-4952-a4f5-44c0f44a9d77',
    eventText: 'retro meeting',
    day: 'mon',
    participants: ['Alex Prokofiev'],
    time: '11',
  },
];
const newEvent = {
  day: 'mon',
  eventText: 'retro meeting',
  participants: ['Kate Prokofieva'],
  time: '10',
};

const dataForPostApi = JSON.stringify({
  data: JSON.stringify(newEvent),
  id: 'test',
});

const eventApi = {
  id: '3757f8f4-dd3c-49d1-99b0-dd8b72e43d25',
  data:
    '{"id":"3757f8f4-dd3c-49d1-99b0-dd8b72e43d25","eventText":"retro meeting","day":"mon","time":"10","participants":["Kate Prokofieva"]}',
};

const transformedEvent = {
  eventText: 'retro meeting',
  day: 'mon',
  time: '10',
  participants: ['Kate Prokofieva'],
};

const eventId = '3757f8f4-dd3c-49d1-99b0-dd8b72e43d25';

jest.mock('axios');

describe('Test API service', () => {
  it('success get all events', async () => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: eventsApi })
    );
    const allEvents = await swagger.getAllEvents();
    expect(allEvents).toEqual(transformedEvents);
  });

  it('success post event', async () => {
    axios.post.mockImplementationOnce((dataForPostApi) =>
      Promise.resolve({ data: event }, dataForPostApi)
    );
    const postedEvent = await swagger.postNewEvent(newEvent);
    expect(postedEvent).toEqual(event);
    expect(axios.post).toHaveBeenCalledWith(apiBase, dataForPostApi);
  });

  it('success put event', async () => {
    axios.put.mockImplementationOnce((eventId, dataForPostApi) =>
      Promise.resolve({ data: eventApi }, eventId, dataForPostApi)
    );
    const putEvent = await swagger.putEvent(eventId, newEvent);
    expect(putEvent).toEqual(transformedEvent);
    expect(axios.put).toHaveBeenCalledWith(
      `${apiBase}/${eventId}`,
      dataForPostApi
    );
  });
});

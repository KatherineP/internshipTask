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
const events = [
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
const newEvent = {
  day: 'mon',
  eventText: 'retro meeting',
  participants: ['Kate Prokofieva'],
  time: '10',
};

jest.mock('axios');

describe('Test API service', () => {
  it('success get all events', async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: events }));
    const allEvents = await swagger.getAllEvents();
    expect(allEvents).toEqual(events);
    expect(axios.get).toHaveBeenCalledWith(apiBase);
  });
  // it('success post event', async () => {
  //   axios.post.mockImplementationOnce(() => Promise.resolve({ data: event }));
  //   const allEvents = await swagger.postNewEvent();
  //   expect(allEvents).toEqual(event);
  // });
});

import { isEventDuplicated } from '../helpers';

describe('EventDuplicated', () => {
  it('event has a duplicate', () => {
    const newEvent = {
      eventText: 'Retro',
      day: 'wed',
      time: '11',
      participants: ['Kate', 'Alex'],
    };
    const existingEvents = [
      {
        eventText: 'Retro',
        day: 'wed',
        time: '11',
        participants: ['Kate', 'Alex'],
      },
      {
        eventText: 'Retro1',
        day: 'fri',
        time: '10',
        participants: ['Kate'],
      },
    ];
    expect(isEventDuplicated(newEvent, existingEvents)).toBe(true);
  });
});

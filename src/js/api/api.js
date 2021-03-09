import axios from 'axios';
class Swagger {
  _apiBase = 'http://158.101.166.74:8080/api/data/prokofievaK/event';

  postNewEvent = async (eventObj) => {
    const result = await axios.post(
      this._apiBase,
      this._createDataObj(eventObj)
    );
    return result.data;
  };

  getAllEvents = async () => {
    const res = await axios.get(this._apiBase);
    // const events = res.data.map(this._transformEvents);
    // return events;
    return res.data;
  };

  deleteEvent = async (eventId) => {
    await axios.delete(`${this._apiBase}/${eventId}`);
  };

  putEvent = async (eventId, eventObj) => {
    const result = await axios.put(
      `${this._apiBase}/${eventId}`,
      this._createDataObj(eventObj)
    );
    return this._transformEvent(result);
  };

  // _transformEvents = (event) => {
  //   const { eventText, day, time, participants } = JSON.parse(event.data);
  //   return {
  //     id: event.id,
  //     eventText,
  //     day,
  //     time,
  //     participants,
  //   };
  // };

  _transformEvent = (res) => {
    const { eventText, day, time, participants } = JSON.parse(res.data.data);
    return {
      eventText,
      day,
      time,
      participants,
    };
  };

  _createDataObj = (eventObj) => {
    const data = JSON.stringify({
      data: JSON.stringify(eventObj),
      id: 'test',
    });
    return data;
  };
}

const swagger = new Swagger();

export default swagger;

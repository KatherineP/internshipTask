import axios from 'axios';
class Swagger {
  _apiBase = 'http://158.101.166.74:8080/api/data/prokofievaK/event';

  postNewEvent = async (eventObj) => {
    console.log(this._createDataObj(eventObj));
    const result = await axios.post(
      this._apiBase,
      this._createDataObj(eventObj)
    );
    return result.data;
  };

  getAllEvents = async () => {
    const res = await axios.get(this._apiBase);
    return res.data.map(this._transformEvents);
  };

  deleteEvent = async (eventId) => {
    await axios.delete(`${this._apiBase}/${eventId}`);
  };

  putEvent = async (eventId, eventObj) => {
    const result = await axios.put(
      `${this._apiBase}/${eventId}`,
      this._createDataObj(eventObj)
    );
    const data = result.data;
    return this._transformEvent(data);
  };

  _transformEvents = (event) => {
    const { eventText, day, time, participants } = JSON.parse(event.data);
    return {
      id: event.id,
      eventText,
      day,
      time,
      participants,
    };
  };

  _transformEvent = (res) => {
    const { eventText, day, time, participants } = JSON.parse(res.data);
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

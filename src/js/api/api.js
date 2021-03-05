class Swagger {
  _apiBase = 'http://158.101.166.74:8080/api/data/prokofievaK/event';

  async getResource(fetchParamsObj = {}, id = '') {
    const res = await fetch(`${this._apiBase}${id}`, fetchParamsObj);
    if (!res.ok) {
      throw new Error(
        `Could not fetch ${this._apiBase}/${id}, received ${res.status}`
      );
    }
    let responseBody;
    if (fetchParamsObj.method === 'DELETE') {
      responseBody = await res.text();
    } else {
      responseBody = await res.json();
    }
    return responseBody;
  }

  postNewEvent = async (eventObj) => {
    return await this.getResource({
      method: 'POST',
      body: `{"data": "${JSON.stringify(eventObj).replace(
        /"/g,
        '\\"'
      )}",\n  "id": "test11"}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  getAllEvents = async () => {
    const result = await this.getResource();
    return result.map(this._transformEvents);
  };

  deleteEvent = async (eventId) => {
    const result = await this.getResource(
      {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      },
      `/${eventId}`
    );
  };

  putEvent = async (eventId, eventObj) => {
    const result = await this.getResource(
      {
        method: 'PUT',
        body: `{"data": "${JSON.stringify(eventObj).replace(
          /"/g,
          '\\"'
        )}",\n  "id": "test11"}`,
        headers: {
          Accept: 'application/json',
        },
      },
      `/${eventId}`
    );
    return this._transformEvent(result);
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
}

const swagger = new Swagger();

export default swagger;

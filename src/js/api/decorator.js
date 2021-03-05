import swagger from './api';
import { showNotification } from '../helpers/helpers';

class ApiDecorator {
  constructor() {
    const methods = Object.getOwnPropertyNames(swagger).filter(
      (methodName) => !methodName.includes('_')
    );

    methods.forEach((method) => {
      this[method] = async (...param) => {
        try {
          const result = await swagger[method](...param);
          showNotification('alert-api-ok', `${method} request was successful`);
          return result;
        } catch (error) {
          if (method === 'postNewEvent') {
            showNotification('alert-event', `${method} request failed`);
          } else {
            showNotification('alert-api-fail', `${method} request failed`);
          }
          return null;
        }
      };
    });
  }
}

const apiDecorator = new ApiDecorator();

export default apiDecorator;

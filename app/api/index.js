import Base from './base';
import ENDPOINTS from './endpoint';
import moment from 'moment';

export default class Api extends Base {
  static _instance = null;
  static instance() {
    if (this._instance == null) {
      this._instance = new Api();
    }

    return this._instance;
  }

  signUp(name, email, phone, password) {
    const url = ENDPOINTS.SIGN_UP;
    const body = {
      email,
      name,
      password,
      phone,
    };
    return this.callPost(url, body);
  }

  getFolder() {
    const body = {
      type: 0,
      limit: -1,
      offet: 0,
    };

    return this.callPost(ENDPOINTS.GET_FOLDER, body);
  }

  getCameraList(all) {
    const body = {
      fileType: 'camera',
      limit: all ? -1 : 20,
      offet: 0,
    };

    return this.callPost(ENDPOINTS.GET_CAMERA, body);
  }

  getCameraStreamingUrl(id) {
    const url = ENDPOINTS.CAMERA_VIEW + '/' + id;
    return this.callGet(url);
  }

  getCameraListFromQRCode(code) {
    return this.fakePromise(null);
  }

  getCameraServices() {
    return this.fakePromise(null);
  }

  getPlayBackInfo(id, date) {
    const fetchingTime = moment(date).format('YYYYMMDD');
    let callingApi = ENDPOINTS.PLAY_BACK;
    callingApi = callingApi.replace('{id}', id);
    callingApi = callingApi.replace('{time}', fetchingTime);

    callingApi;

    // return this.fakePromise(callingApi)
    return this.callGet(callingApi);
  }

  fakePromise(response) {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(response);
      });
    });
  }
}

import Base from "./base"
import ENDPOINTS from "./endpoint"

export default class Api extends Base {
  static _instance = null
  static instance() {
      if (this._instance == null) {
          this._instance = new Api()
      }
      
      return this._instance
  }

  signUp(name, email, phone, password) {
    const url = ENDPOINTS.SIGN_UP
    const body = {
      email,
      name,
      password,
      phone
    }
    return this.callPost(url, body)
  }

  getCameraList() {
    const url = ENDPOINTS.CAMERA_LIST
    return this.callGet(url)
  }

  getCameraStreamingUrl(id) {
    const url = ENDPOINTS.CAMERA_VIEW + '/' + id
    return this.callGet(url)
  }

  getCameraListFromQRCode(code) {
    return fakePromise(null)
  }

  getCameraServices() {
    return fakePromise(null)
  }

  fakePromise(response) {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(response)
      })
    })
  }
}
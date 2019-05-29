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

  login(username, password) {
    const url = ENDPOINTS.LOGIN
    const body = {
      email: username,
      password: password
    }

    return this.callPost(url, body)
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
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve([
          {
            camera_name: "Camera Q.1",
            thumbnail: "https://media.architecturaldigest.com/photos/5c54be97f53444395afc2ef6/16:9/w_1280,c_limit/AD030119_KRIS_JENNER_01.jpg"
          },
          {
            camera_name: "Camera Q.6",
            thumbnail: "https://wp.zillowstatic.com/trulia/wp-content/uploads/sites/1/2016/07/kendall-jenner-west-hollywood-home-7-1-16-living-3.jpg"
          },
          {
            camera_name: "Camera Q.Tan Binh",
            thumbnail: "http://www.carlosericlopez.com/wp-content/uploads/2017/04/krisjenner_carlosericlopez_15-1612x1075.jpg"
          }
        ])
      }, 1000)
    })

    // const url = ENDPOINTS.CAMERA_LIST
    // return this.callGet(url)
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
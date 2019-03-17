import { AsyncStorage } from 'react-native'
import ENDPOINTS from './endpoint'
import { ACCESS_TOKEN_STORE_KEY, CREDENTIAL_INFO_STORE_KEY } from '../common/constants'
export default class Base {
  accessToken = null
  uciEmail = null
  uciPassword = null

  setAccessToken(token) {
    this.accessToken = token

    if (token) {
      AsyncStorage.setItem(ACCESS_TOKEN_STORE_KEY, token)  
    }
    else {
      AsyncStorage.removeItem(ACCESS_TOKEN_STORE_KEY)
    }
  }

  setUserCredentialInfo(email, password) {
    this.uciEmail = email
    this.uciPassword = password

    AsyncStorage.setItem(CREDENTIAL_INFO_STORE_KEY, JSON.stringify({ email, password }))  
  }

  callPost(url, body) {
    return this.call('POST', url, body)
  }

  callGet(url) {
    return this.call('GET', url)
  }

  call(method, url, body) {
    const headers = this.accessToken == null ? {
      'Content-Type': 'application/json'
    } : {
      'Content-Type': 'application/json',
      'X-Tokens': this.accessToken,
    }

    const getConfigs = { method, headers }
    const postConfigs = body ? { ...getConfigs, body: body } : getConfigs
    const configs = method == 'POST' ? postConfigs : getConfigs

    return new Promise((resolve, rejecter) => {
      fetch(url, configs)
      .then(response => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
      })
      .then(([code, data]) => {
        if (code != 401) {
          resolve(data)
        }
        else {
          this.setAccessToken(null)
          this.refreshAccessToken().then(rfatRes => {
            this.setAccessToken(rfatRes.session_key)
            this.call(method, url, body)
            .then(res => resolve(res))
            .catch(e => rejecter(e))  
          })
          .catch(e => {
            rejecter(e)
          })
        }
      })
      .catch(e => {
        rejecter(e)
      })
    })
  }

  refreshAccessToken() {
    const url = ENDPOINTS.LOGIN
    const body = JSON.stringify({
      email: this.uciEmail,
	    password: this.uciPassword
    })

    return this.callPost(url, body)
  }
}
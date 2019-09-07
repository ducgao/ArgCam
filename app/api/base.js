import { AsyncStorage } from 'react-native'
import md5 from 'js-md5'
import { Base64 } from 'js-base64'

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
    const headers = {
      'Content-Type': 'application/json',
      'Company': 'demo',
    }

    const getConfigs = { method, headers }
    const postConfigs = body ? { ...getConfigs, body: JSON.stringify(body) } : getConfigs
    const configs = method == 'POST' ? postConfigs : getConfigs

    const callingUrl = url.replace("{access_token}", this.accessToken)

    return new Promise((resolve, rejecter) => {
      fetch(callingUrl, configs)
      .then(response => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
      })
      .then(([code, data]) => {
        console.warn(data);
        if (code === 200) {
          resolve(data)
        }
        else {
          rejecter(code)
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

  login(email, password) {
    const step1 = md5(password)
    const step2 = Base64.encode(`${email}:${step1}`)

    const headers = {
      'Content-Type': 'application/json',
      'Company': 'demo',
      'Authorization': `Basic ${step2}`
    }

    console.warn(headers);
    

    return new Promise((resolve, rejecter) => {
      fetch(ENDPOINTS.LOGIN, { method: 'POST', headers })
      .then(response => {
        const statusCode = response.status
        const data = response.json()
        return Promise.all([statusCode, data])
      })
      .then(([code, data]) => {
        console.warn(data);
        if (code === 200) {
          resolve(data)
        }
        else {
          rejecter(code)
        }
      })
      .catch(e => {
        rejecter(e)
      })
    })
  }
}
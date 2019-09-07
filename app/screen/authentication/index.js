import { Component } from 'react'
import { AsyncStorage } from 'react-native'
import UserRepository from '../../repository/user'
import { replaceToLogin, replaceToMain } from '../../common/router'
import { USER_INFO_STORE_KEY, ACCESS_TOKEN_STORE_KEY, CREDENTIAL_INFO_STORE_KEY } from '../../common/constants'
import Api from '../../api'

export default class Authentication extends Component {
  static navigationOptions = { header: null }

  userRepository = UserRepository.instance()

  constructor(props) {
    super(props)

    this.syncData()
  }

  syncData() {
    const keys = [
      ACCESS_TOKEN_STORE_KEY,
      CREDENTIAL_INFO_STORE_KEY,
      USER_INFO_STORE_KEY
    ]
    AsyncStorage.multiGet(keys).then(res => {
      console.warn(res);
      const token = res[0][1]
      const credentialInfo = JSON.parse(res[1][1])
      const userInfo = JSON.parse(res[2][1])

      if (token && credentialInfo && userInfo) {
        UserRepository.instance().setUserInfo(userInfo)
        Api.instance().setAccessToken(token)
        Api.instance().setUserCredentialInfo(credentialInfo.email, credentialInfo.password)
        replaceToMain(this)
      } else {
        replaceToLogin(this)
      }
    })
    .catch(_ => {
      replaceToLogin(this)
    })
  }

  render() {
    return null
  }
}
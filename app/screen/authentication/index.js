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

    // FAKE DATA TO ACCESS TO HOME SCREEN DIRECTLY - REMOVE WHEN RELEASE
    // UserRepository.instance().setUserInfo({
    //   name: "Arg Test",
    //   email: "argtest@local.com"
    // })
    // Api.instance().setAccessToken("767dbf9ea3117e28be75ad65af4d51a4") 
    // Api.instance().setUserCredentialInfo("argtest@local.com", "argtest@123")
    // replaceToMain(this)

    this.syncData()
  }

  syncData() {
    const keys = [
      USER_INFO_STORE_KEY, 
      ACCESS_TOKEN_STORE_KEY,
      CREDENTIAL_INFO_STORE_KEY
    ] 
    AsyncStorage.multiGet(keys).then(res => {
      if (res.length < 3) {
        replaceToLogin(this)
        return
      }

      const userInfo = JSON.parse(res[0])
      const token = res[1]
      const credentialInfo = res[2]

      if (userInfo.email) {
        UserRepository.instance().setUserInfo(userInfo)
        Api.instance().setAccessToken(token) 
        Api.instance().setUserCredentialInfo(credentialInfo.email, credentialInfo.password)
        replaceToMain(this)
      }
      else {
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
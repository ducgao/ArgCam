import { AsyncStorage } from 'react-native'  
import { USER_INFO_STORE_KEY } from '../common/constants'
export default class UserRepository {
  static singleInstance = null
  static instance() {
    if (this.singleInstance == null) {
      this.singleInstance = new UserRepository()
    }
      
    return this.singleInstance
  }

  observers = []

  userInfo = null

  isLogged() {
    return this.userInfo != null
  }

  setUserInfo(userInfo) {
    this.userInfo = userInfo
    AsyncStorage.setItem(USER_INFO_STORE_KEY, JSON.stringify(userInfo))
  }

  addObserver(observer) {
    this.observers.push(observer)
    this.notify()
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(o => o != observer)
  }

  notify() {
    this.observers.forEach(o => {
      o(this.userInfo)
    })
  }
}
import React, { Component } from 'react'
import { 
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Alert,
  AsyncStorage
} from 'react-native'
import STRING from '../../res/string'
import THEME from '../../res/theme'
import { isIphoneX } from '../../utils'
import UserRepository from '../../repository/user'
import Cell from './cell'
import CameraRepository from '../../repository/camera'
import { navigateToChangePassword } from '../../common/router'
import { ACCESS_TOKEN_STORE_KEY, CREDENTIAL_INFO_STORE_KEY, USER_INFO_STORE_KEY } from '../../common/constants'
import { StackActions, NavigationActions } from 'react-navigation'

export default class Profile extends Component {
  static navigationOptions = { header: null }

  state = {
    userInfo: null,
    cameraCount: 0
  }

  userRepository = UserRepository.instance()
  cameraRepository = CameraRepository.instance()

  componentDidMount() {
    this.userRepository.addObserver(this.userObserver)
    this.cameraRepository.addObserver(this.cameraObserver)
  }

  componentWillUnmount() {
    this.userRepository.removeObserver(this.userObserver)
    this.cameraRepository.removeObserver(this.cameraObserver)
  }

  onRequestLogout = () => {
    Alert.alert(STRING.logout, STRING.logoutConfirm, [
      {
        text: "Yes",
        style: 'default',
        onPress: this.doLogout
      },
      {
        text: "Cancel",
        style: 'cancel'
      }
    ])
  }

  doLogout = () => {
    AsyncStorage.multiRemove([ACCESS_TOKEN_STORE_KEY, CREDENTIAL_INFO_STORE_KEY, USER_INFO_STORE_KEY], () => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Authentication' })],
      });
      this.props.navigation.dispatch(resetAction);
    })
  }

  userObserver = (userInfo) => {
    this.setState({ userInfo })
  }

  cameraObserver = (cameraList) => {
    this.setState({ cameraCount: cameraList ? cameraList.length : 0 })
  }

  onProfileManagermentPress = () => {
    Alert.alert(STRING.notice, STRING.featuresNotAvailable)
  }

  onNotificationCenterPress = () => {
    Alert.alert(STRING.notice, STRING.featuresNotAvailable)
  }

  onFAQPress = () => {
    Alert.alert(STRING.notice, STRING.featuresNotAvailable)
  }

  onSettingPress = () => {
    Alert.alert(STRING.notice, STRING.featuresNotAvailable)
  }

  renderHeader() {
    const userInfo = this.state.userInfo
    if (userInfo == null) return

    // const ccount = this.state.cameraCount
    // const name = userInfo.name
    // const cameraCount = ccount + ' ' + (ccount > 1 ? STRING.cameras : STRING.camera)
    const avatarSource = userInfo.avatar ? { uri: userInfo.avatar } : require('../../res/images/avatar-default.png')
    return <View style={styles.headerContainer}>
      <Image style={styles.avatar} source={avatarSource} />
      <Text style={styles.userName}>{userInfo.firstName}</Text>
      <Text style={styles.cameraCount}>{userInfo.email}</Text>
    </View>
  }

  renderBlock1() {
    return <View style={styles.blockContainer}>
      <Cell title={STRING.profileManagerment} icon={"ios-contact"} color={THEME.colorPrimary} onPress={this.onProfileManagermentPress}/>
      <Cell title={STRING.notificationCenter} icon={"ios-mail"} color={"#f48541"} onPress={this.onNotificationCenterPress}/>
    </View>
  }

  renderBlock2() {
    return <View style={styles.blockContainer}>
      <Cell title={STRING.feedback} icon={"ios-help-circle"} color={"#f44170"} onPress={this.onFAQPress} />
      <Cell title={STRING.About} icon={"ios-information-circle"} color={"#a341f4"} />
      <Cell title={STRING.Settings} icon={"ios-settings"} color={"#41f4a9"} onPress={this.onSettingPress} />
    </View>
  }

  renderBlock3() {
    return <View style={styles.blockContainer}>
      <Cell title={STRING.logout} icon={"ios-power"} color={"#f44170"} onPress={this.onRequestLogout}/>
    </View>
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
          {this.renderBlock1()}
          {this.renderBlock2()}
          {this.renderBlock3()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground
  },
  headerContainer: {
    width: '100%', 
    backgroundColor: THEME.colorPrimary,
    height: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
    paddingTop: isIphoneX() ? 32 : 12,
    zIndex: 99
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    alignSelf: 'center'
  },
  userName: {
    color: 'white', 
    alignSelf: 'center', 
    fontSize: 16, 
    marginTop: 8
  },
  cameraCount: {
    color: '#FFFFFF80', 
    alignSelf: 'center', 
    fontSize: 12, 
    marginTop: 4
  },
  blockContainer: {
    marginTop: 20,
    width: '90%', 
    alignSelf: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    borderRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center'
  },
  scrollView: {
    paddingBottom: 24
  }
})

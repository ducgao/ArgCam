import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  Text,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import STRING from '../../res/string'
import THEME from '../../res/theme'
import Input, { EMAIL, PASSWORD } from '../../ui-component/input'
import Button from '../../ui-component/button'
import { navigateToRegister, replaceToMain } from '../../common/router';
import Api from '../../api'
import UserRepository from '../../repository/user';

export default class ChangePassword extends Component {
  static navigationOptions = { header: null }

  emailInputRef = null
  passwordInputRef = null

  api = Api.instance()
  userRepository = UserRepository.instance()

  openRegisterScreen = () => {
    navigateToRegister(this)
  }

  requestLogin = () => {
    const email = this.emailInputRef.getText()
    const password = this.passwordInputRef.getText()

    if (email == null) {
      Alert.alert(STRING.appName, STRING.emailIncorrect)
      return 
    }

    if (password == null) {
      Alert.alert(STRING.appName, STRING.passwordIncorrect)
      return 
    }

    this.api.login(email, password).then(res => {
      const token = res.session_key
      if (token) {
        this.api.setAccessToken(token)
        this.api.setUserCredentialInfo(email, password)
        UserRepository.instance().setUserInfo(res.user)
        replaceToMain(this)
      }
      else {
        Alert.alert(STRING.appName, STRING.loginFail)
      }
    })
    .catch(_ => {
      Alert.alert(STRING.appName, STRING.loginFail)
    })
  }

  renderInputContainer() {
    return <View style={styles.inputContainer}>
      <Input
        ref={ref => this.emailInputRef = ref}
        title={"Old password"}
        placeholder={"Old password"}
        verifyMethod={EMAIL}
      />
      <Input
        ref={ref => this.passwordInputRef = ref}
        style={styles.inputPassword}
        title={"New password"}
        placeholder={"New password"}
        verifyMethod={PASSWORD}
      />
    </View>
  }

  renderLoginButton() {
    return <Button style={styles.loginButton} text={"Submit"} onPress={this.requestLogin} />
  }

  renderRegister() {
    return <Text 
    style={styles.register}
  >
    {"Your new password required to contain both upper, lower case characters, number and special characters"}
  </Text>
  }

  render() {
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {this.renderInputContainer()}
          {this.renderRegister()}
          {this.renderLoginButton()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground,
    justifyContent: 'center'
  },
  inputContainer: {
    marginStart: 24,
    marginEnd: 24
  },
  inputPassword: {
    marginTop: 16
  },
  forgotPassword: {
    marginTop: 16,
    textAlign: 'right',
    color: THEME.textLink
  },
  loginButton: {
    marginStart: 24, 
    marginEnd: 24,
    marginTop: 60
  },
  register: {
    marginStart: 24, 
    marginEnd: 24,
    marginTop: 16,
    fontSize: 12,
    fontStyle: 'italic',
    color: 'gray'
  }
})

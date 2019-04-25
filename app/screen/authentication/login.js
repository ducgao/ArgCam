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
import { navigateToRegister, replaceToMain } from '../../common/router'
import Api from '../../api'
import UserRepository from '../../repository/user'

export default class Authentication extends Component {
  static navigationOptions = { header: null }

  state = {
    loading: false
  }

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

    this.setState({ loading: true }, this.doLogin.bind(this, email, password))
  }

  doLogin = (email, password) => {
    this.api.login(email, password).then(res => {
      this.setState({ loading: false })

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
      this.setState({ loading: false })
      Alert.alert(STRING.appName, STRING.loginFail)
    })
  }

  renderInputContainer() {
    return <View style={styles.inputContainer}>
      <Input
        ref={ref => this.emailInputRef = ref}
        title={STRING.email}
        placeholder={STRING.email}
        verifyMethod={EMAIL}
      />
      <Input
        ref={ref => this.passwordInputRef = ref}
        style={styles.inputPassword}
        title={STRING.password}
        placeholder={STRING.password}
        verifyMethod={PASSWORD}
      />
      {/* <Text style={styles.forgotPassword}>
        {STRING.forgotPassword}
      </Text> */}
    </View>
  }

  renderLoginButton() {
    return <Button 
      style={styles.loginButton} 
      text={STRING.login} 
      onPress={this.requestLogin} 
      loading={this.state.loading}
    />
  }

  renderRegister() {
    return <TouchableWithoutFeedback style={styles.register} onPress={this.openRegisterScreen}>
      <Text 
        style={styles.register}
      >
        {STRING.register + ' ' + STRING.appName + '?'}
      </Text>
    </TouchableWithoutFeedback>
  }

  render() {
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={() => Keyboard.dismiss()}>
        <View style={styles.container} pointerEvents={ this.state.loading ? "none" : "auto" }>
          {this.renderInputContainer()}
          {this.renderLoginButton()}
          {this.renderRegister()}
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
    textAlign: 'center',
    color: 'gray',
    textDecorationLine: 'underline'
  }
})

import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import STRING from '../../res/string'
import THEME from '../../res/theme'
import Input, { EMAIL, PASSWORD, PHONE } from '../../ui-component/input'
import Checkable from '../../ui-component/checkable'
import Button from '../../ui-component/button'
import ScrollableComponent from '../../ui-component/scrollablecomponent'
import Api from '../../api'

export default class Register extends Component {
  static navigationOptions = { header: null }

  state = {
    loading: false
  }

  api = Api.instance()

  _onRequestSignUp = () => {
    const name = this.nameInput.getText()
    const email = this.emailInput.getText()
    const phone = this.phoneInput.getText()
    const password = this.passwordInput.getText()
    const rePassword = this.rePasswordInput.getText()
    const isAgreePolicy = this.policyCheckable.isChecked()
    
    if (name == null) {
      Alert.alert(STRING.appName, STRING.signUpNameError)
      return
    }

    if (email == null) {
      Alert.alert(STRING.appName, STRING.signUpEmailError)
      return
    }

    if (phone == null) {
      Alert.alert(STRING.appName, STRING.signUpPhoneError)
      return
    }

    if (password == null) {
      Alert.alert(STRING.appName, STRING.signUpPasswordError)
      return
    }

    if (rePassword != password) {
      Alert.alert(STRING.appName, STRING.signUpRePasswordError)
      return
    }

    if (isAgreePolicy == false) {
      Alert.alert(STRING.appName, STRING.signUpAgreePolicyError)
      return
    }

    this.setState({ loading: true }, this._doRegister.bind(this, name, email, phone, password))
  }

  _doRegister = (name, email, phone, password) => {
    this.api.signUp(name, email, phone, password).then(_ => {
      this.setState({ loading: false })
      Alert.alert(
        STRING.signUpSuccessTitle, 
        STRING.signUpSuccessMessage,
        [
          {
            text: 'OK', 
            onPress: this.props.navigation.goBack
          },
        ],
        { 
          cancelable: false
        }
      )
    })
    .catch(_ => {
      Alert.alert(STRING.appName, STRING.signUpError)
      this.setState({ loading: false })
    })
  }

  renderInputContainer() {
    return <View style={styles.inputContainer}>
      <Input
        ref={r => this.nameInput = r}
        title={STRING.name}
        placeholder={STRING.name}
      />
      <Input
        ref={r => this.emailInput = r}
        style={styles.inputNext}
        title={STRING.email}
        placeholder={STRING.email}
        verifyMethod={EMAIL}
      />
      <Input
        ref={r => this.phoneInput = r}
        style={styles.inputNext}
        title={STRING.phone}
        placeholder={STRING.phone}
        verifyMethod={PHONE}
      />
      <Input
        ref={r => this.passwordInput = r}
        style={styles.inputNext}
        title={STRING.password}
        placeholder={STRING.password}
        verifyMethod={PASSWORD}
      />
      <Input
        ref={r => this.rePasswordInput = r}
        style={styles.inputNext}
        title={STRING.confirmPassword}
        placeholder={STRING.confirmPassword}
        verifyMethod={PASSWORD}
      />
    </View>
  }

  renderSignUpButton() {
    return <Button 
      style={styles.signUpButton} 
      text={STRING.signUp} 
      onPress={this._onRequestSignUp} 
      loading={this.state.loading}
    />
  }

  renderTandC() {
    return <Checkable ref={r => this.policyCheckable = r} style={styles.tandc} title={STRING.tandc} />
  }

  render() {
    return (
      <ScrollableComponent>
        <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
          <View style={styles.container} pointerEvents={ this.state.loading ? "none" : "auto" }>  
            {this.renderInputContainer()}
            {this.renderSignUpButton()}
            {this.renderTandC()}
          </View>
        </TouchableWithoutFeedback>
      </ScrollableComponent>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 44,
    justifyContent: 'center'
  },
  inputContainer: {
    marginStart: 24,
    marginEnd: 24
  },
  inputNext: {
    marginTop: 16
  },
  forgotPassword: {
    marginTop: 16,
    textAlign: 'right',
    color: THEME.textLink
  },
  tandc: {
    marginStart: 24, 
    marginEnd: 24,
    marginTop: 16
  },
  signUpButton: {
    marginStart: 24, 
    marginEnd: 24,
    marginTop: 44
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

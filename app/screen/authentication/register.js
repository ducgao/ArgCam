import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import STRING from '../../res/string'
import THEME from '../../res/theme'
import CameraRepository from '../../repository/camera'
import Input, { EMAIL, PASSWORD } from '../../ui-component/input'
import Checkable from '../../ui-component/checkable'
import Button from '../../ui-component/button'

export default class Register extends Component {
  static navigationOptions = { header: null }

  cameraRepository = CameraRepository.instance()

  state = {
    cameraList: null
  }

  componentDidMount() {
    this.cameraRepository.addObserver(this.camerasObserver)
  }

  componentWillUnmount() {
    this.cameraRepository.removeObserver(this.camerasObserver)
  }

  camerasObserver = (cameras) => {
    this.setState({ cameraList: cameras })
  }

  openRegisterScreen = () => {
    this.props.navigation.navigate('')
  }

  renderInputContainer() {
    return <View style={styles.inputContainer}>
      <Input
        title={STRING.email}
        placeholder={STRING.email}
        verifyMethod={EMAIL}
      />
      <Input
        style={styles.inputPassword}
        title={STRING.password}
        placeholder={STRING.password}
        verifyMethod={PASSWORD}
      />
      <Input
        style={styles.inputPassword}
        title={STRING.password}
        placeholder={STRING.password}
        verifyMethod={PASSWORD}
      />
      <Input
        style={styles.inputPassword}
        title={STRING.confirmPassword}
        placeholder={STRING.confirmPassword}
        verifyMethod={PASSWORD}
      />
    </View>
  }

  renderSignUpButton() {
    return <Button style={styles.signUpButton} text={STRING.signUp}/>
  }

  renderTandC() {
    return <Checkable style={styles.tandc} title={STRING.tandc} />
  }

  render() {
    return (
      <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.container}>  
          {this.renderInputContainer()}
          {this.renderSignUpButton()}
          {this.renderTandC()}
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

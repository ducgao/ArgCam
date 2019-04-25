import React, {Component} from 'react'
import {
  Text, 
  TextInput,
  View
} from 'react-native'
import { isValidEmail } from '../utils'
import THEME from '../res/theme'

const STATUS_NORMAL = 'normal'
const STATUS_ERROR = 'error'
const STATUS_VALID = 'valid'

export const EMAIL = 'email'
export const PASSWORD = 'password'
export const PHONE = 'phone'

export default class Input extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      status: props.initInput ? STATUS_VALID : STATUS_NORMAL,
      input: props.initInput ? props.initInput : null
    }
  }

  verifyInput = (input) => {
    if (input == '') {
      this.setState({ 
        status: STATUS_NORMAL,
        input 
      })
      return
    }

    if (this.props.verifyMethod === EMAIL) {
      this.setState({ 
        status: isValidEmail(input) ? STATUS_VALID : STATUS_ERROR,
        input
      })
      return
    }

    if (this.props.verifyMethod === PASSWORD) {
      this.setState({ 
        status: input.length >= 6 ? STATUS_VALID : STATUS_ERROR,
        input 
      })
      return
    }

    this.setState({ 
      status: STATUS_VALID,
      input
    })
  }

  getText = () => {
      if (this.state.status == STATUS_ERROR || this.state.status == STATUS_NORMAL) {
          return null
      }

      return this.state.input
  }

  render() {
      if (this.props.autoGrow == true) {
          return this.renderAutoGrow()
      }
      else {
          return this.renderNormal()
      }

  }

  renderAutoGrow() {
      const indicatorColor = this.state.status == STATUS_NORMAL ? THEME.unactive : this.state.status == STATUS_VALID ? THEME.colorPrimary : 'red'
      return (
      <View style={this.props.style} >
          <Text>{this.props.title.toUpperCase()}</Text>
          <TextInput
          style={{ 
              marginTop: 8,
              backgroundColor: 'white',
              minHeight: 40,
              paddingLeft: 8
          }}
          value={this.state.input}
          multiline={true}
          placeholder={this.props.placeholder}
          onChangeText={this.verifyInput}
          secureTextEntry={this.props.verifyMethod === PASSWORD}
          />
          <View
          style={{
              height: 1,
              backgroundColor: indicatorColor
          }}
          />
      </View>
      )
  }

  renderNormal() {
      const indicatorColor = this.state.status == STATUS_NORMAL ? THEME.unactive : this.state.status == STATUS_VALID ? THEME.colorPrimary : 'red'
      return (
      <View style={this.props.style} >
          <Text>{this.props.title.toUpperCase()}</Text>
          <TextInput
          style={{ 
              marginTop: 8,
              backgroundColor: 'white',
              height: 40,
              paddingLeft: 8
          }}
          value={this.state.input}
          keyboardType={this.props.verifyMethod === PHONE ? 'phone-pad' : null}
          placeholder={this.props.placeholder}
          onChangeText={this.verifyInput}
          secureTextEntry={this.props.verifyMethod === PASSWORD}
          />
          <View
          style={{
              height: 1,
              backgroundColor: indicatorColor
          }}
          />
      </View>
      )
  }
}
import React, {Component} from 'react'
import {
  Text, 
  TouchableOpacity
} from 'react-native'
import THEME from '../res/theme'

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity 
        {...this.props} 
        style={[
          {
            height: 40, 
            justifyContent: 'center', 
            borderRadius: 20, 
            backgroundColor: THEME.colorPrimary
          }, 
          this.props.style
          ]
        }
        activeOpacity={0.7}
      >
        <Text style={{
          alignSelf: 'center',
          textAlign: 'center', 
          color: this.props.textColor ? this.props.textColor : 'white' 
        }}>{this.props.text}</Text>
      </TouchableOpacity>
    )
  }
}
import React, {Component} from 'react'
import {
  Text, 
  TouchableOpacity
} from 'react-native'
import THEME from '../res/theme'

export default class Button extends Component {
  render() {
    return <TouchableOpacity style={[{
      backgroundColor: THEME.colorPrimary,
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 12,
      paddingBottom: 12,
      borderRadius: 4,
      justifyContent: 'center'
    }, this.props.style]} activeOpacity={0.7} onPress={this.props.onPress}>
      <Text style={{ color: 'white', alignSelf: 'center', fontSize: 14 }}>{this.props.text}</Text>
    </TouchableOpacity>
  }
}
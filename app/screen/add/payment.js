import React, { Component } from 'react'
import { 
  View,
  Text
} from 'react-native'

export default class Payment extends Component {
  static navigationOptions = { header: null }
  
  render() {
    return <View>
      <Text>Payment</Text>
    </View>
  }
}
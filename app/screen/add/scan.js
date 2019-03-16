import React, { Component } from 'react'
import { 
  View,
  Text
} from 'react-native'

export default class ScanQRCode extends Component {
  static navigationOptions = { header: null }
  
  render() {
    return <View>
      <Text>Scan QR Code</Text>
    </View>
  }
}
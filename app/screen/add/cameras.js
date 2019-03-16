import React, { Component } from 'react'
import { 
  View,
  Text
} from 'react-native'

export default class CameraList extends Component {
  static navigationOptions = { header: null }

  render() {
    return <View>
      <Text>Camera List</Text>
    </View>
  }
}
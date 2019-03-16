import React, { Component } from 'react'
import { 
  View,
  Text
} from 'react-native'

export default class ServiceChooser extends Component {
  static navigationOptions = { header: null }
  
  render() {
    return <View>
      <Text>Service Chooser</Text>
    </View>
  }
}
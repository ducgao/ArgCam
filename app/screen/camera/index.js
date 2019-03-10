import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  Text
} from 'react-native'
import THEME from '../../res/theme'

export default class Camera extends Component {
  static navigationOptions = { header: null }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ alignSelf: 'center' }}>Camera - I have no idea how to draw this screen</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground,
    justifyContent: 'center'
  }
})

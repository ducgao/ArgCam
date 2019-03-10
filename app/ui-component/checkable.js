import React, {Component} from 'react'
import {
  Text, 
  TextInput,
  View,
  StyleSheet
} from 'react-native'
import THEME from '../res/theme'
import Ionicons from 'react-native-ionicons'

export default class Checkable extends Component {
  state = {
    checked: false
  }

  render() {
    const checkableIcon = this.state.checked ? "ios-radio-button-on" : "ios-radio-button-off"
    const checkableColor = this.state.checked ? THEME.active : THEME.unactive
    return <View style={[styles.container, this.props.style]}>
      <Ionicons 
        style={styles.icon} 
        name={checkableIcon} 
        size={20} 
        color={checkableColor} 
        onPress={() => this.setState({ checked: !this.state.checked })}
      />
      <Text style={styles.text}>{this.props.title}</Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  text: {
    flex: 1
  },
  icon: {
    marginEnd: 8
  }
})
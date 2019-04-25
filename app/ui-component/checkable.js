import React, {Component} from 'react'
import {
  Text, 
  TouchableWithoutFeedback,
  View,
  StyleSheet
} from 'react-native'
import THEME from '../res/theme'
import Ionicons from 'react-native-ionicons'

export default class Checkable extends Component {
  state = {
    checked: false
  }

  isChecked = () => {
    return this.state.checked
  }

  render() {
    const checkableIcon = this.state.checked ? "ios-radio-button-on" : "ios-radio-button-off"
    const checkableColor = this.state.checked ? THEME.active : THEME.unactive
    return <TouchableWithoutFeedback 
      style={[styles.container, this.props.style]}
      onPress={() => this.setState({ checked: !this.state.checked })}
      >
      <View style={[styles.container, this.props.style]}>
        <Ionicons 
          style={styles.icon} 
          name={checkableIcon} 
          size={20} 
          color={checkableColor} 
        />
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
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
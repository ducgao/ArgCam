import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native'
import Ionicons from 'react-native-ionicons'
import STRING from '../../res/string'
import THEME from '../../res/theme'

export default class Header extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.text}>{STRING.welcome}</Text>
        <Ionicons style={styles.icon} name="ios-add-circle-outline" size={32} color={THEME.colorPrimary} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingStart: 16,
    paddingEnd: 16,
    flexDirection: 'row'
  },
  text: {
    fontSize: 28,
    fontWeight: '500'
  },
  icon: {
    position: 'absolute',
    right: 16
  }
})

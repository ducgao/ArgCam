import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-ionicons'
import STRING from '../../res/string'
import THEME from '../../res/theme'
import string from '../../res/string';

export default class Header extends Component {
  renderNext() {
    if (this.props.onRequestNextAction) {
      return <Text activeOpacity={0.7} style={styles.icon} onPress={this.props.onRequestNextAction}>
        {string.next}
      </Text>
    }
  }
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity activeOpacity={0.7} onPress={this.props.onBack}>
          <Ionicons 
            name="ios-arrow-back" 
            size={28} 
            color={THEME.colorPrimary}
          />  
        </TouchableOpacity>
        <Text style={styles.text}>{this.props.title}</Text>
        {this.renderNext()}
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
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 16
  },
  icon: {
    position: 'absolute',
    right: 16
  }
})

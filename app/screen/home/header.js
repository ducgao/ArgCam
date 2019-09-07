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

export default class Header extends Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {
          this.props.showBack === false ? null : (
            <TouchableOpacity activeOpacity={0.7} style={{ marginRight: 12 }} onPress={this.props.onRequestBack} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Ionicons 
                name="ios-arrow-back" 
                size={32} 
                color={THEME.colorPrimary}
              />  
            </TouchableOpacity>
          )
        }
        <Text style={styles.text}>{this.props.headerTitle}</Text>
        <TouchableOpacity activeOpacity={0.7} style={styles.icon} onPress={this.props.onRequestAddCamera} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Ionicons 
            name="ios-add-circle-outline" 
            size={32} 
            color={THEME.colorPrimary}
          />  
        </TouchableOpacity>
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

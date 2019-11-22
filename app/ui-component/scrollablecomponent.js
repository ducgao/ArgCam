import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet
} from 'react-native'
import THEME from '../res/theme'

export default class ScrollableComponent extends Component {

  render() {
    return(
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View>
          {this.props.children}
        </View>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground
  }
})
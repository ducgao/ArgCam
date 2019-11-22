import React, { Component } from 'react'
import {
  View,
  ScrollView,
  RefreshControl
} from 'react-native'

export default class PTRComponent extends Component {

  state = {
    refreshing: false
  }

  _onRefresh = () => {
    this.setState({ refreshing: true })
    if (this.props.doOnRefreshing) {
      this.props.doOnRefreshing()
    }
  }

  setRefreshDone = () => {
    this.setState({ refreshing: false })
  }

  render() {
    return(
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}/>
      }>
        <View>
          {this.props.children}
        </View>
      </ScrollView>
    )
  }
}
import React, {Component} from 'react'
import {
  Dimensions,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import Ionicons from 'react-native-ionicons'
import THEME from '../../res/theme'
import Home from '../home'
import Cloud from '../cloud'
import Profile from '../profile'
import { isIphoneX } from '../../utils'

export default class Main extends Component {
  static navigationOptions = { header: null }

  icons = [
    'ios-videocam',
    'ios-cloud',
    'ios-person'
  ]

  titles = [
    'Home',
    'Cloud',
    'Profile'
  ]

  homeRef = null
  cloudRef = null
  profileRef = null

  state = {
    index: 0,
    routes: [
      { index: 0, key: 'home', title: 'Home' },
      { index: 1, key: 'cloud', title: 'Cloud' },
      { index: 2, key: 'profile', title: 'Profile' }
    ]
  }

  constructor(props) {
    super(props)

    this.homeInstance = () => <Home ref={ref => this.homeRef = ref} navigation={this.props.navigation} />
    this.cloudInstance = () => <Cloud ref={ref => this.cloudRef = ref} navigation={this.props.navigation} />
    this.profileInstance = () => <Profile ref={ref => this.profileRef = ref} navigation={this.props.navigation} />
  }

  onTabIndexChanged = (index) => {
    this.setState({ index })
  }

  renderLabel = (props) => {
    const route = props.route
    const iconColor = this.state.index == route.index ? THEME.colorPrimary : THEME.unactive
    const iconName = this.icons[route.index] 
    const iconTitle = this.titles[route.index] 

    return this.renderTabIcon(iconTitle, iconName, iconColor)
  }

  renderTabIcon(title, iconName, iconColor) {
    return <View style={styles.tabIconContainer}>
      <Ionicons
        name={iconName}
        color={iconColor}
        size={20}
        style={styles.tabIcon}
      />
      <Text numberOfLines={1} style={[styles.tabText, { color: iconColor }]}>{title}</Text>
    </View>
  }

  renderTabBar = (props) => {
    return <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={{ backgroundColor: null }}
      renderLabel={this.renderLabel}
    />
  }

  render() {
    const tabView = <TabView
      style={{ backgroundColor: THEME.tabBackground }}
      swipeEnabled={false}
      renderTabBar={this.renderTabBar}
      onIndexChange={this.onTabIndexChanged}
      navigationState={this.state}
      tabBarPosition={'bottom'}
      initialLayout={{ 
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
        }}
      renderScene={SceneMap({
        home: this.homeInstance,
        cloud: this.cloudInstance,
        profile: this.profileInstance
      })}
    />
    return tabView
  }
}

const styles = StyleSheet.create({
  tabIconContainer: {
    height: 44, 
    justifyContent: 'center'
  },
  tabText: {
    fontSize: 9,
    alignSelf: 'center'
  },
  tabIcon: { 
    alignSelf: 'center' 
  },
  tabBar: {
    backgroundColor: null, 
    height: 56, 
    marginBottom: isIphoneX() ? 16 : 0
  }
})
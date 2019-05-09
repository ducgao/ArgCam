import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  Image,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-ionicons'

export default class Header extends Component {

  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.data)
    }
  }

  onSettingPress = () => {
    if (this.props.onSettingPress) {
      this.props.onSettingPress(this.props.data)
    }
  }

  renderHeader() {
    const data = this.props.data
    const name = data.camera_name
    return <View style={styles.headerContainer}>
      <Text style={styles.title}>{name}</Text>
      <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7} onPress={this.props.onSettingPress}>
        <Ionicons style={styles.icon} name="ios-settings" size={20} color={'gray'} />
      </TouchableOpacity>
    </View>
  }

  renderThumbnail() {
    const data = this.props.data
    const thumbnail = data.thumbnail
    const imageSource = thumbnail ? { uri: thumbnail } : require('../../res/images/camera-default-thumb.png')
    return <TouchableWithoutFeedback style={styles.thumbnail} onPress={this.onPress}>
      <View style={styles.thumbnail}>
        <Image 
          style={[styles.thumbnail, { width: '100%', backgroundColor: '#d1d3d4' }]}
          source={imageSource}
          resizeMode='cover'
          resizeMethod='resize'
        />
      </View>
    </TouchableWithoutFeedback>
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderHeader()}
        {this.renderThumbnail()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingStart: 16,
    paddingEnd: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2
  },
  iconContainer: {
    alignSelf: 'center',
    position: 'absolute',
    right: 16,
    flexDirection: 'row'
  },
  icon: {
    marginStart: 12
  },
  thumbnail: {
    flex: 1,
    height: 160,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden'
  },
  headerContainer: {
    flexDirection: 'row', 
    backgroundColor: 'white', 
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8,
    paddingStart: 16,
    paddingEnd: 16, 
    paddingTop: 8, 
    paddingBottom: 8
  },
  title: {
    fontSize: 20, 
    fontWeight: '500'
  }
})

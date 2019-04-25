import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  Image,
  View,
  TouchableWithoutFeedback
} from 'react-native'
import Ionicons from 'react-native-ionicons'

export default class Header extends Component {

  renderHeader() {
    const data = this.props.data
    const name = data.camera_name
    return <View style={styles.headerContainer}>
      <Text style={styles.title}>{name}</Text>
      <View style={styles.iconContainer}>
        <Ionicons style={styles.icon} name="ios-play-circle" size={20} color={'gray'} />
        <Ionicons style={styles.icon} name="ios-settings" size={20} color={'gray'} />
      </View>
    </View>
  }

  renderThumbnail() {
    const data = this.props.data
    const thumbnail = data.thumbnail
    const imageSource = thumbnail ? { uri: thumbnail } : require('../../res/images/camera-default-thumb.png')
    return <TouchableWithoutFeedback style={styles.thumbnail} onPress={this.props.onPress}>
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

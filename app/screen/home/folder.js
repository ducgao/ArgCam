import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text, 
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'

export default class Folder extends Component {

  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.data)
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.style]} activeOpacity={0.7} onPress={this.onPress}>
        <Image
          style={styles.thumbnail}
          resizeMethod='resize'
          resizeMode='contain'
          source={require('../../res/images/folder.png')}
        />
        <Text>{this.props.data.name}</Text>
      </TouchableOpacity>
    )
  }
}

const ITEM_WIDTH = Dimensions.get('window').width / 2 - 24

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  thumbnail: {
    width: ITEM_WIDTH - 24,
    height: ITEM_WIDTH - 24,
    overflow: 'hidden'
  }
})

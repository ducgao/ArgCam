import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-ionicons'
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog'

export default class Popup extends Component {

  renderPopupContent() {
    return <DialogContent>
      <View style={styles.container}>
        <Text style={styles.title}>Camera Q.1</Text>  
        <Text style={styles.hint}>Chọn nhóm cho camera của bạn</Text>  
        <TouchableOpacity style={styles.closeContainer} activeOpacity={0.7} onPress={this.props.onRequestClose}>
          <Ionicons name="ios-close-circle" size={24} color={'gray'} />
        </TouchableOpacity>
      </View>
    </DialogContent>
  }

  render() {
    return <Dialog
      visible={this.props.dialogVisible}
      dialogAnimation={new SlideAnimation({
        slideFrom: 'bottom',
      })}
    >
      {this.renderPopupContent()}
    </Dialog>
  }
}

const dialogWidth = Dimensions.get('window').width * 0.8
const dialogHeight = Dimensions.get('window').height * 0.6
const styles = StyleSheet.create({
  container: {
    width: dialogWidth, 
    height: dialogHeight, 
    paddingTop: 12
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18
  },
  hint: {
    fontSize: 12, 
    fontStyle: 'italic'
  },
  closeContainer: {
    position: 'absolute', 
    right: 0, 
    top: 12
  }
})

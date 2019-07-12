import React, { Component } from 'react'
import { 
  StyleSheet, 
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native'
import Ionicons from 'react-native-ionicons'
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog'

export default class Popup extends Component {

  onRequestLeaveGroup = () => {
    Alert.alert("Rời nhóm", "Bạn có chắc chắn muốn rời khỏi tất cả các nhóm không?")
  }

  renderHeader() {
    return [
      <Text style={styles.title}>Camera Q.1</Text>,
      <Text style={styles.hint}>Chọn nhóm cho camera của bạn</Text>,
      <TouchableOpacity style={styles.closeContainer} activeOpacity={0.7} onPress={this.props.onRequestClose}>
        <Ionicons name="ios-close-circle" size={24} color={'gray'} />
      </TouchableOpacity>
    ]
  }

  renderFooter() {
    return <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
      <TouchableOpacity activeOpacity={0.7} onPress={this.onRequestLeaveGroup}>
        <Text style={{ fontSize: 16, fontStyle: 'italic', marginRight: 20, color: 'red' }}>Rời nhóm</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={{ fontSize: 16, fontStyle: 'italic', marginRight: 8, color: '#3366BB' }}>OK</Text>
      </TouchableOpacity>
    </View>
  }

  renderPopupContent() {
    return <DialogContent>
      <View style={styles.container}>
        {this.renderHeader()}
        <View style={{ flex: 1, marginTop: 8, marginBottom: 8 }}/>
        {this.renderFooter()}
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
    fontSize: 18,
    marginRight: 26,
    fontWeight: 'bold'
  },
  hint: {
    fontSize: 12, 
    marginRight: 26,
    fontStyle: 'italic',
  },
  closeContainer: {
    position: 'absolute', 
    right: 0, 
    top: 12
  }
})

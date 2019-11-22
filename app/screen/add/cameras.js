import React, { Component } from 'react'
import { 
  View,
  StyleSheet
} from 'react-native'
import Header from './header'
import STRING from '../../res/string'
import Api from '../../api'

export default class CameraList extends Component {
  static navigationOptions = { header: null }

  state = {
    cameraList: null
  }

  api = Api.instance()

  qrCode = null

  constructor(props) {
    super(props)

    this.qrCode = this.props.navigation.getParam('code')
  }

  componentDidMount() {
    if (this.qrCode == null) {
      //TODO
      return
    }

    this.api.getCameraListFromQRCode(this.qrCode).then(res => {
      this.setState({
        cameraList: res.data
      })
    })
    .catch(_ => {
      //TODO
    })
  }

  renderCameraList() {
    
  }

  render() {
    return <View>
      <Header 
        style={styles.header} 
        title={STRING.selectCameras}
        onBack={() => this.props.navigation.goBack()}
      />
      {this.renderCameraList()}
    </View>
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24
  }
})
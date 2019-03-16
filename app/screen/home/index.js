import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native'
import STRING from '../../res/string'
import Header from './header'
import CameraItem from './camera'
import CameraRepository from '../../repository/camera'
import THEME from '../../res/theme'
import { isIphoneX } from '../../utils'
import Api from '../../api'
import { navigateToCamera, navigateToAddCameraScanQRCode } from '../../common/router'

export default class Home extends Component {
  static navigationOptions = { header: null }

  api = Api.instance()
  cameraRepository = CameraRepository.instance()

  state = {
    cameraList: null
  }

  constructor(props) {
    super(props)

    this.api.getCameraList().then(res => {
      this.cameraRepository.setCameraList(res.camera_list.DEFAULT)
    })
    .catch(e => {
      Alert.alert(STRING.appName, e)
    })
  }

  componentDidMount() {
    this.cameraRepository.addObserver(this.camerasObserver)
  }

  componentWillUnmount() {
    this.cameraRepository.removeObserver(this.camerasObserver)
  }

  camerasObserver = (cameras) => {
    this.setState({ cameraList: cameras })
  }

  requestOpenCamera(item) {
    navigateToCamera(this, item)
  }

  requestAddCamera() {
    navigateToAddCameraScanQRCode(this)
  }

  renderCameraItem = ({item}) => {
    return <CameraItem 
      style={styles.cameraItem} 
      data={item}
      onPress={() => this.requestOpenCamera(item)}
    />
  }

  renderHeader() {
    return <Header style={styles.header} onRequestAddCamera={this.requestAddCamera}/>
  }

  renderCameras() {
    if (this.state.cameraList == null) {
      return <ActivityIndicator style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }}/>
    }
    else {
      return <FlatList 
        style={styles.cameraList}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => 'camera-item-' + index}
        data={this.state.cameraList} 
        renderItem={this.renderCameraItem}
      />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {this.renderCameras()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground
  },
  header: {
    marginTop: 44 + (isIphoneX ? 20 : 0)
  },
  cameraList: {
    marginTop: 12,
    paddingTop: 8
  },
  cameraItem: {
    marginBottom: 16
  }
})

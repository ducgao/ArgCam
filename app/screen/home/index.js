import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert
} from 'react-native'
import STRING from '../../res/string'
import Header from './header'
import CameraItem from './camera'
import FolderItem from './folder'
import CameraRepository from '../../repository/camera'
import THEME from '../../res/theme'
import { isIphoneX } from '../../utils'
import Api from '../../api'
import { navigateToCamera, navigateToAddCameraScanQRCode } from '../../common/router'

const PRESENT_ITEM_TYPE = {
  FOLDER: 1,
  FILE: 2,
  CAMERA: 3
}

export default class Home extends Component {
  static navigationOptions = { header: null }

  stackFolder = []

  api = Api.instance()
  cameraRepository = CameraRepository.instance()

  state = {
    presentList: [],
    showBack: false,
    headerTitle: STRING.welcome
  }

  constructor(props) {
    super(props)

    this.api.getFolder().then(res => {
      const presentList = res.elements.map(e => {
        let type = PRESENT_ITEM_TYPE.FOLDER

        if (e.camera === true) {
          type = PRESENT_ITEM_TYPE.CAMERA
        }
        else if (e.file === true) {
          type = PRESENT_ITEM_TYPE.FILE
        }

        const content = this.parseContent(e.files)

        return {
          id: e.id,
          name: e.name,
          type,
          content
        }
      })

      this.setState({ presentList })
      this.stackFolder.push(presentList)
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

  requestOpenCamera = (item) => {
    navigateToCamera(this, item)
  }

  requestOpenCameraSetting = (item) => {
    //TODO
  }

  requestAddCamera = () => {
    navigateToAddCameraScanQRCode(this)
  }

  requestBack = () => {
    this.stackFolder.pop()
    const item = this.stackFolder[this.stackFolder.length - 1]

    if (Array.isArray(item)) {
      this.setState({ 
        presentList: item, 
        headerTitle: STRING.welcome,
        showBack: false
      })  
    }
    else {
      this.setState({ 
        presentList: item.content, 
        headerTitle: item.name,
        showBack: true 
      })
    }
  }

  parseContent = (files) => {
    if (Array.isArray(files)) {
      return files.map(e => {
        let type = PRESENT_ITEM_TYPE.FOLDER

        if (e.camera === true) {
          type = PRESENT_ITEM_TYPE.CAMERA
        }
        else if (e.file === true) {
          type = PRESENT_ITEM_TYPE.FILE
        }

        const content = this.parseContent(e.files)

        return {
          id: e.id,
          name: e.name,
          type,
          content
        }
      })
    }

    return null;
  }

  onItemPress = (item) => {
    this.setState({ 
      presentList: item.content, 
      headerTitle: item.name,
      showBack: true 
    })
    this.stackFolder.push(item)
  } 

  renderCameraItem = ({item}) => {
    if (item.type === PRESENT_ITEM_TYPE.FOLDER) {
      return <FolderItem data={item} onPress={this.onItemPress}/>
    }

    return <CameraItem 
      style={styles.cameraItem} 
      data={item}
      onPress={this.requestOpenCamera}
      onSettingPress={this.requestOpenCameraSetting}
    />
  }

  renderHeader() {
    return (
      <Header 
        style={styles.header} 
        onRequestAddCamera={this.requestAddCamera}
        onRequestBack={this.requestBack}
        headerTitle={this.state.headerTitle}
        showBack={this.state.showBack}
      />
    )
  }

  renderCameras() {
    if (this.state.presentList == null) {
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
        data={this.state.presentList} 
        renderItem={this.renderCameraItem}
        numColumns={2}
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
    marginTop: 44 + (isIphoneX() ? 20 : 0)
  },
  cameraList: {
    marginHorizontal: 8,
    marginTop: 12,
    paddingTop: 8
  },
  cameraItem: {
    marginBottom: 16
  }
})

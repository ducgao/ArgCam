import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import THEME from '../../res/theme'
import STRING from '../../res/string'
import Api from '../../api'
import CameraItem from '../home/camera'
import Icon from 'react-native-ionicons'
import { RtmpView } from 'react-native-rtmpview'

export default class Camera extends Component {
  static navigationOptions = { header: null }

  state = {
    controlState: null,
    playerState: null,
    streamUrl: null
  }

  api = Api.instance()

  componentDidMount() {
    const cameraInfo = this.props.navigation.getParam('info')
    const cameraId = cameraInfo.camera_code

    this.api.getCameraStreamingUrl(cameraId).then(res => {
      this.setState({
        streamUrl: res.url
      })
    })
    .catch(e => {
      alert(JSON.stringify(e))
    })
  }

  onCameraPlaying = () => {
    this.setState({
      playerState: 'playing'
    })
  }

  requestPlay = () => {
    if (this.player) {
      if (this.state.playerState == null) {
        this.setState({
          playerState: 'loading'
        }, () => {
          this.player.initialize()
          this.player.play() 
        })  
      }
      else {
        this.setState({
          playerState: 'loading'
        }, () => {
          this.player.play() 
        })  
      }
    }
  }

  requestPause = () => {
    if (this.player) {
      this.setState({
        playerState: 'pausing'
      }, () => {
        this.player.pause()
      })
    }
  }
  
  requestMute = () => {
    if (this.player) {
      //TODO
    }
  }

  onControlBlockClick = () => {
    if (this.state.playerState == 'playing') {
      this.setState({ controlState: 'show' }, () => {
        setTimeout(() => {
          this.setState({ controlState: null })
        }, 2000)
      })
    }
  }

  renderCamera() {
    // if (this.state.streamUrl == null) {
    //   return null
    // }

    return <RtmpView
      style={styles.videoPlayer}
      shouldMute={false}
      onFirstVideoFrameRendered={this.onCameraPlaying}
      ref={e => this.player = e }
      url={"rtmp://stream1.livestreamingservices.com:1935/tvmlive/tvmlive"}
    />
  }

  renderControls() {
    var content = null
    if (this.state.playerState == 'playing') {
      if (this.state.controlState == 'show') {
        content = <TouchableOpacity activeOpacity={0.7} onPress={this.requestPause}>
          <Icon 
            name="md-pause" 
            size={100} 
            color="white"
            style={{ alignSelf: 'center' }} 
          />
        </TouchableOpacity>
      }
    }

    if (this.state.playerState == 'loading') {
      content = <ActivityIndicator color='white' size='large' />
    }

    if (this.state.playerState == null || this.state.playerState == 'pausing') {
      content = <TouchableOpacity activeOpacity={0.7} onPress={this.requestPlay}>
        <Icon 
          name="md-arrow-dropright-circle" 
          size={100} 
          color="white"
          style={{ alignSelf: 'center' }} 
        />
      </TouchableOpacity>
    }

    return <TouchableOpacity style={styles.videoControllers} onPress={this.onControlBlockClick}>
      <View>
        {content}
      </View>
    </TouchableOpacity>
  }

  renderRelatedCamera() {
    const cameraList = [
      {
        camera_name: "Camera Q.1",
        thumbnail: "https://media.architecturaldigest.com/photos/5c54be97f53444395afc2ef6/16:9/w_1280,c_limit/AD030119_KRIS_JENNER_01.jpg"
      },
      {
        camera_name: "Camera Q.6",
        thumbnail: "https://wp.zillowstatic.com/trulia/wp-content/uploads/sites/1/2016/07/kendall-jenner-west-hollywood-home-7-1-16-living-3.jpg"
      },
      {
        camera_name: "Camera Q.Tan Binh",
        thumbnail: "http://www.carlosericlopez.com/wp-content/uploads/2017/04/krisjenner_carlosericlopez_15-1612x1075.jpg"
      }
    ]
    const title = <Text 
      key="related-cameras-title"
      style={styles.relatedCameraTitle}>{"HCMC Group"}</Text>
    const cameras = <FlatList 
      key="related-cameras-content"
      style={styles.cameraList}
      showsVerticalScrollIndicator={false}
      keyExtractor={(_, index) => 'camera-item-' + index}
      data={cameraList} 
      renderItem={this.renderCameraItem}
      />
    return [title, cameras]
  }

  renderCameraItem = ({item}) => {
    return <CameraItem 
      style={styles.cameraItem} 
      data={item}
    />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCamera()}
        {this.renderControls()}
        {this.renderRelatedCamera()}
      </View>
    )
  }
}

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground
  },
  videoPlayer: {
    position: 'absolute',
    width: '100%',
    height: '50%'
  },
  videoControllers: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    justifyContent: 'center'
  },
  relatedCameraTitle: {
    position: 'absolute',
    top: windowHeight / 2,
    left: 16,
    fontSize: 20,
    fontWeight: 'bold'
  },
  cameraList: {
    position: 'absolute',
    top: windowHeight / 2 + 40,
    width: windowWidth,
    height: windowHeight / 2 - 64
  },
  cameraItem: {
    marginBottom: 16
  }
})

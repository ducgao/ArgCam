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
  state = {
    controlState: null,
    playerState: null,
    streamUrl: null
  }

  api = Api.instance()

  componentDidMount() {
    const cameraInfo = this.props.navigation.getParam('info')
    this.setState({
      streamUrl: cameraInfo.url
    }, this.requestPlay)
    // const cameraId = cameraInfo.camera_code

    // this.api.getCameraStreamingUrl(cameraId).then(res => {
    //   this.setState({
    //     streamUrl: res.url
    //   })
    // })
    // .catch(e => {
    //   alert(JSON.stringify(e))
    // })
  }

  onCameraPlaying = (data) => {
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
    if (this.state.streamUrl == null) {
      return null
    }

    return <RtmpView
      style={styles.videoPlayer}
      shouldMute={false}
      scalingMode={'MovieScalingModeAspectFit'}
      onFirstVideoFrameRendered={this.onCameraPlaying}
      ref={e => this.player = e }
      url={this.state.streamUrl}
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

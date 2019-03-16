import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity
} from 'react-native'
import THEME from '../../res/theme'
import Api from '../../api'
import { RtmpView } from 'react-native-rtmpview'

export default class Camera extends Component {
  static navigationOptions = { header: null }

  state = {
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

  render() {
    if (this.state.streamUrl == null) {
      return null
    }

    console.log("STREAM URL: " + this.state.streamUrl)
    return (
      <View style={styles.container}>
        <RtmpView
          style={{ 
            width: '100%',
            height: '50%'
          }}
          shouldMute={true}
          ref={e => { this.player = e }}
          onPlaybackState={(data) => {
            // alert(JSON.stringify(data))
            // this.handlePlaybackState(data);
          }}
          onFirstVideoFrameRendered={(data) => {
            // alert(JSON.stringify(data))
            // this.handleFirstVideoFrameRendered(data);
          }}
          url={"rtmp://camstream.vcv.vn/live/0b2fc1b6187ebafe2ff3aa2ba42e0be7?st=zD1aKGXm_AOgj8KPrq1iTA&e=1552712560072"}/>
          <TouchableOpacity onPress={() => { 
            this.player.initialize()
            this.player.play() 
          }}>
            <Text>Play</Text>
          </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground,
    justifyContent: 'center'
  }
})

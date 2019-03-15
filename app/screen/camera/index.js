import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native'
import THEME from '../../res/theme'
import Api from '../../api'
import { RtmpView } from 'react-native-rtmpview'

export default class Camera extends Component {
  static navigationOptions = { header: null }

  state = {
    streamUrl: "rtmp://sentirlite.com/live/91c331806c81625b7d168abd12a91350?st=rUMhld1F6HRyMdrZwVnogA&e=1552665308794"
  }

  api = Api.instance()

  componentDidMount() {
    // const cameraInfo = this.props.navigation.getParam('info')
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

  render() {
    // if (this.state.streamUrl == null) {
    //   return null
    // }

    return (
      <View style={styles.container}>
        <RtmpView
          style={{ 
            width: Dimensions.get('window').width, 
            height: Dimensions.get('window').width,
            backgroundColor: 'red' }}
          shouldMute={true}
          ref={e => { this.player = e; }}
          onPlaybackState={(data) => {
            alert(JSON.stringify(data))
            // this.handlePlaybackState(data);
          }}
          onFirstVideoFrameRendered={(data) => {
            alert(JSON.stringify(data))
            // this.handleFirstVideoFrameRendered(data);
          }}
          url={this.state.streamUrl}/>
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

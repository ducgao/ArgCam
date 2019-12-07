/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import THEME from '../../res/theme';
import STRING from '../../res/string';
import Api from '../../api';
import Icon from 'react-native-ionicons';
// import {RtmpView} from 'react-native-rtmpview';
import {NodePlayerView} from 'react-native-nodemediaclient';
import Orientation from 'react-native-orientation';

const OnPlayBack = () => {
  OnPlayBackHandler();
};

let OnPlayBackHandler = () => {};

export default class Camera extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title', 'Camera'),
      headerRight: (
        <TouchableOpacity style={{marginRight: 8}} onPress={OnPlayBack}>
          <Text style={{color: '#3f86f7'}}>{STRING.playBack}</Text>
        </TouchableOpacity>
      ),
    };
  };

  state = {
    controlState: null,
    playerState: null,
    streamUrl: null,
  };

  api = Api.instance();

  constructor(props) {
    super(props);

    const cameraInfo = props.navigation.getParam('info');
    this.state = {
      controlState: null,
      playerState: null,
      streamUrl: cameraInfo.url,
    };
  }

  componentDidMount() {
    Orientation.unlockAllOrientations();
    const cameraInfo = this.props.navigation.getParam('info');

    OnPlayBackHandler = () => {
      this.props.navigation.navigate('PlayBack', {
        info: cameraInfo,
        title: cameraInfo.name,
      });
    };

    this.requestPlay();
  }

  onCameraPlaying = data => {
    this.setState({
      playerState: 'playing',
    });
    this.player.stop();
  };

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  requestPlay = () => {
    if (this.player) {
      if (this.state.playerState == null) {
        this.setState(
          {
            playerState: 'loading',
          },
          () => {
            // this.player.initialize();
            this.player.start();
          },
        );
      } else {
        this.setState(
          {
            playerState: 'loading',
          },
          () => {
            this.player.start();
          },
        );
      }
    }
  };

  requestPause = () => {
    if (this.player) {
      this.setState(
        {
          playerState: 'pausing',
        },
        () => {
          this.player.stop();
        },
      );
    }
  };

  requestMute = () => {
    if (this.player) {
      //TODO
    }
  };

  onControlBlockClick = () => {
    if (this.state.playerState === 'playing') {
      this.setState({controlState: 'show'}, () => {
        setTimeout(() => {
          this.setState({controlState: null});
        }, 2000);
      });
    }
  };

  renderCamera() {
    if (this.state.streamUrl == null) {
      return null;
    }

    return (
      <NodePlayerView
        style={styles.videoPlayer}
        ref={e => (this.player = e)}
        inputUrl={this.state.streamUrl}
        scaleMode={'ScaleAspectFit'}
        bufferTime={300}
        maxBufferTime={1000}
        autoplay={false}
        onStatus={(_, m) => {
          if (m === 'NetStream.Buffer.Full') {
            this.setState({
              playerState: 'playing',
            });
          }
        }}
      />
    );
  }

  renderControls() {
    var content = null;
    if (this.state.playerState === 'playing') {
      if (this.state.controlState === 'show') {
        content = (
          <TouchableOpacity activeOpacity={0.7} onPress={this.requestPause}>
            <Icon
              name="md-pause"
              size={100}
              color="white"
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>
        );
      }
    }

    if (this.state.playerState === 'loading') {
      content = <ActivityIndicator color="white" size="large" />;
    }

    if (
      this.state.playerState == null ||
      this.state.playerState === 'pausing'
    ) {
      content = (
        <TouchableOpacity activeOpacity={0.7} onPress={this.requestPlay}>
          <Icon
            name="md-arrow-dropright-circle"
            size={100}
            color="white"
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.videoControllers}
        onPress={this.onControlBlockClick}>
        <View>{content}</View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCamera()}
        {this.renderControls()}
      </View>
    );
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground,
  },
  videoPlayer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  videoControllers: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  relatedCameraTitle: {
    position: 'absolute',
    top: windowHeight / 2,
    left: 16,
    fontSize: 20,
    fontWeight: 'bold',
  },
  cameraList: {
    position: 'absolute',
    top: windowHeight / 2 + 40,
    width: windowWidth,
    height: windowHeight / 2 - 64,
  },
  cameraItem: {
    marginBottom: 16,
  },
});

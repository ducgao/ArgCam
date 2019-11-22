/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {NodePlayerView} from 'react-native-nodemediaclient';
// import {RtmpView} from 'react-native-rtmpview';
import MemHelper from './memhelper';

export default class Header extends PureComponent {
  state = {
    isPlaying: false,
  };

  memHelper = MemHelper.instance();

  componentDidMount() {
    const beginPlay = () => {
      // this.player.initialize();
      this.player.start();
    };
    this.memHelper.addOperation(beginPlay);
  }

  onPress = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props.data);
    }
  };

  onSettingPress = () => {
    if (this.props.onSettingPress) {
      this.props.onSettingPress(this.props.data);
    }
  };

  onCameraPlaying = () => {
    this.setState({isPlaying: true});
    this.player.stop();
    this.memHelper.releaseOne();
  };

  renderHeader() {
    const data = this.props.data;
    const name = data.name;
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode={'middle'}>
          {name}
        </Text>
        {/* <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7} onPress={this.props.onSettingPress}>
        <Ionicons style={styles.icon} name="ios-settings" size={20} color={'gray'} />
      </TouchableOpacity> */}
      </View>
    );
  }

  renderThumbnail() {
    const data = this.props.data;
    return (
      <View style={styles.thumbnail}>
        <NodePlayerView
          style={styles.thumbnail}
          inputUrl={data.url}
          scaleMode={'ScaleAspectFit'}
          bufferTime={300}
          maxBufferTime={1000}
          autoplay={false}
          ref={e => (this.player = e)}
          onStatus={(_, m) => {
            if (m === 'NetStream.Buffer.Full') {
              this.onCameraPlaying();
            }
          }}
        />
        {this.state.isPlaying ? (
          undefined
        ) : (
          <ActivityIndicator
            style={{
              position: 'absolute',
              width: ITEM_WIDTH,
              height: ITEM_WIDTH - 20,
            }}
            size="small"
            color="black"
          />
        )}
      </View>
    );
  }

  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.onPress}>
        <View>
          {this.renderHeader()}
          {this.renderThumbnail()}
        </View>
      </TouchableOpacity>
    );
  }
}

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const ITEM_WIDTH = Math.min(WINDOW_HEIGHT, WINDOW_WIDTH) / 2 - 24;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  iconContainer: {
    alignSelf: 'center',
    position: 'absolute',
    right: 16,
    flexDirection: 'row',
  },
  icon: {
    marginStart: 12,
  },
  thumbnail: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH - 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#d1d3d4',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingStart: 8,
    paddingEnd: 8,
    paddingTop: 8,
  },
  title: {
    flex: 1,
    height: 20,
  },
});

/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import THEME from '../../res/theme';
import STRING from '../../res/string';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import Button from '../../ui-component/button';
import Api from '../../api';
// import {RtmpView} from 'react-native-rtmpview';
import {NodePlayerView} from 'react-native-nodemediaclient';

export default class PlayBack extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('title', 'Camera'),
    };
  };

  state = {
    loading: false,
    playbackList: undefined,
    currentPlayUrl: undefined,
    currentPlayIndex: 0,
  };

  requestGetData = () => {
    const date = this.datePicker.getCurrentDate();
    // const time = this.timePicker.getCurrentTime()
    const cameraInfo = this.props.navigation.getParam('info');

    this.setState({loading: true});
    Api.instance()
      .getPlayBackInfo(cameraInfo.id, date, 0)
      .then(res => {
        const record_list = [];
        for (var key in res.record_list) {
          record_list.push(res.record_list[key]);
        }

        this.setState(
          {
            playbackList: record_list,
            currentPlayUrl: record_list[0].view_record_url,
            loading: false,
          },
          () => {
            if (this.state.playbackList) {
              this.player.initialize();
              this.player.play();
            } else {
              alert(JSON.stringify(STRING.noPlayback));
            }
          },
        );
      })
      .catch(_ => {
        alert(JSON.stringify(STRING.noPlayback));
        this.player.stop();
        this.setState({loading: false});
      });
  };

  onPlaybackState = data => {
    if (data.nativeEvent.state == 0) {
      const nextIndex = this.state.currentPlayIndex + 1;

      if (nextIndex > this.state.playbackList.length - 1) {
        return;
      }

      const nextUrl = this.state.playbackList[nextIndex].view_record_url;

      this.setState(
        {
          currentPlayUrl: nextUrl,
          currentPlayIndex: nextIndex,
        },
        () => {
          if (this.state.playbackList) {
            this.player.initialize();
            this.player.play();
          } else {
            alert(JSON.stringify(STRING.noPlayback));
          }
        },
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <NodePlayerView
          style={{
            width: '100%',
            height: '50%',
            backgroundColor: THEME.colorPrimary,
          }}
          inputUrl={this.state.currentPlayUrl}
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <DatePicker ref={r => (this.datePicker = r)} />
          {/* <TimePicker ref={r => this.timePicker = r} /> */}
          <Button
            style={styles.loginButton}
            text={STRING.access}
            onPress={this.requestGetData}
            loading={this.state.loading}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground,
  },
  loginButton: {
    marginStart: 16,
    marginEnd: 16,
    marginTop: 12,
  },
});

import React, { Component } from 'react'
import { 
  StyleSheet,
  View,
  Text,
  ScrollView
} from 'react-native'
import THEME from '../../res/theme'

const TIME_DATA = [
  {start: "00:00", time: 3600 * 0},
  {start: "01:00", time: 3600 * 1},
  {start: "02:00", time: 3600 * 2},
  {start: "03:00", time: 3600 * 3},
  {start: "04:00", time: 3600 * 4},
  {start: "05:00", time: 3600 * 5},
  {start: "06:00", time: 3600 * 6},
  {start: "07:00", time: 3600 * 7},
  {start: "08:00", time: 3600 * 8},
  {start: "09:00", time: 3600 * 9},
  {start: "10:00", time: 3600 * 10},
  {start: "11:00", time: 3600 * 11},
  {start: "12:00", time: 3600 * 12},
  {start: "13:00", time: 3600 * 13},
  {start: "14:00", time: 3600 * 14},
  {start: "15:00", time: 3600 * 15},
  {start: "16:00", time: 3600 * 16},
  {start: "17:00", time: 3600 * 17},
  {start: "18:00", time: 3600 * 18},
  {start: "19:00", time: 3600 * 19},
  {start: "20:00", time: 3600 * 20},
  {start: "21:00", time: 3600 * 21},
  {start: "22:00", time: 3600 * 22},
  {start: "23:00", time: 3600 * 23},
]

const Separator = React.memo(({isMain}) => {
  return (
    <View 
      style={{
        width: 1,
        height: isMain ? 26 : 16,
        backgroundColor: isMain ? "black" : "gray"
      }}
    />
  )
})

class TimePicker extends React.PureComponent {

  state = {
    currentTime: 0
  }

  onScroll = ({nativeEvent}) => {
    const currentTime = Math.max(0, 60 * nativeEvent.contentOffset.x / 2)
    this.setState({ currentTime })
  }

  sec2time(timeInSeconds) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60);

    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
  }

  render() {
    const content = TIME_DATA.map(i => {
      return (
        <View
          style={{
            width: 120,
            height: 50,
            paddingVertical: 2,
            backgroundColor: 'white',
          }}
        >
          <View
            style={{
              paddingRight: 30,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Separator isMain={true} />
            <Separator isMain={false} />
            <Separator isMain={false} />
            <Separator isMain={false} />
          </View>
          <Text style={{
            marginTop: 4, 
            fontSize: 11
          }}>{i.start}</Text>
        </View>
      )
    })
  
    return (
      <View style={{
        marginVertical: 16,
        marginHorizontal: 16,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
        >
          {content}
        </ScrollView>
        <View style={{
          width: 80,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          backgroundColor: THEME.colorPrimary,
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}>
          <Text style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            fontWeight: '600',
            fontSize: 12,
            color: 'white',
            fontVariant: ['tabular-nums']
          }}>{this.sec2time(this.state.currentTime)}</Text>
        </View>
      </View>
    )
  }
}

export default class Cloud extends Component {
  static navigationOptions = { header: null }

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            height: '50%',
            backgroundColor: THEME.colorPrimary
          }}
        />
        <TimePicker />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.appBackground,
  }
})

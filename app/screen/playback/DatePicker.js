import React, { Component } from 'react'
import { 
  View,
  Text,
  ScrollView
} from 'react-native'
import THEME from '../../res/theme'
import moment from 'moment'

const DATE_DATA = []
const ADAY = 24 * 60 * 60 * 1000

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

export default class DatePicker extends React.PureComponent {

  state = {
    currentTime: 0
  }

  constructor(props) {
    super(props)

    const today = new Date()
    const back1Day = new Date(today.getTime() - ADAY)
    const back2Day = new Date(back1Day.getTime() - ADAY)
    const back3Day = new Date(back2Day.getTime() - ADAY)
    const back4Day = new Date(back3Day.getTime() - ADAY)
    const back5Day = new Date(back4Day.getTime() - ADAY)
    const back6Day = new Date(back5Day.getTime() - ADAY)
    const next1Day = new Date(today.getTime() + ADAY)
    const next2Day = new Date(next1Day.getTime() + ADAY)
    const next3Day = new Date(next2Day.getTime() + ADAY)

    DATE_DATA.push({start: this.sec2time(back6Day.getTime()), time: back6Day.getTime()})
    DATE_DATA.push({start: this.sec2time(back5Day.getTime()), time: back5Day.getTime()})
    DATE_DATA.push({start: this.sec2time(back4Day.getTime()), time: back4Day.getTime()})
    DATE_DATA.push({start: this.sec2time(back3Day.getTime()), time: back3Day.getTime()})
    DATE_DATA.push({start: this.sec2time(back2Day.getTime()), time: back2Day.getTime()})
    DATE_DATA.push({start: this.sec2time(back1Day.getTime()), time: back1Day.getTime()})
    DATE_DATA.push({start: this.sec2time(today.getTime()), time: today.getTime()})
    DATE_DATA.push({start: this.sec2time(next1Day.getTime()), time: next1Day.getTime()})
    DATE_DATA.push({start: this.sec2time(next2Day.getTime()), time: next2Day.getTime()})
    DATE_DATA.push({start: this.sec2time(next3Day.getTime()), time: next3Day.getTime()})
  }

  getCurrentDate() {
    return this.state.currentTime
  }

  onScroll = ({nativeEvent}) => {
    const currentTime = Math.max(DATE_DATA[0].time, (ADAY * nativeEvent.contentOffset.x / 24) / 5 + DATE_DATA[0].time - ADAY) 
    this.setState({ currentTime })
  }

  sec2time(timeInSeconds) {
    return moment(timeInSeconds).format("DD-MM-YYYY")
  }

  render() {
    const content = DATE_DATA.map(i => {
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
          width: 100,
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
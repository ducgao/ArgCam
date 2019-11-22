import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-ionicons';

export default class Cell extends Component {
  render() {
    const iconColor = this.props.color;
    const iconName = this.props.icon;
    const title = this.props.title;
    return (
      <TouchableOpacity
        style={[styles.container, this.props.style]}
        onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style]}>
          <Ionicons
            style={styles.icon}
            name={iconName}
            size={28}
            color={iconColor}
          />
          <Text style={styles.title}>{title}</Text>
          {this.props.withoutRight ? null : (
            <Ionicons
              style={styles.rightIcon}
              name="ios-arrow-forward"
              size={24}
              color={'#00000050'}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingStart: 8,
    paddingEnd: 8,
    paddingTop: 6,
    paddingBottom: 6,
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
    width: 30,
    height: 30,
  },
  title: {
    alignSelf: 'center',
    marginLeft: 8,
  },
  rightIcon: {
    position: 'absolute',
    right: 8,
    alignSelf: 'center',
  },
});

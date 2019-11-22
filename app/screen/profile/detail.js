import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Alert,
  AsyncStorage,
  ScrollView,
  Linking,
} from 'react-native';
import STRING from '../../res/string';
import THEME from '../../res/theme';
import {isIphoneX} from '../../utils';
import UserRepository from '../../repository/user';
import CameraRepository from '../../repository/camera';
import {
  ACCESS_TOKEN_STORE_KEY,
  CREDENTIAL_INFO_STORE_KEY,
  USER_INFO_STORE_KEY,
} from '../../common/constants';
import {StackActions, NavigationActions} from 'react-navigation';
import Cell from './cell';

export default class Profile extends Component {
  static navigationOptions = {header: null};

  state = {
    userInfo: null,
    cameraCount: 0,
  };

  userRepository = UserRepository.instance();
  cameraRepository = CameraRepository.instance();

  componentDidMount() {
    this.userRepository.addObserver(this.userObserver);
    this.cameraRepository.addObserver(this.cameraObserver);
  }

  componentWillUnmount() {
    this.userRepository.removeObserver(this.userObserver);
    this.cameraRepository.removeObserver(this.cameraObserver);
  }

  onRequestLogout = () => {
    Alert.alert(STRING.logout, STRING.logoutConfirm, [
      {
        text: 'Yes',
        style: 'default',
        onPress: this.doLogout,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  doLogout = () => {
    AsyncStorage.multiRemove(
      [ACCESS_TOKEN_STORE_KEY, CREDENTIAL_INFO_STORE_KEY, USER_INFO_STORE_KEY],
      () => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Authentication'})],
        });
        this.props.navigation.dispatch(resetAction);
      },
    );
  };

  userObserver = userInfo => {
    this.setState({userInfo});
  };

  cameraObserver = cameraList => {
    this.setState({cameraCount: cameraList ? cameraList.length : 0});
  };

  onProfileManagermentPress = () => {
    Alert.alert(STRING.notice, STRING.featuresNotAvailable);
  };

  onNotificationCenterPress = () => {
    Alert.alert(STRING.notice, STRING.featuresNotAvailable);
  };

  onFAQPress = () => {
    Alert.alert(STRING.notice, STRING.featuresNotAvailable);
  };

  onSettingPress = () => {
    Alert.alert(STRING.notice, STRING.featuresNotAvailable);
  };

  onAboutPress = () => {
    Linking.openURL('https://camhub.ai');
  };

  renderHeader() {
    const userInfo = this.state.userInfo;
    if (userInfo == null) {
      return;
    }

    const avatarSource = require('../../res/images/avatar-default.png');
    return (
      <View style={styles.headerContainer}>
        <Image
          style={styles.avatar}
          source={avatarSource}
          resizeMethod="resize"
          resizeMode="cover"
        />
      </View>
    );
  }

  renderBlock1() {
    const userInfo = this.state.userInfo;
    if (userInfo == null) {
      return;
    }

    return (
      <View style={styles.blockContainer}>
        <Cell
          title={userInfo.firstName + ' ' + userInfo.lastName}
          icon={'ios-person'}
          color={THEME.colorPrimary}
          onPress={this.onProfileManagermentPress}
          withoutRight
        />
        <Cell
          title={userInfo.email}
          icon={'ios-mail'}
          color={'#f44170'}
          onPress={this.onAboutPress}
          withoutRight
        />
        <Cell
          title={userInfo.company}
          icon={'ios-information-circle'}
          color={'#a341f4'}
          onPress={this.onAboutPress}
          withoutRight
        />
        <Cell
          title={userInfo.rolesGroup.name}
          icon={'ios-git-network'}
          color={'#41f4a9'}
          onPress={this.onAboutPress}
          withoutRight
        />
      </View>
    );
  }

  renderBlock2() {
    return (
      <View style={styles.blockContainer}>
        <Cell
          title={STRING.back}
          icon={'ios-arrow-round-back'}
          color={'#f44170'}
          onPress={() => this.props.navigation.goBack()}
          withoutRight
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          {this.renderHeader()}
          {this.renderBlock1()}
          {this.renderBlock2()}
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
  headerContainer: {
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
    paddingTop: isIphoneX() ? 102 : 82,
    zIndex: 99,
  },
  avatar: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 100,
    alignSelf: 'center',
  },
  blockContainer: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    borderRadius: 8,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    justifyContent: 'center',
  },
  scrollView: {
    paddingBottom: 24,
  },
});

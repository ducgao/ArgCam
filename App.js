import 'react-native-gesture-handler';

import Orientation from 'react-native-orientation';
import {createAppContainer} from 'react-navigation';
import Authentication from './app/screen/authentication/index';
import Login from './app/screen/authentication/login';
import Register from './app/screen/authentication/register';
import Main from './app/screen/main';
import Camera from './app/screen/camera';
import ChangePassword from './app/screen/profile/changepassword';
import PlayBack from './app/screen/playback';
import ProfileDetail from './app/screen/profile/detail';
import {createStackNavigator} from 'react-navigation-stack';

const screensDefination = {
  Authentication: {screen: Authentication},
  Main: {screen: Main},
  Login: {screen: Login},
  Register: {screen: Register},
  Camera: {screen: Camera},
  ChangePassword: {screen: ChangePassword},
  PlayBack: {screen: PlayBack},
  ProfileDetail: {screen: ProfileDetail},
};

console.disableYellowBox = true;

const RootStack = createStackNavigator(screensDefination);

const App = createAppContainer(RootStack);

Orientation.lockToPortrait();

export default App;

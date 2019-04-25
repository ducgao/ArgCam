import { createStackNavigator, createAppContainer } from 'react-navigation'
import Authentication from './app/screen/authentication/index'
import Main from './app/screen/main'
import Camera from './app/screen/camera'
import Login from './app/screen/authentication/login'
import Register from './app/screen/authentication/register'
import ChangePassword from './app/screen/profile/changepassword'

const screensDefination = {
  Authentication: { screen:  Authentication },
  Login: { screen: Login },
  Register: { screen: Register },
  Main: { screen:  Main },
  Camera: { screen:  Camera },
  ChangePassword: { screen: ChangePassword }
}

console.disableYellowBox = true

const RootStack = createStackNavigator(screensDefination)

const App = createAppContainer(RootStack)

export default App

import { createStackNavigator, createAppContainer } from 'react-navigation'
import Authentication from './app/screen/authentication/index'
import Main from './app/screen/main'
import Camera from './app/screen/camera'

const screensDefination = {
  Authentication: { screen:  Authentication },
  Main: { screen:  Main },
  Camera: { screen:  Camera }
}

const RootStack = createStackNavigator(screensDefination)

const App = createAppContainer(RootStack)

export default App

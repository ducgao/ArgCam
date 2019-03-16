import { createStackNavigator, createAppContainer } from 'react-navigation'
import Authentication from './app/screen/authentication/index'
import Main from './app/screen/main'
import Camera from './app/screen/camera'
import AddCameraScanQRCode from './app/screen/add/scan'
import AddCameraCameraList from './app/screen/add/cameras'
import AddCameraServicesChooser from './app/screen/add/services'
import AddCameraPayment from './app/screen/add/payment'

const screensDefination = {
  Authentication: { screen:  Authentication },
  Main: { screen:  Main },
  Camera: { screen:  Camera },
  AddCameraScanQRCode: { screen:  AddCameraScanQRCode },
  AddCameraCameraList: { screen:  AddCameraCameraList },
  AddCameraServicesChooser: { screen:  AddCameraServicesChooser },
  AddCameraPayment: { screen:  AddCameraPayment }
}

const RootStack = createStackNavigator(screensDefination)

const App = createAppContainer(RootStack)

export default App

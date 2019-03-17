import { createStackNavigator, createAppContainer } from 'react-navigation'
import Authentication from './app/screen/authentication/index'
import Login from './app/screen/authentication/login'
import Register from './app/screen/authentication/register'
import Main from './app/screen/main'
import Camera from './app/screen/camera'
import AddCameraScanQRCode from './app/screen/add/scan'
import AddCameraCameraList from './app/screen/add/cameras'
import AddCameraServicesChooser from './app/screen/add/services'
import AddCameraPayment from './app/screen/add/payment'
import QRCodeScanner from './app/screen/scanner/qrcode'

const screensDefination = {
  Authentication: { screen:  Authentication },
  Main: { screen:  Main },
  Login: { screen:  Login },
  Register: { screen:  Register },
  Camera: { screen:  Camera },
  AddCameraScanQRCode: { screen:  AddCameraScanQRCode },
  AddCameraCameraList: { screen:  AddCameraCameraList },
  AddCameraServicesChooser: { screen:  AddCameraServicesChooser },
  AddCameraPayment: { screen:  AddCameraPayment },
  QRCodeScanner: { screen: QRCodeScanner }
}

console.disableYellowBox = true

const RootStack = createStackNavigator(screensDefination)

const App = createAppContainer(RootStack)

export default App

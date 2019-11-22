const AUTHENTICATION = "Authentication"
const MAIN = "Main"
const LOGIN = "Login"
const REGISTER = "Register"
const CAMERA = "Camera"
const ADD_CAMERA_SCAN_QR_CODE = "AddCameraScanQRCode"
const ADD_CAMERA_CAMERA_LIST = "AddCameraCameraList"
const ADD_CAMERA_SERVICES_CHOOSER = "AddCameraServicesChooser"
const ADD_CAMERA_PAYMENT = "AddCameraPayment"
const QRCODE_SCANNER = "QRCodeScanner"
const CHANGE_PASSWORD = "ChangePassword"

export function navigateToAuthentication(screenInstance) {
  screenInstance.props.navigation.navigate(AUTHENTICATION)
}

export function replaceToMain(screenInstance) {
  screenInstance.props.navigation.replace(MAIN)
}

export function navigateToMain(screenInstance) {
  screenInstance.props.navigation.navigate(MAIN)
}

export function replaceToLogin(screenInstance) {
  screenInstance.props.navigation.replace(LOGIN)
}

export function navigateToRegister(screenInstance) {
  screenInstance.props.navigation.navigate(REGISTER)
}

export function navigateToCamera(screenInstance, cameraInfo) {
  screenInstance.props.navigation.navigate(CAMERA, { info: cameraInfo, title: cameraInfo.name })
}

export function navigateToQRCodeScanner(screenInstance, callback) {
  screenInstance.props.navigation.navigate(QRCODE_SCANNER, { callback })
}

export function navigateToAddCameraScanQRCode(screenInstance) {
  screenInstance.props.navigation.navigate(ADD_CAMERA_SCAN_QR_CODE)
}

export function navigateToAddCameraCameraList(screenInstance, qrCode) {
  screenInstance.props.navigation.navigate(ADD_CAMERA_CAMERA_LIST, { code: qrCode })
}

export function navigateToAddCameraServicesChooser(screenInstance) {

}

export function navigateToAddCameraPayment(screenInstance) {

}

export function navigateToChangePassword(screenInstance) {
  screenInstance.props.navigation.navigate(CHANGE_PASSWORD)
}
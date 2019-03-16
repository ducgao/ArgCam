const AUTHENTICATION = "Authentication"
const MAIN = "Main"
const CAMERA = "Camera"
const ADD_CAMERA_SCAN_QR_CODE = "AddCameraScanQRCode"
const ADD_CAMERA_CAMERA_LIST = "AddCameraCameraList"
const ADD_CAMERA_SERVICES_CHOOSER = "AddCameraServicesChooser"
const ADD_CAMERA_PAYMENT = "AddCameraPayment"


export function navigateToAuthentication(screenInstance) {
  screenInstance.props.navigation.navigate(AUTHENTICATION)
}

export function replaceToMain(screenInstance) {
  screenInstance.props.navigation.replace(MAIN)
}

export function navigateToMain(screenInstance) {
  screenInstance.props.navigation.navigate(MAIN)
}

export function navigateToCamera(screenInstance, cameraInfo) {
  screenInstance.props.navigation.navigate(CAMERA, { info: cameraInfo })
}

export function navigateToAddCameraScanQRCode(screenInstance) {

}

export function navigateToAddCameraCameraList(screenInstance) {

}

export function navigateToAddCameraServicesChooser(screenInstance) {

}

export function navigateToAddCameraPayment(screenInstance) {

}
const AUTHENTICATION = "Authentication"
const MAIN = "Main"
const LOGIN = "Login"
const CAMERA = "Camera"
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

export function navigateToCamera(screenInstance, cameraInfo) {
  screenInstance.props.navigation.navigate(CAMERA, { info: cameraInfo })
}

export function replaceToLogin(screenInstance) {
  screenInstance.props.navigation.replace(LOGIN)
}

export function navigateToChangePassword(screenInstance) {
  screenInstance.props.navigation.navigate(CHANGE_PASSWORD)
}
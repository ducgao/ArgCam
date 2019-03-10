const AUTHENTICATION = "Authentication"
const MAIN = "Main"
const CAMERA = "Camera"

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
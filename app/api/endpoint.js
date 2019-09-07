const BASE_URL = "http://camhub.ai/"
export default ENDPOINTS = {
  LOGIN: BASE_URL + "api-rest-oauth/oauth/token?grant_type=client_credentials",
  CAMERA_LIST: BASE_URL + "camera/list",
  CAMERA_VIEW: BASE_URL + "camera/view"
}
const BASE_URL = "http://camhub.ai/"
export default ENDPOINTS = {
  LOGIN: BASE_URL + "api-rest-oauth/oauth/token?grant_type=client_credentials",
  GET_FOLDER: BASE_URL + "api-rest-media/service/media/find?access_token={access_token}",
  CAMERA_LIST: BASE_URL + "camera/list",
  CAMERA_VIEW: BASE_URL + "camera/view"
}
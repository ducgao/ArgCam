const BASE_URL = 'http://hsg.camhub.ai/';
export default {
  LOGIN:
    BASE_URL +
    'api-rest-user/service/oauth/token?grant_type=client_credentials',
  GET_FOLDER:
    BASE_URL + 'api-rest-media/service/media/find?access_token={access_token}',
  GET_CAMERA:
    BASE_URL + 'api-rest-media/service/media/find?access_token={access_token}',
  CAMERA_LIST: BASE_URL + 'camera/list',
  CAMERA_VIEW: BASE_URL + 'camera/view',
  PLAY_BACK: 'https://camhub.ai/backup/service/playback/hsg/{id}/{time}',
  // PLAY_BACK: BASE_URL + "api-rest-media-playback/service/playback/{id}/0/10/{time}?access_token={access_token}"
};


import {
  Dimensions,
  Platform
} from 'react-native'

export function isValidEmail(input) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return reg.test(input)
}

export const isIphoneX = () => {
  const { height, width } = Dimensions.get('window')
  return (Platform.OS === 'ios' && (height === 812 || width === 812))
}
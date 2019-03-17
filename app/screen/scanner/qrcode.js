import React, { Component } from 'react'
import { 
  View,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native'
import { RNCamera } from 'react-native-camera'
import THEME from '../../res/theme'
import STRING from '../../res/string'

const WINDOW_WIDTH = Dimensions.get('window').width
const QR_FRAME_SIZE = WINDOW_WIDTH / 1.75
export default class QRCodeScanner extends Component {
  static navigationOptions = { header: null }

  processing = false

  onBarcodeDetected = ({ barcodes }) => {
    if (this.processing == true) {
      return
    }

    this.processing = true
    if (barcodes.length == 0) {
      this.processing = false
      return
    }

    const first = barcodes[0]
    const code = first.data
    alert(JSON.stringify(code))
  }

  render() {
    return <View style={styles.container}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={STRING.cameraMissingPermissionTitle}
        permissionDialogMessage={STRING.cameraMissingPermissionMessage}
        onGoogleVisionBarcodesDetected={this.onBarcodeDetected}
      />
      <Image
        style={styles.qrFrame}
        source={require('../../res/images/qr-frame.png')}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  qrFrame: {
    position: 'absolute',
    alignSelf: 'center',
    tintColor: THEME.colorPrimary,
    width: QR_FRAME_SIZE,
    height: QR_FRAME_SIZE
  }
})
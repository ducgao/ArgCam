import React, { Component } from 'react'
import { 
  View,
  StyleSheet
} from 'react-native'
import { RNCamera } from 'react-native-camera'

export default class QRCodeScanner extends Component {
  static navigationOptions = { header: null }

  render() {
    return <View style={styles.container}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
        onGoogleVisionBarcodesDetected={({ barcodes }) => {
          alert(barcodes)
        }}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
})
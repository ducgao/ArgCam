import React, { Component } from 'react'
import { 
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import Header from './header'
import STRING from '../../res/string'
import THEME from '../../res/theme'
import Button from '../../ui-component/button'
import { navigateToQRCodeScanner, navigateToAddCameraCameraList } from '../../common/router'

export default class ScanQRCode extends Component {
  static navigationOptions = { header: null }

  state = {
    processing: false
  }

  requestScan = () => {
    if (this.state.processing == false) {
      navigateToQRCodeScanner(this, this.onScannCallback)
    }
  }

  onScannCallback = (code) => {
    this.setState({ processing: true })
    setTimeout(() => {
      navigateToAddCameraCameraList(this, code)
    }, 1000)
  }

  renderQRIcon() {
    return <View style={styles.qrIconContainer}>
      <Image
        style={styles.qrIcon}
        source={require('../../res/images/qrcode.png')}
      />
    </View>
  }

  renderGuide() {
    return <Text style={styles.guideText}>{STRING.scanQRCodeMessage}</Text>
  }

  renderCTA() {
    const buttonText = this.state.processing ? STRING.processing : STRING.scan
    return <Button style={styles.cta} text={buttonText} onPress={this.requestScan} />
  }

  render() {
    return <View>
      <Header 
        style={styles.header} 
        title={STRING.scanQRCode}
        onBack={() => this.props.navigation.goBack()}
      />
      {this.renderQRIcon()}
      {this.renderGuide()}
      {this.renderCTA()}
    </View>
  }
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24
  },
  qrIcon: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    tintColor: 'white'
  },
  qrIconContainer: {
    width: 210,
    height: 210,
    borderRadius: 16,
    marginTop: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.colorPrimary
  },
  guideText: {
    marginTop: 24,
    fontSize: 16,
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center'
  },
  cta: {
    marginTop: 32,
    width: '60%',
    alignSelf: 'center',
  }
})
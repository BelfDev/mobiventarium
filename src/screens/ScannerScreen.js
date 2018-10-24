import React, { Component } from 'react'
import {
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import QRMarker from '../components/QRMarker'

export default class ScannerScreen extends Component {

  _onSuccess(code) {
    Linking
      .openURL(code.data)
      .catch(err => console.error('An error occured', err))
  }

  render() {
    return (
      <QRCodeScanner
        onRead={(code) => this._onSuccess(code)}
        cameraStyle={styles.cameraContainer}
        fadeIn={true}
        reactivate={true}
        reactivateTimeout={2}
        showMarker={true}
        customMarker={
          <QRMarker/>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  cameraContainer: {
    height: Dimensions.get('window').height,
    }
});

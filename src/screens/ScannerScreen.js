import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  Alert
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import QRMarker from '../components/QRMarker'
import InventoryApiService from '../services/InventoryApiService'
import { has } from "ramda";

export default class ScannerScreen extends Component {

  async _onSuccess(code) {
    if (this._isValidCode(code)) {
      this._showAlert(code)
      const device = await InventoryApiService.updateDevice({
        id: 'wgTLjmsBRQ0EeScBkoQ7',
        data: {
            version: 'TESTE LALALA',
            brand: 'ios',
            type: 'mobile',
            model: 'Modelo de Testee',
            isRented: true,
            serial: '431606277',
            os: 'android',
            color: 'black'
        }
    })
    console.log(">>>>> UPDATED DEVICE ", device)
    }
    // InventoryApiService.updateDevice
  }

  _isValidCode(code) {
    try {
      let deviceInfo = JSON.parse(code.data)
      let hasSerialNumber = has('serial');
      let hasRentedStatus = has('isRented')

      if (hasSerialNumber(deviceInfo) && hasRentedStatus(deviceInfo)) {
        return true
      }
    } catch (error) {
      console.log("Data parsing error: ", error)
      return false
    }
  }

  _showAlert(code) {
    Alert.alert(
      'QR Code Scanned',
      code.data,
      [
        { text: 'Ok', onPress: () => console.log('Cancel Pressed'), style: 'cancel' }
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <QRCodeScanner
        onRead={(code) => this._onSuccess(code)}
        cameraStyle={styles.cameraContainer}
        fadeIn={true}
        reactivate={true}
        reactivateTimeout={2000}
        showMarker={true}
        customMarker={
          <QRMarker />
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

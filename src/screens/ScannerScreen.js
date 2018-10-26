import React, { Component } from 'react'
import {
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import QRMarker from '../components/QRMarker'
import InventoryApiService from '../services/InventoryApiService'
import { has } from "ramda";
import Strings from '../utils/Strings'
import PropTypes from "prop-types";

const selectedItemId = 'x96851pNDHfwbfoBhPAP'

export default class ScannerScreen extends Component {
  constructor(props) {
    super(props);
    // this.props.selectedId = 'x96851pNDHfwbfoBhPAP'
    console.log(">>> Setup selectedId ", selectedItemId)
  }

  async _onSuccess(code) {
    if (this._isValidCode(code)) {
      this._checkInItem(code)
    }
  }

  async _checkInItem(validatedCode) {
    let scannedItem = JSON.parse(validatedCode.data)
    try {
      if (this._itemConformsWithProtocol(scannedItem, selectedItemId)) {
        let databaseItem = await InventoryApiService.getDeviceById(selectedItemId)
        databaseItem.data.isRented = !databaseItem.data.isRented
        let editedItem = Object.assign({}, databaseItem)
        const updatedItem = await InventoryApiService.updateDevice(editedItem)
        console.log(">>> Item successfuly updated: ", updatedItem)
      }
    } catch (error) {
      console.log(">>> Check-in error ", error)
    }
  }

  _itemConformsWithProtocol(scannedItem, selectedItemId) {
    return (scannedItem.id === selectedItemId)
  }

  _isValidCode(code) {
    try {
      let scannedDevice = JSON.parse(code.data)
      let hasSerialNumber = has('serial');
      let hasRentedStatus = has('isRented')

      if (hasSerialNumber(scannedDevice.data) && hasRentedStatus(scannedDevice.data)) {
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
          <QRMarker instructionText={Strings.scannerInstructionText} />
        }
      >
      </QRCodeScanner>
    );
  }
}

// ScannerScreen.propTypes = {
//   selectedItemId: PropTypes.string.isRequired
// };

const styles = StyleSheet.create({
  cameraContainer: {
    height: Dimensions.get('window').height,
  }
});

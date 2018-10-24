import React, { Component } from 'react'
import {
  StyleSheet,
  Linking,
  Dimensions,
  View,
} from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Icon from "react-native-vector-icons/Ionicons"
import Colors from '../utils/Colors'

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
          <View style={styles.markerContainer}>
            <View style={styles.topOverlay} />
            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />
              <View style={styles.centerRectangle}>
                <Icon
                  name="ios-qr-scanner"
                  size={SCREEN_WIDTH * 0.73}
                  color={Colors.markerPurple}
                />
              </View>
              <View style={styles.leftAndRightOverlay} />
            </View>
            <View style={styles.bottomOverlay} />
          </View>}
      />
    );
  }
}

const SCREEN_WIDTH = Dimensions.get("window").width
const rectDimensions = SCREEN_WIDTH * 0.65
const rectBorderWidth = SCREEN_WIDTH * 0.005

const styles = StyleSheet.create({
  cameraContainer: {
    height: Dimensions.get('window').height,
  },
  markerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  centerRectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: Colors.scannerGrayBorder,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.scannerOverlay,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.scannerOverlay,
    paddingBottom: SCREEN_WIDTH * 0.25
  },
  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.scannerOverlay
  },
});

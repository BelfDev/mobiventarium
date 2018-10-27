import React, { PureComponent } from "react";
import { StyleSheet, Platform, View, Dimensions, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import Colors from "../utils/Colors";

export default class QRMarker extends PureComponent {
  render() {
    const { instructionText, modalTitleText } = this.props;
    return (
      <View style={styles.markerContainer}>
        <View style={styles.modalBarContainer}>
          <Icon
            name={Platform.OS === "ios" ? "ios-close" : "md-close"}
            size={32}
            color={Colors.smoothWhite}
          />
          <Text style={styles.modalTitle} numberOfLines={1}>
            {modalTitleText}
          </Text>
        </View>
        <Text style={styles.topOverlay} numberOfLines={2}>
          {instructionText}
        </Text>
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
      </View>
    );
  }
}

QRMarker.defaultProps = {
  instructionText: ""
};

QRMarker.propTypes = {
  instructionText: PropTypes.string,
  modalTitleText: PropTypes.string.isRequired
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const rectDimensions = SCREEN_WIDTH * 0.65;
const rectBorderWidth = SCREEN_WIDTH * 0.005;

const styles = StyleSheet.create({
  markerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  modalBarContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "stretch",
    width: SCREEN_WIDTH,
    backgroundColor: Colors.scannerOverlay
  },
  modalTitle: {
    flex: 1,
    paddingLeft: 24,
    paddingRight: 46,
    textAlignVertical: "center",
    textAlign: "center",
	fontSize: 22,
    color: Colors.smoothWhite
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
    textAlign: "center",
    textAlignVertical: "center",
	fontSize: 18,
	fontWeight: '200',
    color: "white"
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
  }
});

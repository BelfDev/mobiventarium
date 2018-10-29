import React, { PureComponent } from "react";
import { StyleSheet, Platform, View, Dimensions } from "react-native";
import { IconButton, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import Colors from "../utils/Colors";
import { isiPhoneXorAbove } from "../utils/PlatformUtils";

export default class QRModalMarker extends PureComponent {
  render() {
    const { instructionText, modalTitleText, onClosePressed } = this.props;
    return (
      <View style={styles.markerContainer}>
        <View style={styles.modalBarContainer}>
          <IconButton
            icon={({ size, color }) => (
              <Icon
                name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                size={size}
                color={color}
              />
            )}
            color={Colors.smoothWhite}
            size={Platform.OS === "ios" ? 32 : 24}
            onPress={() => (onClosePressed ? onClosePressed() : null)}
          />
          <Text style={styles.modalTitle} numberOfLines={1}>
            {modalTitleText}
          </Text>
        </View>
        <View style={styles.topOverlay}>
          <Text style={styles.instructionText} numberOfLines={2}>
            {instructionText}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.leftAndRightOverlay} />
          <View style={styles.centerRectangle}>
            <Icon
              name="ios-qr-scanner"
              size={SCREEN_WIDTH * 0.73}
              color={Colors.markerPurple}
              style={{
                marginTop: Platform.OS === "ios" ? -16 : 0
              }}
            />
          </View>
          <View style={styles.leftAndRightOverlay} />
        </View>
        <View
          style={[
            {
              paddingBottom: isiPhoneXorAbove()
                ? SCREEN_WIDTH * 0.4
                : SCREEN_WIDTH * 0.25
            },
            styles.bottomOverlay
          ]}
        />
      </View>
    );
  }
}

QRModalMarker.defaultProps = {
  instructionText: ""
};

QRModalMarker.propTypes = {
  instructionText: PropTypes.string,
  modalTitleText: PropTypes.string.isRequired,
  onClosePressed: PropTypes.func
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
    paddingLeft: 14,
    paddingRight: 24,
    flexDirection: "row",
    alignItems: "stretch",
    width: SCREEN_WIDTH,
    backgroundColor: Colors.scannerOverlay
  },
  modalTitle: {
    flex: 1,
    paddingRight: 46,
    paddingBottom: 2,
    paddingLeft: 8,
    textAlignVertical: "center",
    textAlign: "center",
    alignSelf: "center",
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
    justifyContent: "flex-end",
    backgroundColor: Colors.scannerOverlay
  },
  instructionText: {
    width: SCREEN_WIDTH,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    fontWeight: "200",
    color: "white",
    paddingBottom: 16,
    backgroundColor: "transparent"
  },
  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.scannerOverlay
  },
  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.scannerOverlay
  }
});

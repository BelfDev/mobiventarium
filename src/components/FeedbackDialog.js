import React, { PureComponent } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import PopupDialog, { ScaleAnimation } from "react-native-popup-dialog";
import Colors from "../utils/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

export default class FeedbackDialog extends PureComponent {
  show() {
    this.popupDialog.show();
  }

  _getDialogContent() {
    const { mode, description } = this.props;
    if (mode === "loading") {
      return (
        <ActivityIndicator
          size="large"
          color={Colors.vividPurple}
          style={styles.loadingIndicator}
        />
      );
    }
    return (
      <View>
        <Icon
          name={
            mode === "success" ? "ios-checkmark-circle" : "ios-close-circle"
          }
          size={96}
          color={mode === "success" ? Colors.vividGreen : Colors.vividRed}
          style={styles.icon}
        />
        <Text style={styles.title}>
          {mode === "success" ? "Sucesso!" : "Erro..."}
        </Text>
        <Text style={styles.descriptionTitle} numberOfLines={3}>
          {description}
        </Text>
      </View>
    );
  }

  render() {
    const { onDismissed, onShown } = this.props;
    return (
      <PopupDialog
        ref={popupDialog => {
          this.popupDialog = popupDialog;
        }}
        dialogAnimation={scaleAnimation}
        width={0.9}
        height={0.4}
        dialogStyle={styles.dialogContainer}
        containerStyle={{ zIndex: 10, elevation: 10 }}
        onDismissed={() => (onDismissed ? onDismissed() : null)}
        onShown={() => (onShown ? onShown() : null)}
      >
        {this._getDialogContent()}
      </PopupDialog>
    );
  }
}

FeedbackDialog.propTypes = {
  mode: PropTypes.oneOf(["success", "failure", "loading"]).isRequired,
  description: PropTypes.string
};

const scaleAnimation = new ScaleAnimation({
  toValue: 0,
  useNativeDriver: true
});

const styles = StyleSheet.create({
  dialogContainer: {
    flexDirection: "row",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  icon: {
    textAlign: "center",
    marginBottom: 8
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    color: Colors.titleDarkFont,
    marginBottom: 6
  },
  descriptionTitle: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.descriptionLightGray
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  }
});

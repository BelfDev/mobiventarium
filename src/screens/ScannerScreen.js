import React, { Component } from "react";
import { StyleSheet, Dimensions, SafeAreaView } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import QRModalMarker from "../components/QRModalMarker";
import InventoryApiService from "../services/InventoryApiService";
import { has } from "ramda";
import Strings from "../utils/Strings";
import PropTypes from "prop-types";
import FeedbackDialog from "../components/FeedbackDialog";
import { Navigation } from "react-native-navigation";
import NavigationStyle from "../utils/NavigationStyle";

export default class ScannerScreen extends Component {
  state = {
    feedbackMode: "success",
    descriptionMessage: "none"
  };

  constructor(props) {
    super(props);
    console.log(">>> Setup selectedId ", this.props.selectedItemId);
  }

  async _onSuccess(code) {
    console.log(">>> SCANNED CODE: ", code);
    if (this._isValidCode(code)) {
      this._checkInItem(code);
    }
  }

  async _checkInItem(validatedCode) {
    const { selectedItemId } = this.props;
    try {
      let scannedItem = JSON.parse(validatedCode.data);
      if (this._itemConformsWithProtocol(scannedItem, selectedItemId)) {
        try {
          let databaseItem = await InventoryApiService.getItemById(
            selectedItemId
          );
          databaseItem.data.isRented = !databaseItem.data.isRented;
          let editedItem = Object.assign({}, databaseItem);
          await InventoryApiService.updateItem(editedItem);
          this.setState({
            feedbackMode: "success",
            descriptionMessage: `Você alugou ${editedItem.data.model}`
          });
        } catch (error) {
          this.setState({
            feedbackMode: "failure",
            descriptionMessage: Strings.scanner.connectionError
          });
        }
      } else {
        this.setState({
          feedbackMode: "failure",
          descriptionMessage: Strings.scanner.idMismatchError
        });
      }
    } catch (error) {
      this.setState({
        feedbackMode: "failure",
        descriptionMessage: Strings.scanner.parsingError
      });
    }
    this.feedbackDialog.show();
  }

  _itemConformsWithProtocol(scannedItem, selectedItemId) {
    return scannedItem.id === selectedItemId;
  }

  _isValidCode(code) {
    try {
      let scannedItem = JSON.parse(code.data);
      let hasSerialNumber = has("serial");
      let hasRentedStatus = has("isRented");

      if (
        hasSerialNumber(scannedItem.data) &&
        hasRentedStatus(scannedItem.data)
      ) {
        return true;
      } else {
        this.setState({
          feedbackMode: "failure",
          descriptionMessage: Strings.scanner.validationError
        });
      }
    } catch (error) {
      this.setState({
        feedbackMode: "failure",
        descriptionMessage: Strings.scanner.parsingError
      });
      this.feedbackDialog.show();
      return false;
    }
  }

  _onDismissed = () => {
    console.log(">>>> onDimissed!");
    if (this.state.feedbackMode === "success") {
      Navigation.dismissModal(this.props.componentId);
    } else if (this.state.feedbackMode === "failure") {
      this.scanner.reactivate();
    }
  };

  _onShown = () => {
    console.log(">>>> onShow!");
  };

  _onClosePressed = () => {
    Navigation.dismissModal(this.props.componentId);
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: NavigationStyle.ScannerScreen.topBar.background.color
        }}
      >
        <QRCodeScanner
          ref={node => {
            this.scanner = node;
          }}
          onRead={code => this._onSuccess(code)}
          cameraStyle={styles.cameraContainer}
          fadeIn={false}
          reactivate={false}
          showMarker={true}
          customMarker={
            <QRModalMarker
              onClosePressed={() => this._onClosePressed()}
              modalTitleText={this.props.modalTitle}
              instructionText={this.props.instruction}
            />
          }
        />
        <FeedbackDialog
          mode={this.state.feedbackMode}
          description={this.state.descriptionMessage}
          onDismissed={() => this._onDismissed()}
          onShown={() => this._onShown()}
          ref={feedbackDialog => {
            this.feedbackDialog = feedbackDialog;
          }}
        />
      </SafeAreaView>
    );
  }
}

ScannerScreen.propTypes = {
  selectedItemId: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  cameraContainer: {
    height: Dimensions.get("window").height
  }
});

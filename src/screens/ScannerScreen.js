import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  SafeAreaView,
  BackHandler
} from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import QRModalMarker from "../components/QRModalMarker";
import InventoryApiService from "../data/remote/services/InventoryApiService";
import { has } from "ramda";
import Strings from "../utils/Strings";
import PropTypes from "prop-types";
import FeedbackDialog from "../components/FeedbackDialog";
import NavigationStyle from "../navigation/NavigationStyle";
import Navigator from "../navigation/Navigator";
import { observer, inject } from "mobx-react/native";
import LocalStorage from "../data/local/LocalStorage";
import moment from "moment";
import "moment/locale/pt-br";
import { MAX_RENTAL_DAYS } from "../navigation/AppConfig";

@inject("sessionStore")
@observer
export default class ScannerScreen extends Component {

  state = {
    feedbackMode: "loading",
    descriptionMessage: "",
    closeButtonDisabled: false,
  };

  constructor(props) {
    super(props);
    moment.locale("pt-BR");
    console.log(">>> Setup selectedId ", this.props.selectedItemId);
  }

  componentDidMount = () => {
    BackHandler.addEventListener("hardwareBackPress", this._handleBackPress);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this._handleBackPress);
  };

  async _onSuccess(code) {
    console.log(">>> SCANNED CODE: ", code);
    if (this._isValidCode(code)) {
      try {
        let scannedItem = JSON.parse(code.data);
        switch (this.props.mode) {
          case "checkIn":
            this._checkInItem(scannedItem);
            break;
          case "checkOut":
            this._checkOutItem(scannedItem);
            break;
        }
      } catch (error) {
        console.log(">>> PARSE ERROR: ", error);
        this.setState({
          feedbackMode: "failure",
          descriptionMessage: Strings.scanner.parsingError
        });
      }
    }
    this.feedbackDialog.show();
  }

  async _checkOutItem(scannedItem) {
    const { selectedItemId, inventoryCode, sessionStore } = this.props;
    if (this._itemConformsWithCheckOutProtocol(scannedItem, inventoryCode)) {
      try {
        let databaseItem = await InventoryApiService.getItemById(
          selectedItemId
        );
        const sessionUser = await sessionStore.getSessionUser();
        if (
          databaseItem.data.isRented &&
          databaseItem.data.rentedBy === sessionUser.email
        ) {
          try {
            databaseItem.data.isRented = !databaseItem.data.isRented;
            databaseItem.data.retrievalDate = moment().toISOString();
            databaseItem.data.returnDate = moment()
              .add(MAX_RENTAL_DAYS, "day")
              .toISOString();
            console.log(">>> RetrievalDate: ", databaseItem.data.retrievalDate);
            console.log(">>> ReturnDate: ", databaseItem.data.returnDate);
            databaseItem.data.rentedBy = null;
            let editedItem = Object.assign({}, databaseItem);
            await InventoryApiService.updateItem(editedItem);
            await LocalStorage.clearRentedItemId();
            this.setState({
              feedbackMode: "success",
              descriptionMessage: `Você devolveu ${editedItem.data.model}`,
              rentedItem: null
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
            descriptionMessage: Strings.scanner.renterEmailMismatchError
          });
        }
      } catch (error) {
        this.setState({
          feedbackMode: "failure",
          descriptionMessage: Strings.scanner.connectionError
        });
      }
    } else {
      this.setState({
        feedbackMode: "failure",
        descriptionMessage: Strings.scanner.inventoryCodeMismatchError
      });
    }
  }

  async _checkInItem(scannedItem) {
    const { selectedItemId, sessionStore } = this.props;
    if (this._itemConformsWithCheckInProtocol(scannedItem, selectedItemId)) {
      try {
        let databaseItem = await InventoryApiService.getItemById(
          selectedItemId
        );
        databaseItem.data.isRented = !databaseItem.data.isRented;
        const sessionUser = await sessionStore.getSessionUser();
        databaseItem.data.rentedBy = sessionUser.email;
        let editedItem = Object.assign({}, databaseItem);
        await InventoryApiService.updateItem(editedItem);
        await LocalStorage.saveRentedItemId(selectedItemId);
        this.setState({
          feedbackMode: "success",
          descriptionMessage: `Você alugou ${editedItem.data.model}`,
          rentedItem: editedItem
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
  }

  _itemConformsWithCheckInProtocol(scannedItem, selectedItemId) {
    return scannedItem.id === selectedItemId;
  }

  _itemConformsWithCheckOutProtocol(scannedItem, inventoryCode) {
    return scannedItem.data.inventoryCode === inventoryCode;
  }

  _isValidCode(code) {
    try {
      let scannedItem = JSON.parse(code.data);
      if (
        this._isValidForCheckIn(scannedItem.data) ||
        this._isValidForCheckOut(scannedItem.data)
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
      return false;
    }
  }

  _isValidForCheckIn(scannedItemData) {
    const { mode } = this.props;
    let hasSerialNumber = has("serial");
    let hasRentedStatus = has("isRented");
    return (
      mode === "checkIn" &&
      hasSerialNumber(scannedItemData) &&
      hasRentedStatus(scannedItemData)
    );
  }

  _isValidForCheckOut(scannedItemData) {
    const { mode } = this.props;
    let hasInventoryCode = has("inventoryCode");
    let hasInventoryOwner = has("inventoryOwner");
    return (
      mode === "checkOut" &&
      hasInventoryCode(scannedItemData) &&
      hasInventoryOwner(scannedItemData)
    );
  }

  _onDismissed = () => {
    console.log(">>>> onDimissed!");
    if (this.state.feedbackMode === "success") {
      console.log(">>> RENTED ITEM: ", this.state.rentedItem);
      switch (this.props.mode) {
        case "checkIn":
          Navigator.goToRentedItemScreenAfterCheckIn(this.props.componentId);
          break;
        case "checkOut":
          Navigator.goToInventoryScreenAfterCheckOut();
          break;
      }
    } else if (this.state.feedbackMode === "failure") {
      this.scanner.reactivate();
    }
  };

  _onShown = () => {
    console.log(">>>> onShow!");
  };

  _onClosePressed = () => {
    if (!this.state.closeButtonDisabled) {
      this.setState({
        closeButtonDisabled: true,
      })
      Navigator.dismissModal(this.props.componentId);
    }
  };

  _handleBackPress = () => {
    Navigator.dismissModal(this.props.componentId);
    return true;
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
              onClosePressed={this._onClosePressed}
              modalTitleText={this.props.modalTitle}
              instructionText={this.props.instruction}
              closeButtonDisabled={this.state.closeButtonDisabled}
            />
          }
        />
        <FeedbackDialog
          mode={this.state.feedbackMode}
          description={this.state.descriptionMessage}
          onDismissed={this._onDismissed}
          onShown={this._onShown}
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

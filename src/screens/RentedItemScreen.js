import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { Surface, Text, Button } from "react-native-paper";
import CalendarBox from "../components/CalendarBox";
import Images from "assets";
import Colors from "../utils/Colors";
import PropTypes from "prop-types";
import { Navigation } from "react-native-navigation";
import InventoryApiService from "../data/remote/services/InventoryApiService";
import moment from "moment";
import "moment/locale/pt-br";
import Navigator from "../navigation/Navigator";
import ConnectionErrorContent from "../components/ConnectionErrorContent";

export default class RentedItemScreen extends Component {
  state = {
    retrievalDate: null,
    returnDate: null,
    imageUrl: "",
    itemTitle: this.props.itemTitle,
    itemType: this.props.itemType,
    isLoadingDates: true,
    isLoadingImage: true,
    rentedItem: null,
    connectionErrorOccurred: false,
    reconnecting: false
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    moment.locale("pt-BR");
  }

  async componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async componentDidAppear() {
    try {
      const { selectedItemId } = this.props;
      let item = await InventoryApiService.getItemById(selectedItemId);
      this._isMounted &&
        this.setState({
          itemTitle: item.data.model,
          itemType: item.data.os,
          itemInventoryCode: item.data.inventoryCode,
          retrievalDate: item.data.retrievalDate,
          returnDate: item.data.returnDate,
          imageUrl: item.data.imageUrl,
          isLoadingDates: false,
          isLoadingImage: false,
        });
    } catch (error) {
      console.log(">>> getItemById error: ", error);
      this._isMounted &&
      this.setState({
        connectionErrorOccurred: true,
      });
    }
  }

  _onReturnPress = async () => {
    if (!this.state.isLoadingDates) {
      Navigator.goToScannerScreenForCheckout(
        this.props.selectedItemId,
        this.state.itemInventoryCode
      );
    }
  };

  _getItemImage = (isLoadingImage, imageUrl) => {
    if (isLoadingImage) {
      return (
        <ActivityIndicator
          size="large"
          color={Colors.vividPurple}
          style={styles.loadingIndicator}
        />
      );
    }
    return (
      <Image
        style={styles.itemImage}
        resizeMode="contain"
        source={{ uri: imageUrl }}
        onError={error => {
          console.log(">>> error loading image: ", error);
        }}
      />
    );
  };

  _getDeadlineWarning = isLoadingDates => {
    if (isLoadingDates) {
      return "Carregando...".toUpperCase();
    }
    let initialDate = moment(this.state.retrievalDate);
    let finalDate = moment(this.state.returnDate);
    return `Restam ${finalDate.diff(initialDate, "days") +
      1} dias`.toUpperCase();
  };

  _retryConnection = async () => {
    const { selectedItemId } = this.props;
    this._isMounted &&
      this.setState({
        reconnecting: true
      });
      try {
        let item = await InventoryApiService.getItemById(selectedItemId);
        this._isMounted &&
          this.setState({
            itemTitle: item.data.model,
            itemType: item.data.os,
            itemInventoryCode: item.data.inventoryCode,
            retrievalDate: item.data.retrievalDate,
            returnDate: item.data.returnDate,
            imageUrl: item.data.imageUrl,
            connectionErrorOccurred: false,
            isLoadingDates: false,
            isLoadingImage: false,
            reconnecting: false,
          });
      } catch (error) {
        console.log(">>> getItemById error: ", error);
        this._isMounted &&
        this.setState({
          connectionErrorOccurred: true,
        });
      }
  };

  _renderRentedItemContent = () => {
    if (this.state.connectionErrorOccurred) {
      return (
        <ConnectionErrorContent
          style={styles.connectionErrorContainer}
          visible={this.state.connectionErrorOccurred}
          onRetryButtonPressed={this._retryConnection}
          reconnecting={this.state.reconnecting}
        />
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Image
            style={styles.headerImage}
            resizeMode="cover"
            source={
              this.state.itemType === "ios"
                ? Images.iosBackground
                : Images.androidBackground
            }
          />
          <Surface style={styles.itemContainer}>
            {this._getItemImage(this.state.isLoadingImage, this.state.imageUrl)}
          </Surface>
          <Text style={styles.itemTitle}>{this.state.itemTitle}</Text>
          <View style={styles.calendarContainer}>
            <CalendarBox
              headerText={"Retirada"}
              contentText={moment(this.state.retrievalDate).format("DD/MM")}
              isLoading={this.state.isLoadingDates}
            />
            <View style={styles.calendarSpacing} />
            <CalendarBox
              headerText={"Devolução"}
              contentText={moment(this.state.returnDate).format("DD/MM")}
              isLoading={this.state.isLoadingDates}
            />
          </View>
          <Button
            mode="contained"
            loading={this.state.isLoadingDates}
            color={Colors.vividPurple}
            dark={true}
            style={styles.returnButton}
            onPress={() => this._onReturnPress()}
          >
            {"Retornar".toUpperCase()}
          </Button>
          <Text style={styles.deadlineWarningText}>
            {this._getDeadlineWarning(this.state.isLoadingDates)}
          </Text>
        </View>
      );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.backgroundContainer}>
        {this._renderRentedItemContent()}
      </SafeAreaView>
    );
  }
}

RentedItemScreen.propTypes = {
  selectedItemId: PropTypes.string,
  itemTitle: PropTypes.string,
  itemType: PropTypes.oneOf(["ios", "android"])
};

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const HEADER_IMAGE_HEIGHT = SCREEN_HEIGHT * 0.3;
const ITEM_CONTAINER_DIAMETER = SCREEN_WIDTH * 0.5;
const ITEM_CONTAINER_TOP_MARGIN = HEADER_IMAGE_HEIGHT - SCREEN_WIDTH * 0.25;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: Colors.backgroundGray
  },
  headerImage: {
    alignSelf: "stretch",
    width: SCREEN_WIDTH,
    height: HEADER_IMAGE_HEIGHT
  },
  itemContainer: {
    elevation: 4,
    position: "absolute",
    marginTop: ITEM_CONTAINER_TOP_MARGIN,
    height: ITEM_CONTAINER_DIAMETER,
    width: ITEM_CONTAINER_DIAMETER,
    borderRadius: ITEM_CONTAINER_DIAMETER,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "white"
  },
  itemImage: {
    flex: 0.7,
    width: null,
    height: null
  },
  itemTitle: {
    marginTop: HEADER_IMAGE_HEIGHT * 0.55,
    fontSize: 22,
    textAlign: "center",
    fontWeight: "500",
    color: Colors.titleDarkFont
  },
  calendarContainer: {
    flexDirection: "row",
    paddingHorizontal: 64,
    paddingVertical: 16,
    height: 120,
    width: SCREEN_WIDTH,
    marginTop: 16
  },
  calendarSpacing: {
    flex: 0.2
  },
  returnButton: {
    marginTop: 32,
    justifyContent: "flex-end",
    alignSelf: "center",
    borderRadius: 8,
    padding: 4
  },
  deadlineWarningText: {
    marginTop: 16,
    marginBottom: 32,
    fontSize: 14,
    textAlign: "center",
    fontWeight: "200",
    color: Colors.warningGrayFont
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: "center"
  },
  connectionErrorContainer: {
    flex: 1
  }
});

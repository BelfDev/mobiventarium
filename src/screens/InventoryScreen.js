import React, { Component } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { Snackbar, Text } from "react-native-paper";
import Item from "../components/Item";
import { observer, inject } from "mobx-react/native";
import { toJS } from "mobx";
import ItemFormatter from "../utils/ItemFormatter";
import Colors from "../utils/Colors";
import { Navigation } from "react-native-navigation";
import Navigator from "../navigation/Navigator";
import ConnectionErrorContent from "../components/ConnectionErrorContent";
import { isNil, contains } from "ramda";

@inject("itemStore", "sessionStore")
@observer
export default class InventoryScreen extends Component {
  state = {
    itemPressed: false,
    snackBarVisible: false,
    rentedBy: null,
    connectionErrorOccurred: false,
    reconnecting: false
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
    console.log("RELOADING");
  }

  componentDidMount = async () => {
    this._isMounted = true;
    const { sessionStore, itemStore } = this.props;
    try {
      this.unsubscribe = await itemStore.subscribeToInventory();
      console.log("Trying to Sync...")
      await sessionStore.syncRentedItemsIfNeeded()
    } catch (error) {
      console.log(">>> Erro de conexão: ", error);
      this._isMounted &&
        this.setState({
          itemPressed: false,
          connectionErrorOccurred: true
        });
    }
  };

  async componentDidAppear() {
    if (this._isMounted) {
      const { sessionStore } = this.props;
      this.setState({
        itemPressed: false
      });
      console.log(" RENTED ITEM: ", sessionStore.rentedItemId);
    }
  }

  componentWillUnmount = () => {
    this._isMounted = false;
    this.unsubscribe();
  };

  navigationButtonPressed = async ({ buttonId }) => {
    if (this._isMounted) {
      switch (buttonId) {
        case "signOutButton":
          await this._signSessionUserOut();
          break;
      }
    }
  };

  _signSessionUserOut = async () => {
    try {
      const { sessionStore } = this.props;
      await sessionStore.signSessionUserOut();
      Navigator.goToOnboardingScreen(this.props.componentId);
    } catch (error) {
      console.log("signSessionUserOut error", error);
    }
  };

  _onItemPressed = item => {
    if (this.state.itemPressed) {
      return null;
    } else if (this._isItemRentedBySessionUser(item.id)) {
      this._isMounted &&
        this.setState({
          itemPressed: true
        });
      Navigator.goToRentedItemScreen(item);
    } else if (item.data.isRented) {
      this._isMounted &&
        this.setState({
          snackBarVisible: true,
          rentedBy: item.data.rentedBy
        });
    } else {
      this._isMounted &&
        this.setState({
          itemPressed: true
        });
      Navigator.goToScannerScreenForCheckIn(item);
    }
  };

  _isItemRentedBySessionUser = itemId => {
    const { sessionStore } = this.props;
    return contains(itemId, sessionStore.rentedItems);
  };

  _keyExtractor = item => item.id.toString();

  _retryConnection = async () => {
    this._isMounted &&
      this.setState({
        reconnecting: true
      });
    if (isNil(this.unsubscribe)) {
      try {
        this.unsubscribe = await itemStore.subscribeToInventory();
        this._isMounted &&
          this.setState({
            connectionErrorOccurred: false,
            reconnecting: false
          });
      } catch (error) {
        console.log(">>> Erro de conexão: ", error);
        this._isMounted &&
          this.setState({
            connectionErrorOccurred: true,
            reconnecting: false
          });
      }
    }
  };

  _renderItem = ({ item }) => {
    const data = Object.assign({}, item.data);
    return (
      <Item
        id={item.id}
        onPress={() => this._onItemPressed(item)}
        itemTitle={data.model}
        disabled={this.state.itemPressed}
        descriptionText={ItemFormatter.getDescriptionTextFormat(data.os)}
        descriptionTextColor={ItemFormatter.getPlatformTextColor(data.os)}
        statusLabelText={ItemFormatter.getStatusLabelText(
          data.isRented,
          this._isItemRentedBySessionUser(item.id)
        )}
        statusLabelColor={ItemFormatter.getStatusLabelColor(
          data.isRented,
          this._isItemRentedBySessionUser(item.id)
        )}
        statusLabelBorderColor={ItemFormatter.getStatusLabelBorderColor(
          data.isRented,
          this._isItemRentedBySessionUser(item.id)
        )}
        iconName={ItemFormatter.getIconName(data.os)}
        iconColor={ItemFormatter.getPlatformTextColor(data.os)}
        imageUrl={data.imageUrl}
      />
    );
  };

  _renderItemList = () => {
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
      const { itemStore } = this.props;
      return (
        <FlatList
          contentContainerStyle={{ paddingTop: 8 }}
          style={styles.itemList}
          data={toJS(itemStore.itemList)}
          refreshing={itemStore.isRefresing}
          refreshControl={
            <RefreshControl
              refreshing={itemStore.isRefresing}
              onRefresh={async () => {
                try {
                  await itemStore.getItems();
                } catch (error) {
                  console.log(">>> Erro de conexão: ", error);
                  this._isMounted &&
                    this.setState({
                      connectionErrorOccurred: true
                    });
                }
              }}
            />
          }
          extraData={this.props}
          keyExtractor={this._keyExtractor.bind(this)}
          renderItem={this._renderItem.bind(this)}
        />
      );
    }
  };

  _dismissSnackBar = () => {
    this._isMounted &&
      this.setState({
        snackBarVisible: false
      });
  };

  render() {
    console.log("RENDERIZOU!");
    return (
      <View style={styles.backgroundContainer}>
        {this._renderItemList()}
        <Snackbar
          visible={this.state.snackBarVisible}
          duration={2000}
          onDismiss={this._dismissSnackBar}
        >
          <Text style={styles.snackBarInstructionText}>{"Alugado por: "}</Text>
          <Text style={styles.snackBarEmailText}>{this.state.rentedBy}</Text>
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: "space-between"
  },
  itemList: {
    backgroundColor: Colors.backgroundGray
  },
  snackBarInstructionText: {
    fontSize: 14,
    color: "white",
    fontWeight: "400"
  },
  snackBarEmailText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600"
  },
  connectionErrorContainer: {
    flex: 1
  }
});

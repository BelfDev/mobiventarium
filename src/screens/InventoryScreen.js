import React, { Component } from "react";
import { View, FlatList, RefreshControl, StyleSheet } from "react-native";
import { Snackbar, Text } from 'react-native-paper'
import Item from "../components/Item";
import { observer, inject } from "mobx-react/native";
import { toJS } from "mobx";
import ItemFormatter from "../utils/ItemFormatter";
import Colors from "../utils/Colors";
import { Navigation } from "react-native-navigation";
import Navigator from "../navigation/Navigator";

@inject("itemStore")
@observer
export default class InventoryScreen extends Component {
  state = {
    itemPressed: false,
    snackBarVisible: false,
    rentedBy: null,
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  async componentDidAppear() {
    const { itemStore } = this.props;
    await itemStore.getRentedItemId();
    this.setState({
      itemPressed: false,
      rentedItemId: itemStore.rentedItemId
    });
    console.log(" RENTED ITEM: ", itemStore.rentedItemId)
  }

  componentDidMount = async () => {
    const { itemStore } = this.props;
    this.unsubscribe = await itemStore.subscribeToInventory();
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  _onItemPressed = item => {
    this.setState({
      itemPressed: true
    });

    if (this._isItemRentedBySessionUser(item.id)) {
      Navigator.goToRentedItemScreen(item);
    } else if (item.data.isRented) {
      this.setState({
        itemPressed: false,
        snackBarVisible: true,
        rentedBy: item.data.rentedBy
      });
    } else {
      Navigator.goToScannerScreenForCheckIn(item);
    }
  };

  _isItemRentedBySessionUser = (itemId) => {
    return this.state.rentedItemId === itemId
  }

  _keyExtractor = item => item.id.toString();

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
        statusLabelText={ItemFormatter.getStatusLabelText(data.isRented, this._isItemRentedBySessionUser(item.id))}
        statusLabelColor={ItemFormatter.getStatusLabelColor(data.isRented, this._isItemRentedBySessionUser(item.id))}
        statusLabelBorderColor={ItemFormatter.getStatusLabelBorderColor(data.isRented, this._isItemRentedBySessionUser(item.id))}
        iconName={ItemFormatter.getIconName(data.os)}
        iconColor={ItemFormatter.getPlatformTextColor(data.os)}
      />
    );
  };

  render() {
    const { itemStore } = this.props;
    return (
      <View style={styles.backgroundContainer}>
        <FlatList
          contentContainerStyle={{ paddingTop: 8 }}
          style={styles.itemList}
          data={toJS(itemStore.itemList)}
          refreshing={itemStore.isRefresing}
          refreshControl={
            <RefreshControl
              refreshing={itemStore.isRefresing}
              onRefresh={async () => await itemStore.getItems()}
            />
          }
          extraData={this.props}
          keyExtractor={this._keyExtractor.bind(this)}
          renderItem={this._renderItem.bind(this)}
        />
        <Snackbar
          visible={this.state.snackBarVisible}
          duration={2000}
          onDismiss={() => this.setState({
            snackBarVisible: false,
          })}
        >
          <Text
            style={styles.snackBarInstructionText}
          >
            {'Alugado por: '}
          </Text>
          <Text
            style={styles.snackBarEmailText}
          >
            {this.state.rentedBy}
          </Text>
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemList: {
    backgroundColor: Colors.backgroundGray,
  },
  snackBarInstructionText: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400',
  },
  snackBarEmailText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600'
  }
});

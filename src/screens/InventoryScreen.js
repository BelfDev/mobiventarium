import React, { Component } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
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
    itemPressed: false
  };

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    this.setState({
      itemPressed: false
    });
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
    this._showScannerScreen(item);
  };

  _showScannerScreen = item => {
    // Navigator.goToScannerScreen(id);
    Navigator.goToScannerScreenForCheckIn(item);
  };

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
        statusLabelText={ItemFormatter.getStatusLabelText(data.isRented)}
        statusLabelColor={ItemFormatter.getStatusLabelColor(data.isRented)}
        statusLabelBorderColor={ItemFormatter.getStatusLabelBorderColor(
          data.isRented
        )}
        iconName={ItemFormatter.getIconName(data.os)}
        iconColor={ItemFormatter.getPlatformTextColor(data.os)}
      />
    );
  };

  render() {
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
            onRefresh={async () => await itemStore.getItems()}
          />
        }
        extraData={this.props}
        keyExtractor={this._keyExtractor.bind(this)}
        renderItem={this._renderItem.bind(this)}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemList: {
    backgroundColor: Colors.backgroundGray
  }
});

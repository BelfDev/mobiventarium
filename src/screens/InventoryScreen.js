import React, { Component } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Item from "../components/Item";
import { observer, inject } from "mobx-react/native";
import { toJS } from "mobx";
import ItemFormatter from "../utils/ItemFormatter"

@inject("itemStore")
@observer
export default class InventoryScreen extends Component {
  async componentDidMount() {
    const { itemStore } = this.props;
    await itemStore.getDevices();
  }

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => {
    const device = Object.assign({}, item.data);
    return (
      <Item
        itemTitle={device.model}
        descriptionText={ItemFormatter.getDescriptionTextFormat(device.os)}
        descriptionTextColor={ItemFormatter.getPlatformTextColor(device.os)}
        statusLabelText={ItemFormatter.getStatusLabelText(device.isRented)}
        statusLabelColor={ItemFormatter.getStatusLabelColor(device.isRented)}
        statusLabelBorderColor={ItemFormatter.getStatusLabelBorderColor(device.isRented)}
        iconName={ItemFormatter.getIconName(device.os)}
        iconColor={ItemFormatter.getPlatformTextColor(device.os)}
      />
    );
  };

  render() {
    const { itemStore } = this.props;
    return (
      <FlatList
        data={toJS(itemStore.deviceList)}
        refreshing={itemStore.isRefresing}
        refreshControl={
          <RefreshControl
            refreshing={itemStore.isRefresing}
            onRefresh={async () => await itemStore.getDevices()}
          />
        }
        extraData={this.props}
        keyExtractor={this._keyExtractor.bind(this)}
        renderItem={this._renderItem.bind(this)}
      />
    );
  }
}

// const styles = StyleSheet.create({
//   separator: {
//     borderBottomWidth: 1,
//     borderColor: "lightgray",
//     marginLeft: 12,
//     marginRight: 12
//   }
// });

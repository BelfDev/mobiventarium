import React, { Component } from 'react'
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native'
import Item from '../components/Item'
import { observer, inject } from 'mobx-react/native'
import { toJS } from 'mobx'
import ItemFormatter from '../utils/ItemFormatter'
import Colors from '../utils/Colors'
import { Navigation } from 'react-native-navigation'
import { Screens } from '../screens'

@inject("itemStore")
@observer
export default class InventoryScreen extends Component {

  state = {
    itemPressed: false
  }

  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }

  componentDidAppear() {
    this.setState({
      itemPressed: false
    })
  }

  async componentDidMount() {
    const { itemStore } = this.props;
    await itemStore.getDevices();
  }

  _onItemPressed = (id) => {
    this.setState({
      itemPressed: true
    })
    this._showScannerScreen(id)
  }

  _showScannerScreen = (id) => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: Screens.ScannerScreen,
            passProps: {
              id: id,
              selectedItemId: 'stack with one child'
            },
            options: {
              modalPresentationStyle: 'overCurrentContext',
              layout: {
                orientation: ['portrait']
              },
              topBar: {
                visible: true,
                title: {
                  text: 'QR Code Scanner'
                }
              }
            }
          }
        }]
      }
    });
  }

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => {
    const device = Object.assign({}, item.data);
    return (
      <Item
        id={item.id}
        onPress={this._onItemPressed}
        itemTitle={device.model}
        disabled={this.state.itemPressed}
        descriptionText={ItemFormatter.getDescriptionTextFormat(device.os)}
        descriptionTextColor={ItemFormatter.getPlatformTextColor(device.os)}
        statusLabelText={ItemFormatter.getStatusLabelText(device.isRented)}
        statusLabelColor={ItemFormatter.getStatusLabelColor(device.isRented)}
        statusLabelBorderColor={ItemFormatter.getStatusLabelBorderColor(
          device.isRented
        )}
        iconName={ItemFormatter.getIconName(device.os)}
        iconColor={ItemFormatter.getPlatformTextColor(device.os)}
      />
    );
  };

  render() {
    const { itemStore } = this.props;
    return (
      <FlatList
        contentContainerStyle={{ paddingTop: 8 }}
        style={styles.itemList}
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

const styles = StyleSheet.create({
  itemList: {
    backgroundColor: Colors.backgroundGray
  }
});

import React, { Component } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Item from "../components/Item";
import { observer, inject } from "mobx-react/native";
import { toJS } from "mobx";

@inject("itemStore")
@observer
export default class InventoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { itemStore } = this.props;
    await itemStore.fetchUsersAsync();
  }

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => {
    const params = Object.assign({}, item);
    return <Item {...params} />;
  };

  render() {
    const { itemStore } = this.props;
    return (
      <FlatList
        data={toJS(itemStore.users)}
        refreshing={itemStore.isRefresing}
        refreshControl={
          <RefreshControl
            refreshing={itemStore.isRefresing}
            onRefresh={async () => await itemStore.fetchUsersAsync()}
          />
        }
        extraData={this.props}
        keyExtractor={this._keyExtractor.bind(this)}
        renderItem={this._renderItem.bind(this)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: "lightgray",
    marginLeft: 12,
    marginRight: 12
  }
});

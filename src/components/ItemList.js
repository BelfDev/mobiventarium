import React, { Component } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Item from "../components/Item";

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor = item => item.id.toString();

  _renderItem = ({ item }) => {
    const params = Object.assign({}, item);
    return <Item {...params} />;
  };

  render() {
    return (
      <FlatList
        style={styles.list}
        refreshControl={<RefreshControl />}
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
  },
  list: {
    backgroundColor: 'lightgray'
  }
});

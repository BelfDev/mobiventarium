import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import ItemList from "../components/ItemList";

export default class InventoryScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ItemList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

import { AsyncStorage } from "react-native";

const USER_KEY = "USER_KEY";
const RENTED_ITEM_ID = "RENTED_ITEM_ID";

export default class LocalStorage {
  static async saveAppRootComponentName(name) {
    try {
      await AsyncStorage.setItem("rootComponentName", name);
    } catch (error) {
      console.log(">>> saveAppRootComponentName: ", error);
    }
  }

  static async saveAppRootInitialProps(props) {
    try {
      let stringifiedProps = JSON.stringify(props);
      await AsyncStorage.setItem("rootComponentInitialProps", stringifiedProps);
    } catch (error) {
      console.log(">>> rootComponentInitialProps: ", error);
    }
  }

  static async saveAuthenticatedUser(user) {
    try {
      let stringifiedUser = JSON.stringify(user);
      await AsyncStorage.setItem(USER_KEY, stringifiedUser);
    } catch (error) {
      console.log(">>> saveAuthenticatedUser: ", error);
    }
  }

  static async clearAuthenticatedUser() {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.log(">>> clearAuthenticatedUser: ", error);
    }
  }

  static async getAppRootComponentName() {
    try {
      return AsyncStorage.getItem("rootComponentName");
    } catch (error) {
      console.log(">>> getAppRootComponentName: ", error);
    }
  }

  static async getAppRootInitialProps() {
    try {
      let stringifiedProps = await AsyncStorage.getItem(
        "rootComponentInitialProps"
      );
      return JSON.parse(stringifiedProps);
    } catch (error) {
      console.log(">>> rootComponentInitialProps: ", error);
    }
  }

  static async getAppRootInitialProps() {
    try {
      let stringifiedProps = await AsyncStorage.getItem(
        "rootComponentInitialProps"
      );
      return JSON.parse(stringifiedProps);
    } catch (error) {
      console.log(">>> rootComponentInitialProps: ", error);
    }
  }

  static async getAuthenticatedUser() {
    try {
      let stringifiedUser = await AsyncStorage.getItem(USER_KEY);
      return JSON.parse(stringifiedUser);
    } catch (error) {
      console.log(">>> getAuthenticatedUser: ", error);
      throw "No authenticated user found";
    }
  }

}

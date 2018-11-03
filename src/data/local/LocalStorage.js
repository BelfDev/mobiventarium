import { AsyncStorage } from "react-native";

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
      let stringifiedProps = JSON.stringify(props)
      await AsyncStorage.setItem("rootComponentInitialProps", stringifiedProps);
    } catch (error) {
      console.log(">>> rootComponentInitialProps: ", error);
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
      let stringifiedProps = await AsyncStorage.getItem("rootComponentInitialProps");
      return JSON.parse(stringifiedProps)
    } catch (error) {
      console.log(">>> rootComponentInitialProps: ", error);
    }
  }

}

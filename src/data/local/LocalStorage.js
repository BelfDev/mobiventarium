import { AsyncStorage } from "react-native";

export default class LocalStorage {
  
  static async saveAppRootComponentName(name) {
    try {
      await AsyncStorage.setItem("rootComponentName", name);
    } catch (error) {
      console.log(">>> saveAppRootComponentName: ", error);
    }
  }

  static async getAppRootComponentName() {
    try {
      return AsyncStorage.getItem("rootComponentName");
    } catch (error) {
      console.log(">>> getAppRootComponentName: ", error);
    }
  }
}

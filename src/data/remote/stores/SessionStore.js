import { observable, action, toJS } from "mobx";
import BaseStore from "./BaseStore";
import LocalStorage from "../../local/LocalStorage";
import { isEmpty, isNil } from "ramda";
import AuthenticationApiService from "../services/AuthenticationApiService";
import UserDataApiService from "../services/UserDataApiService";

export default class SessionStore extends BaseStore {
  @observable
  user = {};

  @observable
  rentedItems = []

  @action
  async signUserIn(inputEmail, inputPassword) {
    const credential = await AuthenticationApiService.signIn(
      inputEmail,
      inputPassword
    );
    const { uid, displayName, email, photoURL, metadata } = credential.user;

    const data = await UserDataApiService.getUserDataById(uid);
    const user = {
      id: uid,
      email,
      name: displayName,
      photoURL,
      lastSignInTime: metadata.lastSignInTime,
      creationTime: metadata.creationTime,
      data
    };
    if (!isNil(data)) { this.rentedItems = data.rentedItems }
    this.user = user;
    await LocalStorage.saveAuthenticatedUser(this.user);
    console.log(">>> SAVED authenticated user: ", this.user);
  }

  @action
  async getSessionUser() {
    if (isEmpty(this.user)) {
      this.user = await LocalStorage.getAuthenticatedUser();
    }
    return this.user;
  }

  @action
  async addRentedItem(rentedItemId) {
    try {
      this.rentedItems.push(rentedItemId)
      const data = {
        rentedItems : toJS(this.rentedItems),
      }
      console.log(">> DATA: ", data)
      this.user.data = data;
      await UserDataApiService.createUserDataIfNeeded(toJS(this.user));
    } catch (error) {
      console.log(">>> createUserDataIfNeeded error: ", this.user);
      throw "Error setting user data";
    }
  }

  @action
  async returnRentedItem(rentedItemId) {
    try {
      this.rentedItems.splice(this.rentedItems.indexOf(rentedItemId), 1);
      const data = {
        rentedItems : toJS(this.rentedItems),
      }
      this.user.data = data;
      await UserDataApiService.createUserDataIfNeeded(this.user);
    } catch (error) {
      console.log(">>> createUserDataIfNeeded error: ", this.user);
      throw "Error setting user data";
    }
  }

  @action
  async signSessionUserOut() {
    try {
      await AuthenticationApiService.signOut();
      await LocalStorage.clearAuthenticatedUser();
      this.rentedItems = [];
      this.user = {};
    } catch (error) {
      console.log(">>> signSessionUserOut error: ", error);
      throw "SignOut Error";
    }
  }
}

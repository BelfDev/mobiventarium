import { observable, action } from "mobx";
import BaseStore from "./BaseStore";
import LocalStorage from "../../local/LocalStorage";
import { isEmpty, isNil } from "ramda";
import AuthenticationApiService from "../services/AuthenticationApiService";
import UserDataApiService from "../services/UserDataApiService";

export default class SessionStore extends BaseStore {
  @observable
  user = {};

  @observable
  rentedItemId = null;

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
    if (!isNil(data)) { this.rentedItemId = data.rentedItemId }
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
  async setUserData(rentedItemId) {

    const data = {
      rentedItemId,
    }

    this.user.data = data;
    console.log("NEW DATA: ", this.user.data);
    try {
      await UserDataApiService.createUserDataIfNeeded(this.user);
      this.rentedItemId = rentedItemId
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
      this.rentedItemId = null;
      this.user = {};
    } catch (error) {
      console.log(">>> signSessionUserOut error: ", error);
      throw "SignOut Error";
    }
  }
}

import { observable, action } from "mobx";
import BaseStore from "./BaseStore";
import LocalStorage from "../../local/LocalStorage";
import { isEmpty } from "ramda";
import AuthenticationApiService from "../services/AuthenticationApiService";

export default class SessionStore extends BaseStore {
  @observable
  user = {};

  @action
  async setSessionUser(user) {
    const { uid, displayName, email, photoURL, metadata } = user;

    this.user = {
      id: uid,
      email,
      name: displayName,
      photoURL,
      lastSignInTime: metadata.lastSignInTime,
      creationTime: metadata.creationTime
    };

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
  async signSessionUserOut() {
    try {
      await AuthenticationApiService.signOut();
      await LocalStorage.clearAuthenticatedUser();
      this.user = {};
    } catch (error) {
      console.log(">>> signSessionUserOut error: ", error);
      throw "SignOut Error";
    }
  }
}

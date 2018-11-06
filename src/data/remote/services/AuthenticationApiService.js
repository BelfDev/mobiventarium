import firebase from "react-native-firebase";

const authentication = firebase.auth();
export default class AuthenticationApiService {
  static async signIn(email, password) {
    return authentication.signInAndRetrieveDataWithEmailAndPassword(
      email,
      password
    );
  }
  static async signUp(email, password, context) {
    return authentication.createUserAndRetrieveDataWithEmailAndPassword(
      email,
      password
    );
  }

  static async signOut() {
    return authentication.signOut();
  }
}

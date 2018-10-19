import { Navigation } from "react-native-navigation";
// import InventoryScreen from "./InventoryScreen"
import WelcomeScreen from "./WelcomeScreen";
import UserListScreen from "./UserListScreen";
import InterfaceTestScreen from "./InterfaceTestScreen";
import InventoryScreen from "./InventoryScreen";
import { storeProviderHOC } from "../utils/StoreProvider";

const APP_BUNDLE_ID = "com.mobiventarium";

export function registerScreens(store, provider) {

  Navigation.registerComponent(`${APP_BUNDLE_ID}.WelcomeScreen`, () =>
    storeProviderHOC(WelcomeScreen, provider, store)
  );

  Navigation.registerComponent(
    `${APP_BUNDLE_ID}.UserListScreen`,
 () =>  storeProviderHOC(UserListScreen, provider, store)
  );

  Navigation.registerComponent(
    `${APP_BUNDLE_ID}.InterfaceTestScreen`,
 () =>  storeProviderHOC(InterfaceTestScreen, provider, store)
  );

  Navigation.registerComponent(
    `${APP_BUNDLE_ID}.InventoryScreen`,
 () =>  storeProviderHOC(InventoryScreen, provider, store)
  );
 

  // Navigation.registerComponent(
  //   `${APP_BUNDLE_ID}.WelcomeScreen`,
  //   () => WelcomeScreen,
  //   store,
  //   provider
  // );
  // Navigation.registerComponent(
  //   `${APP_BUNDLE_ID}.InventoryScreen`,
  //   () => InventoryScreen,
  //   store,
  //   provider
  // );
  // Navigation.registerComponent(
  //   `${APP_BUNDLE_ID}.UserListScreen`,
  //   () => UserListScreen,
  //   store,
  //   provider
  // );
}

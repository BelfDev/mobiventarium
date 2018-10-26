import { Navigation } from "react-native-navigation";
import WelcomeScreen from "./WelcomeScreen";
import InterfaceTestScreen from "./InterfaceTestScreen";
import InventoryScreen from "./InventoryScreen";
import { storeProviderHOC } from "../utils/StoreProvider";
import ScannerScreen from "../screens/ScannerScreen";

const APP_BUNDLE_ID = "com.mobiventarium";

export const Screens = {
  InventoryScreen: `${APP_BUNDLE_ID}.InventoryScreen`,
  WelcomeScreen: `${APP_BUNDLE_ID}.WelcomeScreen`,
  InterfaceTestScreen: `${APP_BUNDLE_ID}.InterfaceTestScreen`,
  ScannerScreen: `${APP_BUNDLE_ID}.ScannerScreen`,
}

const screenList = [
  {
    name: Screens.InventoryScreen,
    component: InventoryScreen
  },
  {
    name: Screens.WelcomeScreen,
    component: WelcomeScreen
  },
  {
    name: Screens.InterfaceTestScreen,
    component: InterfaceTestScreen
  },
  {
    name: Screens.ScannerScreen,
    component: ScannerScreen
  }
];

export function registerScreens(store, provider) {
  screenList.forEach(screen => {
    Navigation.registerComponent(screen.name, () =>
      storeProviderHOC(screen.component, provider, store)
    );
  });
}

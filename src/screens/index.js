import { Navigation } from "react-native-navigation";
import WelcomeScreen from "./WelcomeScreen";
import InterfaceTestScreen from "./InterfaceTestScreen";
import InventoryScreen from "./InventoryScreen";
import { storeProviderHOC } from "../utils/StoreProvider";

const APP_BUNDLE_ID = "com.mobiventarium";

const screens = [
  {
    name: "InventoryScreen",
    component: InventoryScreen
  },
  {
    name: "WelcomeScreen",
    component: WelcomeScreen
  },
  {
    name: "InterfaceTestScreen",
    component: InterfaceTestScreen
  }
];

export function registerScreens(store, provider) {
  screens.forEach(screen => {
    Navigation.registerComponent(`${APP_BUNDLE_ID}.${screen.name}`, () =>
      storeProviderHOC(screen.component, provider, store)
    );
  });
}

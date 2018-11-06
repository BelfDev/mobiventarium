import OnboardingScreen from "./OnboardingScreen";
import InterfaceTestScreen from "./InterfaceTestScreen";
import InventoryScreen from "./InventoryScreen";
import ScannerScreen from "../screens/ScannerScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import RentedItemScreen from "./RentedItemScreen";
import { Navigation } from "react-native-navigation";
import { storeProviderHOC } from "../utils/StoreProvider";
import NavigationStyle from "../navigation/NavigationStyle";
import { APP_BUNDLE_ID } from "../navigation/AppConfig";

export const Screens = {
  InventoryScreen: `${APP_BUNDLE_ID}.InventoryScreen`,
  OnboardingScreen: `${APP_BUNDLE_ID}.OnboardingScreen`,
  InterfaceTestScreen: `${APP_BUNDLE_ID}.InterfaceTestScreen`,
  ScannerScreen: `${APP_BUNDLE_ID}.ScannerScreen`,
  LoginScreen: `${APP_BUNDLE_ID}.LoginScreen`,
  SignUpScreen: `${APP_BUNDLE_ID}.SignUpScreen`,
  RentedItemScreen: `${APP_BUNDLE_ID}.RentedItemScreen`
};

export const AppRootComponent = {
  name: Screens.InventoryScreen,
  options: NavigationStyle.InventoryScreen,
  passProps: {}
};

const screenList = [
  {
    name: Screens.OnboardingScreen,
    component: OnboardingScreen
  },
  {
    name: Screens.LoginScreen,
    component: LoginScreen
  },
  {
    name: Screens.SignUpScreen,
    component: SignUpScreen
  },
  ,
  {
    name: Screens.InventoryScreen,
    component: InventoryScreen
  },
  {
    name: Screens.InterfaceTestScreen,
    component: InterfaceTestScreen
  },
  {
    name: Screens.ScannerScreen,
    component: ScannerScreen
  },
  {
    name: Screens.RentedItemScreen,
    component: RentedItemScreen
  }
];

export function registerScreens(store, provider) {
  screenList.forEach(screen => {
    Navigation.registerComponent(screen.name, () =>
      storeProviderHOC(screen.component, provider, store)
    );
  });
}

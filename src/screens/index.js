import { Navigation } from "react-native-navigation";
import WelcomeScreen from "./WelcomeScreen";
import InterfaceTestScreen from "./InterfaceTestScreen";
import InventoryScreen from "./InventoryScreen";
import { storeProviderHOC } from "../utils/StoreProvider";
import ScannerScreen from "../screens/ScannerScreen";
import StartScreen from "./StartScreen"
import LoginScreen from "./LoginScreen"
import SignUpScreen from "./SignUpScreen"
import RentedItemScreen from './RentedItemScreen'
import NavigationStyle from '../utils/NavigationStyle'

const APP_BUNDLE_ID = "com.mobiventarium";

export const Screens = {
  StartScreen: `${APP_BUNDLE_ID}.StartScreen`,
  InventoryScreen: `${APP_BUNDLE_ID}.InventoryScreen`,
  WelcomeScreen: `${APP_BUNDLE_ID}.WelcomeScreen`,
  InterfaceTestScreen: `${APP_BUNDLE_ID}.InterfaceTestScreen`,
  ScannerScreen: `${APP_BUNDLE_ID}.ScannerScreen`,
  LoginScreen: `${APP_BUNDLE_ID}.LoginScreen`,
  SignUpScreen: `${APP_BUNDLE_ID}.SignUpScreen`,
  RentedItemScreen: `${APP_BUNDLE_ID}.RentedItemScreen`,
}

const screenList = [
  {
    name: Screens.WelcomeScreen,
    component: WelcomeScreen
  },
  {
    name: Screens.StartScreen,
    component: StartScreen
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

export const AppRootComponent = {
  name: Screens.InterfaceTestScreen,
  options: NavigationStyle.InventoryScreen,
  props: {
    selectedItemId: '6QAm11mygRhFqo4ZU4rz',
    itemTitle: 'Device De Teste',
    itemType: 'ios',
  },
}

export function registerScreens(store, provider) {
  screenList.forEach(screen => {
    Navigation.registerComponent(screen.name, () =>
      storeProviderHOC(screen.component, provider, store)
    );
  });
}

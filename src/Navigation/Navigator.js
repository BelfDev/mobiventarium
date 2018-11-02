import { Navigation } from "react-native-navigation";
import NavigationStyle from "./NavigationStyle";
import { AppRootComponent, Screens } from '../screens'
import { setupAppRootComponent } from "./AppConfig";

export const handleAppLaunch = async () => {
  Navigation.events().registerAppLaunchedListener(async () => {
    Navigation.setDefaultOptions(NavigationStyle.Shared);
    await setupAppRootComponent();
    this._setAppRoot(AppRootComponent);
  });
};

_setAppRoot = component => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: component
          }
        ]
      }
    }
  });
};

export const goToAuthenticationScreen = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: Screens.WelcomeScreen,
              options: NavigationStyle.WelcomeScreen
            }
          }
        ]
      }
    }
  });

export const goToHomeScreen = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: Screens.InventoryScreen,
              options: NavigationStyle.InventoryScreen,
              navigatorStyle: {
                navBarHidden: true
              }
            }
          }
        ]
      }
    }
  });

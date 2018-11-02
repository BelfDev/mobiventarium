import { Navigation } from "react-native-navigation";
import NavigationStyle from "./NavigationStyle";
import { AppRootComponent } from '../screens'
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

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "com.mobiventarium.WelcomeScreen",
              options: {
                topBar: {
                  visible: true,
                  drawBehind: true,
                  transparent: true,
                  elevation: 0,
                  background: {
                    color: "transparent"
                  }
                }
              }
            }
          }
        ]
      }
    }
  });

export const goHome = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "com.mobiventarium.InventoryScreen",
              options: {
                topBar: {
                  visible: true,
                  drawBehind: true,
                  transparent: true,
                  elevation: 0,
                  background: {
                    color: "transparent"
                  }
                }
              },
              navigatorStyle: {
                navBarHidden: true
              }
            }
          }
        ]
      }
    }
  });

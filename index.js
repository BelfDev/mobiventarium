import Stores from "./src/data/remote/stores/RootStores";
import { registerScreens } from "./src/screens";
import { Navigation } from "react-native-navigation";
import { Provider } from "mobx-react";
import Colors from "./src/utils/Colors";
import { AppRootComponent } from "./src/screens";
import NavigationStyle from "./src/utils/NavigationStyle";
import { Screens } from "./src/screens";
import LocalStorage from './src/data/local/LocalStorage'
import { getNavigationStyle } from './src/utils/NavigationStyle'
import { isNil } from 'ramda'

registerScreens(Stores, Provider);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      backgroundColor: Colors.topBarPurple,
      style: "light"
    },
    animations: {
      setRoot: {
        alpha: {
          from: 0,
          to: 1,
          duration: 250,
          interpolation: "accelerate"
        }
      },
      push: {
        enabled: "true",
        waitForRender: false,
        topBar: {
          alpha: {
            from: 0,
            to: 1
          }
        },
        content: {
          x: {
            from: 1000,
            to: 0,
            duration: 250,
            interpolation: "accelerate"
          },
          alpha: {
            from: 0,
            to: 1,
            duration: 250,
            interpolation: "accelerate"
          }
        }
      },
      pop: {
        enabled: "true",
        waitForRender: false,
        content: {
          x: {
            from: 0,
            to: 1000,
            duration: 250,
            interpolation: "decelerate"
          },
          alpha: {
            from: 1,
            to: 0,
            duration: 250,
            interpolation: "decelerate"
          }
        }
      }
    }
  });

  const rootComponentName = await LocalStorage.getAppRootComponentName()
  if (!isNil(rootComponentName)) { AppRootComponent.name = rootComponentName}
  AppRootComponent.options = getNavigationStyle(rootComponentName)

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: AppRootComponent.name,
              options: AppRootComponent.options,
              passProps: AppRootComponent.props
            }
          }
        ]
      }
    }
  });
});

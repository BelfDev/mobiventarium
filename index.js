
import Stores from "./src/stores/RootStores";
import { registerScreens } from "./src/screens";
import { Navigation } from "react-native-navigation";
import { Provider } from "mobx-react";
import Colors from "./src/utils/Colors";
import NavigationStyle from "./src/utils/NavigationStyle";
import { Screens } from "./src/screens";

registerScreens(Stores, Provider);

Navigation.events().registerAppLaunchedListener(() => {
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
          interpolation: 'accelerate'
        }
      },
      push: {
        enabled: 'true',
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
            interpolation: 'accelerate',
          },
          alpha: {
            from: 0,
            to: 1,
            duration: 250,
            interpolation: 'accelerate'
          }
        },

      },
      pop: {
        enabled: 'true',
        waitForRender: false,
        content: {
          x: {
            from: 0,
            to: 1000,
            duration: 250,
            interpolation: 'decelerate',
          },
          alpha: {
            from: 1,
            to: 0,
            duration: 250,
            interpolation: 'decelerate'
          }
        }
      }
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.InterfaceTestScreen,
              options: NavigationStyle.InventoryScreen
            }
          }
        ]
      }
    }
  });
});
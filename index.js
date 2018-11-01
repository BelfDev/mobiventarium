
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
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: Screens.StartScreen,
              options: NavigationStyle.StartScreen
            }
          }
        ]
      }
    }
  });
});
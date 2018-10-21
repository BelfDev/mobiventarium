import Stores from "./src/stores/RootStores";
import { registerScreens } from "./src/screens";
import { Navigation } from "react-native-navigation";
import { Provider } from "mobx-react";
import Colors from "./src/utils/Colors";

registerScreens(Stores, Provider);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      backgroundColor: Colors.topBarPurple,
      style: "light"
    },
    topBar: {
      visible: true,
      elevation: 4,
      title: {
        text: "Inventory Manager",
        fontSize: 20,
        color: "white",
        fontWeight: "500",
        alignment: "center"
      },
      background: {
        color: Colors.topBarPurple,
        translucent: true,
        blur: false
      },
      largeTitle: {
        visible: true,
        fontSize: 30,
        color: "white"
      }
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: "com.mobiventarium.InventoryScreen"
            }
          }
        ]
      }
    }
  });
});

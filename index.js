import { Navigation } from "react-native-navigation";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import InventoryScreen from "./src/screens/InventoryScreen";

Navigation.registerComponent(`com.mobiventarium.WelcomeScreen`, () => WelcomeScreen);
Navigation.registerComponent(`com.mobiventarium.InventoryScreen`, () => InventoryScreen)

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "com.mobiventarium.InventoryScreen"
      }
    }
  });
});

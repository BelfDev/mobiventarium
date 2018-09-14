import { Navigation } from "react-native-navigation";
import WelcomeScreen from "./src/screen/WelcomeScreen";

Navigation.registerComponent(`com.mobiventarium.WelcomeScreen`, () => WelcomeScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "com.mobiventarium.WelcomeScreen"
      }
    }
  });
});

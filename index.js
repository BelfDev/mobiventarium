import { Navigation } from "react-native-navigation";
import WelcomeScreen from "./src/screen/WelcomeScreen";

Navigation.registerComponent(`navigation.playground.WelcomeScreen`, () => WelcomeScreen);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "navigation.playground.WelcomeScreen"
      }
    }
  });
});

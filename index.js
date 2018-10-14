import {Navigation} from 'react-native-navigation';
import {Screens} from "./src/screens/Screens";


Screens();
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'StartScreen'
      }
    },
  });
});

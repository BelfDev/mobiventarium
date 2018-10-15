import Stores from './src/stores/RootStores';
import { registerScreens } from './src/screens'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'mobx-react';

registerScreens(Stores, Provider);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: "com.mobiventarium.UserListScreen"
      }
    }
  });
});

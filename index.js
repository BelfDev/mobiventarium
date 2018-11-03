import Stores from "./src/data/remote/stores/RootStores";
import { Provider } from "mobx-react";
import { registerScreens } from "./src/screens";
import Navigator from './src/navigation/Navigator'

registerScreens(Stores, Provider);
Navigator.handleAppLaunch()

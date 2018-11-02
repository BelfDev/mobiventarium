import Stores from "./src/data/remote/stores/RootStores";
import { Provider } from "mobx-react";
import { registerScreens } from "./src/screens";
import { handleAppLaunch } from './src/navigation/Navigator'

registerScreens(Stores, Provider);
handleAppLaunch()

import Stores from "./data/remote/stores/RootStores";
import { Provider } from "mobx-react";
import { registerScreens } from "./screens";
import Navigator from './navigation/Navigator'

registerScreens(Stores, Provider);
Navigator.handleAppLaunch()

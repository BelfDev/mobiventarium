import LocalStorage from "../data/local/LocalStorage";
import { AppRootComponent } from "../screens"
import { getNavigationStyle } from './NavigationStyle'
import { isNil } from "ramda";

export const APP_BUNDLE_ID = "com.mobiventarium";

export async function setupAppRootComponent() {
  const rootComponentName = await LocalStorage.getAppRootComponentName();
  if (!isNil(rootComponentName)) { AppRootComponent.name = rootComponentName; }
  const navigationStyle = getNavigationStyle(AppRootComponent.name);
  if (!isNil(navigationStyle)) { AppRootComponent.options = navigationStyle; }
}

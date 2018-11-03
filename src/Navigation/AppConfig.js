import LocalStorage from "../data/local/LocalStorage";
import { AppRootComponent, Screens } from "../screens";
import { getNavigationStyle } from "./NavigationStyle";
import { isNil } from "ramda";

export const APP_BUNDLE_ID = "com.mobiventarium";

export async function setupAppRootComponent() {
  if (await isAuthenticated()) {
    await setAuthenticatedRoot()
  } else {
    setUnauthenticatedRoot()
  }
  const navigationStyle = getNavigationStyle(AppRootComponent.name);
  if (!isNil(navigationStyle)) {
    AppRootComponent.options = navigationStyle;
  }
}

async function isAuthenticated() {
  try {
    const user = await LocalStorage.getAuthenticatedUser();
    return !isNil(user)
  } catch (error) {
    console.log(">>> verifyAuthentication: ", error);
    return false;
  }
}

async function setAuthenticatedRoot() {
  const rootComponentName = await LocalStorage.getAppRootComponentName();
  if (!isNil(rootComponentName)) {
    AppRootComponent.name = rootComponentName;
  }
  const rootComponentInitialProps = await LocalStorage.getAppRootInitialProps();
  if (!isNil(rootComponentInitialProps)) {
    AppRootComponent.passProps = rootComponentInitialProps;
  }
}

function setUnauthenticatedRoot() {
  AppRootComponent.name = Screens.OnboardingScreen;
}

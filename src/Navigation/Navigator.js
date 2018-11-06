import { Navigation } from "react-native-navigation";
import NavigationStyle from "./NavigationStyle";
import { AppRootComponent, Screens } from "../screens";
import { setupAppRootComponent } from "./AppConfig";
import LocalStorage from "../data/local/LocalStorage";
import Strings from "../utils/Strings";

export default class Navigator {
  static async handleAppLaunch() {
    Navigation.events().registerAppLaunchedListener(async () => {
      Navigation.setDefaultOptions(NavigationStyle.Shared);
      await setupAppRootComponent();
      Navigation.setRoot({
        root: {
          stack: {
            children: [
              {
                component: AppRootComponent
              }
            ]
          }
        }
      });
    });
  }

  static async goToOnboardingScreen() {
    Navigation.setRoot({
      root: {
        stack: {
          id: "App",
          children: [
            {
              component: {
                name: Screens.OnboardingScreen,
                options: NavigationStyle.OnboardingScreen
              }
            }
          ]
        }
      }
    });
  }

  static async goToInventoryScreen() {
    Navigation.setRoot({
      root: {
        stack: {
          id: "App",
          children: [
            {
              component: {
                name: Screens.InventoryScreen,
                options: NavigationStyle.InventoryScreen,
                navigatorStyle: {
                  navBarHidden: true
                }
              }
            }
          ]
        }
      }
    });
  }

  static async goToRentedItemScreen(selectedItem) {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: Screens.RentedItemScreen,
              options: NavigationStyle.RentedItemScreen,
              passProps: {
                selectedItemId: selectedItem.id,
                itemTitle: selectedItem.data.model,
                itemType: selectedItem.data.os
              }
            }
          }
        ]
      }
    });
  }

  // Navigation.push(componentId, {
  //   component: {
  //     name: Screens.RentedItemScreen,
  //     options: NavigationStyle.RentedItemScreen,
  //     passProps: {
  //       selectedItemId: selectedItem.id,
  //       itemTitle: selectedItem.data.model,
  //       itemType: selectedItem.data.os
  //     }
  //   }
  // });

  static async goToScannerScreenForCheckIn(selectedItem) {
    const mode = "checkIn";
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: Screens.RentedItemScreen,
              options: NavigationStyle.RentedItemScreen,
              passProps: {
                selectedItemId: selectedItem.id,
                itemTitle: selectedItem.data.model,
                itemType: selectedItem.data.os
              }
            }
          },
          {
            component: {
              name: Screens.ScannerScreen,
              options: NavigationStyle.ScannerScreen,
              passProps: {
                selectedItemId: selectedItem.id,
                modalTitle: Strings.scanner.screenTitle,
                instruction: Strings.scanner.instructionText,
                mode
              }
            }
          }
        ]
      }
    });
  }

  static async goToScannerScreenForCheckout(rentedItemId, inventoryCode) {
    const mode = "checkOut";
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: Screens.ScannerScreen,
              options: NavigationStyle.ScannerScreen,
              passProps: {
                selectedItemId: rentedItemId,
                modalTitle: Strings.scanner.screenTitle,
                instruction: Strings.scanner.instructionText,
                inventoryCode: inventoryCode,
                mode
              }
            }
          }
        ]
      }
    });
  }

  static async goToInventoryScreenAfterCheckOut() {
    Navigation.dismissAllModals();
  }

  static async goToRentedItemScreenAfterCheckIn(componentId) {
    Navigation.pop(componentId);
  }

  static async goToOnboardingScreen(componentId) {
    await this._setNewStackRoot(
      componentId,
      Screens.OnboardingScreen,
      NavigationStyle.OnboardingScreen,
      {}
    );
  }

  static dismissModal(componentId) {
    Navigation.dismissModal(componentId);
  }

  static async _setNewStackRoot(
    componentId,
    screenName,
    navigationStyle,
    props
  ) {
    try {
      AppRootComponent.name = screenName;
      AppRootComponent.options = navigationStyle;
      AppRootComponent.passProps = props;

      await LocalStorage.saveAppRootComponentName(screenName);
      await LocalStorage.saveAppRootInitialProps(props);

      Navigation.setStackRoot(componentId, {
        component: AppRootComponent,
      });
    } catch (error) {
      console.log(">>> _setNewStackRoot error: ", error);
    }
  }
}

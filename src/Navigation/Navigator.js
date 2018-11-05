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

  // static async goToScannerScreen(selectedItemId) {
  //   Navigation.showModal({
  //     stack: {
  //       children: [
  //         {
  //           component: {
  //             name: Screens.ScannerScreen,
  //             options: NavigationStyle.ScannerScreen,
  //             passProps: {
  //               selectedItemId: selectedItemId,
  //               modalTitle: Strings.scanner.screenTitle,
  //               instruction: Strings.scanner.instructionText
  //             }
  //           }
  //         }
  //       ]
  //     }
  //   });
  // }

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

  // static async goToRentedItemScreen(componentId, rentedItem) {
  //   const props = {
  // selectedItemId: rentedItem.id,
  // itemTitle: rentedItem.data.model,
  // itemType: rentedItem.data.os
  //   };
  //   this._setNewStackRoot(
  //     componentId,
  //     Screens.RentedItemScreen,
  //     NavigationStyle.RentedItemScreen,
  //     props,
  //   );
  // }

  static async goToRentedItemScreen(componentId, rentedItem) {
    const props = {
      selectedItemId: rentedItem.id,
      itemTitle: rentedItem.data.model,
      itemType: rentedItem.data.os
    };
    this._setNewStackRoot(
      componentId,
      Screens.RentedItemScreen,
      NavigationStyle.RentedItemScreen,
      props
    );
  }

  static async leaveRentedItemScreen(componentId) {
    this._setNewStackRoot(
      componentId,
      Screens.InventoryScreen,
      NavigationStyle.InventoryScreen,
      {}
    );
  }

  static async goToScannerScreenForCheckout(rentedItemId, inventoryCode) {
    const mode = "checkOut";
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: Screens.InventoryScreen,
              options: NavigationStyle.InventoryScreen,
            }
          },
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

  static async goToInventoryScreenAfterCheckOut(componentId) {
    Navigation.popToRoot(componentId)
  }

  static async goToRentedItemScreenAfterCheckIn(componentId) {
    Navigation.pop(componentId)
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

      console.log(">>> OPTIONS: ", AppRootComponent.options);

      await LocalStorage.saveAppRootComponentName(screenName);
      await LocalStorage.saveAppRootInitialProps(props);

      Navigation.setStackRoot(componentId, {
        component: AppRootComponent
      });
    } catch (error) {
      console.log(">>> _setNewStackRoot error: ", error);
    }
  }

  // static async _setNewStackRoot(
  //   componentId,
  //   screenName,
  //   navigationStyle,
  //   props,
  // ) {
  //   try {
  //     AppRootComponent.name = screenName;
  //     AppRootComponent.options = navigationStyle
  //     AppRootComponent.passProps = props;

  //     console.log(">>> OPTIONS: ", AppRootComponent.options);

  //     await LocalStorage.saveAppRootComponentName(screenName);
  //     await LocalStorage.saveAppRootInitialProps(props);
  //     Navigation.setStackRoot(componentId, {
  //       component: AppRootComponent
  //     });
  //   } catch (error) {
  //     console.log(">>> _setNewStackRoot error: ", error);
  //   }
  // }
}

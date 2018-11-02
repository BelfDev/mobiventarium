import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableNativeFeedback } from "react-native";
import {
  Text,
  TouchableRipple,
  Divider,
  Card,
  Title,
  Button,
  IconButton
} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Images from "assets";
import InventoryApiService from "../data/remote/services/InventoryApiService";
import PopupDialog, { ScaleAnimation } from "react-native-popup-dialog";
import Colors from "../utils/Colors";
import FeedbackDialog from "../components/FeedbackDialog";
import { CommandsObserver } from "react-native-navigation/lib/dist/events/CommandsObserver";
import { Screens, AppRootComponent } from './index'
import NavigationStyle from '../utils/NavigationStyle'
import { Navigation } from 'react-native-navigation'
import LocalStorage from '../data/local/LocalStorage'

export default class InterfaceTestScreen extends Component {
  constructor(props) {
    super(props);
    // this.unsubscribe = null
    this.state = {
      feedbackMode: "failure"
    };
  }

  componentDidMount = async () => {
    // this.unsubscribe = await InventoryApiService.subscribeToChanges(
    //   this.onItemUpdate
    // );
  };

  onItemUpdate = snapshot => {
    console.log("Something has changed", snapshot);
    console.log("Documents changes: ", snapshot.docChanges);
    snapshot.docChanges.forEach(element => {
      console.log("Changed doc: ", element);
    });
  };

  unsubscribeCollection = async () => {
    console.log("Trying to unsubscribe...", this.unsubscribe)
    this.unsubscribe();
  };

  addItem = async () => {
    console.log("Adding Device");
    const device = await InventoryApiService.addItem({
      data: {
        version: "Super Teste",
        brand: "android",
        type: "mobile",
        model: "Modelo de Testee",
        isRented: true,
        serial: "123456",
        os: "ios",
        color: "black",
        rentedBy: "",
        inventory: ""
      }
    });
    console.log(">>>>> DEVICE ", device);
  };

  getItems = async () => {
    const devices = await InventoryApiService.getItems();
    console.log(">>>>> DEVICES ", devices);
  };

  deleteItem = async () => {
    const device = await InventoryApiService.deleteItem({
      id: "P44h28GSu2wSysk0CIUq",
      data: {
        version: "Super Teste",
        brand: "android",
        type: "mobile",
        model: "Modelo de Testee",
        isRented: true,
        serial: "431606277",
        os: "ios",
        color: "black"
      }
    });
    console.log(">>>>> DEVICE DELETED ", device);
  };

  // Pyz511wvzUGey6byz5Dk
  // TikBhe02hRlZw8UOyztD
  // Wbdtsxt4ywxSFqyj90JL
  // bdlD4slgu49P55ZP1wZ2
  // wgTLjmsBRQ0EeScBkoQ7
  // x96851pNDHfwbfoBhPAP

  updateItem = async () => {
    const device = await InventoryApiService.updateItem({
      id: "qPCd6eOFlIyu2vunqFvF",
      data: {
        version: "Super Teste",
        brand: "android",
        type: "mobile",
        model: "Modelo de Testee",
        isRented: true,
        serial: "431606277",
        os: "ios",
        color: "black"
      }
    });
    console.log(">>>>> UPDATED DEVICE ", device);
  };

  triggerPopOver = () => {
    // this.popupDialog.show();
    this.feedbackDialog.show();

    // this.refs[(`feedbackDialog`)].show()
    console.log("Under Construction");
  };

  getSpecificItem = async () => {
    var device = await InventoryApiService.getItemById(
      "x96851pNDHfwbfoBhPAP"
    );
    device.data.isRented = !device.data.isRented;
    const updatedDevice = await InventoryApiService.updateItem(device);
    console.log(">>> Device: ", updatedDevice);
  };

  _onDimissed = () => {
    console.log(">>>> onDimissed!");
  };

  _onShown = () => {
    console.log(">>>> onShow!");
  };

  toItemScreen = () => {
    this._setNewRoot(Screens.RentedItemScreen, NavigationStyle.RentedItemScreen)

    // Navigation.showModal({
    //   stack: {
    //     children: [
    //       {
    //         component: {
    //           name: Screens.RentedItemScreen,
    //           passProps: {
    //             selectedItemId: '6QAm11mygRhFqo4ZU4rz',
    //             itemTitle: 'Device De Teste',
    //             itemType: 'ios',
    //           },
    //           options: NavigationStyle.RentedItemScreen
    //         }
    //       }
    //     ]
    //   }
    // });
  }

  _setNewRoot = async (screenName, navigationStyle) => {
    AppRootComponent.name = screenName
    AppRootComponent.options = navigationStyle
    await LocalStorage.saveAppRootComponentName(screenName)
    Navigation.setStackRoot(this.props.componentId, {
      component: {
        name: screenName,
        options: navigationStyle,
        passProps: {
          selectedItemId: '6QAm11mygRhFqo4ZU4rz',
          itemTitle: 'Device De Teste',
          itemType: 'ios',
        },
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableRipple
                    onPress={() => console.log('Pressed')}
                    rippleColor="rgba(0, 0, 0, .32)"
                    style={styles.card}
                    useForeground={true}
                >
                    <View style={styles.cardContent} >
                        <View style={styles.imageContainer} >
                            <Image style={styles.image}
                                resizeMode='cover'
                                source={Images.galaxy}
                            />
                        </View>
                        <View style={styles.infoContainer} >
                            <Text style={styles.itemTitle} numberOfLines={1}>
                                Galaxy J7
                            </Text>
                            <View style={styles.descriptionContainer}>
                                <Icon name="android" size={18} color="#A4C639" />
                                <Text style={styles.descriptionText}> android </Text>
                            </View>
                            <Divider style={styles.divider} />
                            <Text style={styles.statusLabel}>
                                {'Disponível'.toUpperCase()}
                            </Text>
                        </View>
                    </View>
                </TouchableRipple> */}
        <Button
          mode="contained"
          onPress={() => this.addItem()}
          style={{ width: "50%", alignSelf: "center" }}
        >
          Add Item
        </Button>

        <Button
          mode="outlined"
          onPress={() => this.getItems()}
          style={{
            backgroundColor: "white",
            width: "50%",
            alignSelf: "center",
            marginTop: 16
          }}
        >
          Get Items
        </Button>

        <Button
          mode="text"
          onPress={() => this.updateItem()}
          style={{
            backgroundColor: "white",
            width: "50%",
            alignSelf: "center",
            marginTop: 16
          }}
        >
          Update Item
        </Button>

        <Button
          mode="text"
          onPress={() => this.deleteItem()}
          style={{
            backgroundColor: "white",
            width: "50%",
            alignSelf: "center",
            marginTop: 16
          }}
        >
          Delete Item
        </Button>
        <Button
          mode="text"
          onPress={() => this.triggerPopOver()}
          style={{
            backgroundColor: "white",
            width: "50%",
            alignSelf: "center",
            marginTop: 16
          }}
        >
          Trigger PopOver
        </Button>
        <Button
          mode="text"
          onPress={() => this.getSpecificItem()}
          style={{
            backgroundColor: "white",
            width: "50%",
            alignSelf: "center",
            marginTop: 16
          }}
        >
          Get specific Item
        </Button>
        <Button
          mode="text"
          onPress={() => this.unsubscribeCollection()}
          style={{
            backgroundColor: "white",
            width: "50%",
            alignSelf: "center",
            marginTop: 16
          }}
        >
          unsubscribe
        </Button>
        <Button
          mode="text"
          onPress={() => this.toItemScreen()}
          style={{
            backgroundColor: "white",
            width: "50%",
            alignSelf: "center",
            marginTop: 16
          }}
        >
          ITEM SCREEN
        </Button>
        <IconButton
          icon={({ size, color }) => (
            <Icon name="ios-close" size={size} color={color} />
          )}
          color={Colors.red500}
          size={48}
          onPress={() => console.log("Pressed")}
        />
        <FeedbackDialog
          mode={this.state.feedbackMode}
          description={"Descrição de exemplo"}
          onDismissed={() => this._onDimissed()}
          onShown={() => this._onShown()}
          ref={feedbackDialog => {
            this.feedbackDialog = feedbackDialog;
          }}
        />
      </View>
    );
  }
}

const scaleAnimation = new ScaleAnimation({
  toValue: 0, // optional
  useNativeDriver: true // optional
});

const styles = StyleSheet.create({
  icon: {
    textAlign: "center",
    marginBottom: 8
  },
  title: {
    fontSize: 28,
    alignSelf: "center",
    color: Colors.titleDarkFont,
    marginBottom: 6
  },
  descriptionTitle: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.descriptionLightGray
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "dimgray",
    justifyContent: "center"
  },
  card: {
    height: 144,
    backgroundColor: "white",
    borderRadius: 8,
    margin: 8,
    elevation: 8
  },
  cardContent: {
    flex: 1,
    padding: 16,
    flexDirection: "row"
  },
  imageContainer: {
    width: 100,
    backgroundColor: "#F5F5F5",
    borderRadius: 4
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
    height: null
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 8,
    borderRadius: 4
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: "400",
    color: "#404040"
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  descriptionText: {
    textAlignVertical: "bottom",
    fontSize: 18,
    fontWeight: "bold",
    color: "#A4C639"
  },
  divider: {
    height: 1,
    backgroundColor: "#D8D8D8",
    marginBottom: 8,
    marginTop: 4
  },
  statusLabel: {
    alignSelf: "baseline",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#3ED470",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2DA455",
    overflow: "hidden"
  }
});

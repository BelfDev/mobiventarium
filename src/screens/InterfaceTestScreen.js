import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableNativeFeedback } from 'react-native';
import { Text, TouchableRipple, Divider, Card, Title, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Images from 'assets';
import InventoryApiService from '../services/InventoryApiService'
import PopupDialog, { ScaleAnimation } from 'react-native-popup-dialog';
import Colors from '../utils/Colors'
import FeedbackDialog from '../components/FeedbackDialog'

export default class InterfaceTestScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {feedbackMode : 'failure'};
      }

    addDevice = async () => {
        console.log("Adding Device")
        const device = await InventoryApiService.addDevice(
            {
                data: {
                    os: "ios",
                    type: "tablet",
                    brand: "apple",
                    model: "iPad",
                    version: "iPad",
                    serial: "431606277",
                    color: "black",
                    isRented: true
                }
            }
        )
        console.log(">>>>> DEVICE ", device)
    }

    getDevices = async () => {
        const devices = await InventoryApiService.getDevices()
        console.log(">>>>> DEVICES ", devices)
    }

    deleteDevice = async () => {
        const device = await InventoryApiService.deleteDevice({
            id: 'Is1lgPGPp9kO1k1OALIL',
            data: {
                version: 'Super Teste',
                brand: 'android',
                type: 'mobile',
                model: 'Modelo de Testee',
                isRented: true,
                serial: '431606277',
                os: 'ios',
                color: 'black'
            }
        })
        console.log(">>>>> DEVICE DELETED ", device)
    }

    updateDevice = async () => {
        const device = await InventoryApiService.updateDevice({
            id: 'qPCd6eOFlIyu2vunqFvF',
            data: {
                version: 'Super Teste',
                brand: 'android',
                type: 'mobile',
                model: 'Modelo de Testee',
                isRented: true,
                serial: '431606277',
                os: 'ios',
                color: 'black'
            }
        })
        console.log(">>>>> UPDATED DEVICE ", device)
    }

    triggerPopOver = () => {
        // this.popupDialog.show();
        this.feedbackDialog.show()

        // this.refs[(`feedbackDialog`)].show()
        console.log("Under Construction")
    }

    _onDimissed = () => {
        console.log(">>>> onDimissed!")
    }

    _onShown= () => {
        console.log(">>>> onShow!")
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
                {/* <Button mode="contained" onPress={() => this.addDevice()} style={{ width: '50%', alignSelf: 'center' }}>
                    Add Device
                    </Button> */}

                <Button mode="outlined" onPress={() => this.getDevices()} style={{ backgroundColor: 'white', width: '50%', alignSelf: 'center', marginTop: 16 }}>
                    Get Devices
                    </Button>

                <Button mode="text" onPress={() => this.updateDevice()} style={{ backgroundColor: 'white', width: '50%', alignSelf: 'center', marginTop: 16 }}>
                    Update Device
                    </Button>

                <Button mode="text" onPress={() => this.deleteDevice()} style={{ backgroundColor: 'white', width: '50%', alignSelf: 'center', marginTop: 16 }}>
                    Delete Device
                    </Button>
                <Button mode="text" onPress={() => this.triggerPopOver()} style={{ backgroundColor: 'white', width: '50%', alignSelf: 'center', marginTop: 16 }}>
                    Trigger PopOver
                    </Button>
                <FeedbackDialog
                    mode={this.state.feedbackMode}
                    description={'Descrição de exemplo'}
                    onDismissed={() => this._onDimissed()}
                    onShown={() => this._onShown()}
                    ref={(feedbackDialog) => { this.feedbackDialog = feedbackDialog }}
                    >
                </FeedbackDialog>
            </View >
        )
    }
}

const scaleAnimation = new ScaleAnimation({
    toValue: 0, // optional
    useNativeDriver: true, // optional
})


const styles = StyleSheet.create({
    icon: {
        textAlign: 'center',
        marginBottom: 8
    },
    title: {
        fontSize: 28,
        alignSelf: 'center',
        color: Colors.titleDarkFont,
        marginBottom: 6,
    },
    descriptionTitle: {
        fontSize: 16,
        textAlign: 'center',
        color: Colors.descriptionLightGray
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'dimgray',
        justifyContent: 'center',
    },
    card: {
        height: 144,
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 8,
        elevation: 8,
    },
    cardContent: {
        flex: 1,
        padding: 16,
        flexDirection: 'row'
    },
    imageContainer: {
        width: 100,
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
    },
    image: {
        flex: 1,
        alignSelf: 'stretch',
        width: null,
        height: null,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 8,
        borderRadius: 4,
    },
    itemTitle: {
        fontSize: 22,
        fontWeight: '400',
        color: '#404040',
    },
    descriptionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    descriptionText: {
        textAlignVertical: 'bottom',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#A4C639',
    },
    divider: {
        height: 1,
        backgroundColor: '#D8D8D8',
        marginBottom: 8,
        marginTop: 4,
    },
    statusLabel: {
        alignSelf: 'baseline',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#3ED470',
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#2DA455',
        overflow: 'hidden',
    }
})
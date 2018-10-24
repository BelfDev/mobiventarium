import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import Colors from '../utils/Colors'

export default class QRMarker extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={styles.markerContainer}>
                <View style={styles.topOverlay} />
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.leftAndRightOverlay} />
                    <View style={styles.centerRectangle}>
                        <Icon
                            name="ios-qr-scanner"
                            size={SCREEN_WIDTH * 0.73}
                            color={Colors.markerPurple}
                        />
                    </View>
                    <View style={styles.leftAndRightOverlay} />
                </View>
                <View style={styles.bottomOverlay} />
            </View>
        );
    }
}

const SCREEN_WIDTH = Dimensions.get("window").width
const rectDimensions = SCREEN_WIDTH * 0.65
const rectBorderWidth = SCREEN_WIDTH * 0.005

const styles = StyleSheet.create({
    markerContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    centerRectangle: {
        height: rectDimensions,
        width: rectDimensions,
        borderWidth: rectBorderWidth,
        borderColor: Colors.scannerGrayBorder,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    topOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        backgroundColor: Colors.scannerOverlay,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomOverlay: {
        flex: 1,
        height: SCREEN_WIDTH,
        width: SCREEN_WIDTH,
        backgroundColor: Colors.scannerOverlay,
        paddingBottom: SCREEN_WIDTH * 0.25
    },
    leftAndRightOverlay: {
        height: SCREEN_WIDTH * 0.65,
        width: SCREEN_WIDTH,
        backgroundColor: Colors.scannerOverlay
    },
});

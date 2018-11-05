import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper'
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from '../utils/Colors'
import Strings from '../utils/Strings'

export default class ConnectionErrorContent extends Component {
    constructor(props) {
        super(props);
    }

    _renderContent(visible) {
        if (visible) {
            return <View style={styles.contentContainer}>
                <Icon
                    name={'error-outline'}
                    size={240}
                    color={Colors.gray}
                    style={styles.icon}
                />
                <Text style={styles.instructionText}>
                    {Strings.connectionErrorContent.instruction}
                </Text>
                <Button
                    mode="outlined"
                    style={styles.buttonContainer}
                    loading={this.props.reconnecting}
                    onPress={() => this.props.onRetryButtonPressed()}>
                    Tentar novamente
                </Button>
            </View>
        } else {
            return <View />
        }
    }

    render() {
        const {
            style,
            visible,
        } = this.props
        return (
            <View style={visible ? style : null}
            >
                {this._renderContent(visible)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    icon: {
        textAlign: "center",
    },
    instructionText: {
        marginHorizontal: 64,
        marginBottom: 16,
        fontSize: 22,
        color: Colors.gray,
        fontWeight: '400',
        textAlign: 'center'
    },
    buttonContainer: {
        alignSelf: 'center',
        marginBottom: 64,
    },
})
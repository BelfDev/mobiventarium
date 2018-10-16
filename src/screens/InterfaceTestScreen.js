import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableNativeFeedback } from 'react-native';
import { Text, TouchableRipple, Divider, Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Images from 'assets';

export default class InterfaceTestScreen extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableRipple
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
                </TouchableRipple>
            </View >
        )
    }
}
const styles = StyleSheet.create({
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
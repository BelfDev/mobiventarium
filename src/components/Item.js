import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, TouchableRipple, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Images from 'assets';
import PropTypes from 'prop-types';
import { isNil, toUpper } from 'ramda';

export default class Item extends Component {

    render() {
        const {
            elevation,
            itemTitle,
            descriptionText,
            statusLabelText,
            iconName,
            imagePath,
            iconColor,
            rippleColor,
            onPress,
        } = this.props

        const defaultProps = {
            elevation: 8,
            itemTitle: "Item Title",
            descriptionText: "description",
            statusLabelText: "label",
            iconName: "android",
            imagePath: Images.galaxy,
            iconColor: "#A4C639",
            rippleColor: "rgba(0, 0, 0, .32)",
        }

        return (
            <TouchableRipple
                onPress={() => onPress ? onPress() : null}
                rippleColor={isNil(rippleColor) ? defaultProps.rippleColor : rippleColor}
                style={{
                    elevation: isNil(elevation) ? defaultProps.elevation : elevation,
                    ...styles.card
                }}
                useForeground={true}
            >
                <View style={styles.cardContent} >
                    <View style={styles.imageContainer} >
                        <Image style={styles.image}
                            resizeMode='cover'
                            source={isNil(imagePath) ? defaultProps.imagePath : imagePath}
                        />
                    </View>
                    <View style={styles.infoContainer} >
                        <Text
                            style={styles.itemTitle}
                            numberOfLines={1}>
                            {isNil(itemTitle) ? defaultProps.itemTitle : itemTitle}
                        </Text>
                        <View style={styles.descriptionContainer}>
                            <Icon
                                name={isNil(iconName) ? defaultProps.iconName : iconName}
                                size={18}
                                color={isNil(iconColor) ? defaultProps.iconColor : iconColor} />
                            <Text
                                style={styles.descriptionText}>
                                {isNil(descriptionText) ? defaultProps.descriptionText : descriptionText}
                            </Text>
                        </View>
                        <Divider style={styles.divider} />
                        <Text style={styles.statusLabel}>
                            {isNil(statusLabelText) ? toUpper(defaultProps.statusLabelText) : toUpper(statusLabelText)}
                        </Text>
                    </View>
                </View>
            </TouchableRipple>
        )
    }
}

Item.propTypes = {
    color: PropTypes.string,
    loading: PropTypes.bool,
    iconName: PropTypes.string,
    iconColor: PropTypes.string,
    itemTitle: PropTypes.string,
    descriptionText: PropTypes.string,
    statusLabelText: PropTypes.string,
    imagePath: PropTypes.string,
    onPress: PropTypes.func,
    rippleColor: PropTypes.string,
};

const styles = StyleSheet.create({
    card: {
        height: 144,
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 8,
        overflow: 'hidden',
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
        marginLeft: 4,
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

import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import PopupDialog, { ScaleAnimation } from 'react-native-popup-dialog'
import Colors from '../utils/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from "prop-types";

export default class FeedbackDialog extends PureComponent {

    show() {
        this.popupDialog.show()
    }

    batata() {
        console.log("batata")
    }

    render() {
        const {
            mode,
            description,
            onDismissed,
            onShown
        } = this.props;
        return (
            <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog }}
                dialogAnimation={scaleAnimation}
                width={0.9}
                height={0.4}
                dialogStyle={styles.dialogContainer}
                onDismissed={() => (onDismissed ? onDismissed() : null)}
                onShown={() => (onShown ? onShown() : null)}
            >
                <View>
                    <Icon
                        name={mode === 'success' ? 'ios-checkmark-circle' : 'ios-close-circle'}
                        size={96} color={mode === 'success' ? Colors.vividGreen : Colors.vividRed}
                        style={styles.icon} />
                    <Text style={styles.title}>{mode === 'success' ? 'Sucesso!' : 'Erro...'}</Text>
                    <Text style={styles.descriptionTitle}
                        numberOfLines={3}>{description}</Text>
                </View>
            </PopupDialog>
        );
    }
}

FeedbackDialog.propTypes = {
    mode: PropTypes.oneOf(['success', 'failure']).isRequired,
    description: PropTypes.string.isRequired
};

const scaleAnimation = new ScaleAnimation({
    toValue: 0,
    useNativeDriver: true,
})

const styles = StyleSheet.create({
    dialogContainer: {
        flexDirection: 'row',
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8,
    },
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
        color: Colors.descriptionLightGray,
    },
});

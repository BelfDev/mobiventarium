import React, { PureComponent } from 'react'
import {StyleSheet} from 'react-native'
import Colors from '../utils/Colors'
import { Surface, Text } from 'react-native-paper'
import PropTypes from 'prop-types'
import { toUpper } from 'ramda'

export default class CalendarBox extends PureComponent {

    render() {
        const {
            headerText,
            contentText
        } = this.props;
        return (
            <Surface style={styles.calendar}>
                <Text style={styles.calendarHeaderText}>
                    {toUpper(headerText)}
                </Text>
                <Text style={styles.calendarContentText}>
                    {toUpper(contentText)}
                </Text>
            </Surface>
        );
    }
}

CalendarBox.propTypes = {
    headerText: PropTypes.string.isRequired,
    contentText: PropTypes.string.isRequired,
}


const styles = StyleSheet.create({
    calendar: {
        flex: 0.5,
        borderRadius: 8,
        elevation: 4,
    },
    calendarHeaderText: {
        height: 22,
        backgroundColor: Colors.calendarRed,
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        color: Colors.lightGrayFont,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
    calendarContentText: {
        fontSize: 22,
        marginTop: 14,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 24,
        color: Colors.titleDarkFont,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
    },
});

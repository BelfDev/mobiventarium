import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Surface, Text } from 'react-native-paper'
import PropTypes from "prop-types";

export default class CalendarBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
        calendarText
      } = this.props;
    return (
        <Surface style={styles.calendar}>
        <Text style={styles.calendarHeaderText}>
          {calendarText.toUpperCase()}
        </Text>
        <Text style={styles.calendarContentText}>
          10/09
        </Text>
      </Surface>
    );
  }
}

CalendarBox.propTypes = {
    
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
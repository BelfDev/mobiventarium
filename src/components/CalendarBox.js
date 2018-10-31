import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Surface, Text } from 'react-native-paper'

export default class CalendarBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <Surface style={styles.calendar}>
        <Text style={styles.calendarHeaderText}>
          {'Retirada'.toUpperCase()}
        </Text>
        <Text style={styles.calendarContentText}>
          10/09
        </Text>
      </Surface>
    );
  }
}

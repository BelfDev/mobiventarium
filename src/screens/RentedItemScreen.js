import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Dimensions, Platform } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper'
import Images from "assets";
import Colors from '../utils/Colors'

export default class RentedItemScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <Image style={styles.headerImage}
          resizeMode='cover'
          source={Platform.OS === 'ios' ? Images.iosBackground : Images.androidBackground }
        />
        <Surface style={styles.itemContainer}>
        <Image
                style={styles.itemImage}
                resizeMode="cover"
                source={Images.galaxy}
              />
        </Surface>
        <Text style={styles.itemTitle}>
          Galaxy J7
        </Text>
        <View style={styles.calendarContainer}>
          <Surface style={styles.calendar}>
            <Text style={styles.calendarHeaderText}>
              {'Retirada'.toUpperCase()}
            </Text>
            <Text style={styles.calendarContentText}>
              10/09
            </Text>
          </Surface>
          <View style={styles.calendarSpacing} />
          <Surface style={styles.calendar}>
            <Text style={styles.calendarHeaderText}>
              {'Devolução'.toUpperCase()}
            </Text>
            <Text style={styles.calendarContentText}>
              17/09
            </Text>
          </Surface>
        </View>
        <Button
          mode="contained"
          color={Colors.vividPurple}
          dark={true}
          style={styles.returnButton}
          onPress={() => console.log('Pressed')}>
          {'Retornar'.toUpperCase()}
        </Button>
        <Text
          style={styles.deadlineWarningText}
        >
          {'Restam 7 dias'.toUpperCase()}
        </Text>
      </SafeAreaView>
    );
  }
}

const SCREEN_WIDTH = Dimensions.get("window").width
const SCREEN_HEIGHT = Dimensions.get("window").height
const HEADER_IMAGE_HEIGHT = SCREEN_HEIGHT * 0.30
const ITEM_CONTAINER_DIAMETER = SCREEN_WIDTH * 0.5
const ITEM_CONTAINER_TOP_MARGIN = HEADER_IMAGE_HEIGHT - (SCREEN_WIDTH * 0.25)

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundGray
  },
  headerImage: {
    alignSelf: 'stretch',
    width: SCREEN_WIDTH,
    height: HEADER_IMAGE_HEIGHT,
  },
  itemContainer: {
    elevation: 4,
    position: 'absolute',
    marginTop: ITEM_CONTAINER_TOP_MARGIN,
    height: ITEM_CONTAINER_DIAMETER,
    width: ITEM_CONTAINER_DIAMETER,
    borderRadius: ITEM_CONTAINER_DIAMETER,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  itemImage: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
    height: null
  },
  itemTitle: {
    marginTop: HEADER_IMAGE_HEIGHT * 0.55,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: "500",
    color: Colors.titleDarkFont
  },
  calendarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 64,
    paddingVertical: 16,
    height: 120,
    width: SCREEN_WIDTH,
    marginTop: 16,
  },
  calendarSpacing: {
    flex: 0.2
  },
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
  returnButton: {
    marginTop: 32,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 4,
  },
  deadlineWarningText: {
    marginTop: 16,
    marginBottom: 32,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '200',
    color: Colors.warningGrayFont
  }
})

import React, { Component } from 'react';
import { View, SafeAreaView, StyleSheet, Image, Dimensions } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper'
import CalendarBox from '../components/CalendarBox'
import Images from "assets";
import Colors from '../utils/Colors'
import PropTypes from "prop-types"

export default class RentedItemScreen extends Component {

  state = {

  }

  render() {
    const {
      // selectedItemId,
      itemTitle,
      itemType,
      itemImagePath,
      retrievalText,
      returnText
    } = this.props;
    return (
      <SafeAreaView style={styles.backgroundContainer}>
        <Image style={styles.headerImage}
          resizeMode='cover'
          source={itemType === 'ios' ? Images.iosBackground : Images.androidBackground}
        />
        <Surface style={styles.itemContainer}>
          <Image
            style={styles.itemImage}
            resizeMode="cover"
            source={itemImagePath}
          />
        </Surface>
        <Text style={styles.itemTitle}>
          {itemTitle}
        </Text>
        <View style={styles.calendarContainer}>
          <CalendarBox
            headerText={'Retirada'}
            contentText={retrievalText}
          />
          <View style={styles.calendarSpacing} />
          <CalendarBox
            headerText={'Devolução'}
            contentText={returnText}
          />
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

RentedItemScreen.propTypes = {
  // selectedItemId: selectedItemId,
  itemTitle: PropTypes.string.isRequired,
  itemType: PropTypes.oneOf(['ios', 'android']).isRequired,
  itemImagePath: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  retrievalText: PropTypes.string.isRequired,
  returnText: PropTypes.string.isRequired,
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

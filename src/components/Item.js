import React, { PureComponent } from "react";
import { StyleSheet, View, Image, Platform } from "react-native";
import { Text, TouchableRipple, Divider, Surface } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Images from "assets";
import PropTypes from "prop-types";
import { toUpper } from "ramda";
import Colors from "../utils/Colors";

export default class Item extends PureComponent {
  render() {
    const {
      elevation,
      itemTitle,
      descriptionText,
      descriptionTextColor,
      statusLabelText,
      statusLabelColor,
      statusLabelBorderColor,
      iconName,
      imagePath,
      iconColor,
      rippleColor,
      underlayColor,
      onPress
    } = this.props;

    return (
      <Surface style={[styles.card,
      {
        elevation,
        overflow: Platform.OS === 'ios' ? 'visible' : 'hidden'
      }]}>
        <TouchableRipple
          borderless={true}
          onPress={() => (onPress ? onPress() : null)}
          rippleColor={rippleColor}
          underlayColor={underlayColor}
          style={styles.touchableContainer}
          useForeground={true}
        >
          <View pointerEvents="box-only" style={styles.cardContent}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                resizeMode="cover"
                source={imagePath}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {itemTitle}
              </Text>
              <View style={styles.descriptionContainer}>
                <Icon name={iconName} size={18} color={iconColor} />
                <Text
                  style={[
                    styles.descriptionText,
                    { color: descriptionTextColor }
                  ]}
                >
                  {descriptionText}
                </Text>
              </View>
              <Divider style={styles.divider} />
              <Text
                style={[
                  styles.statusLabel,
                  {
                    backgroundColor: statusLabelColor,
                    borderColor: statusLabelBorderColor
                  }
                ]}
              >
                {toUpper(statusLabelText)}
              </Text>
            </View>
          </View>
        </TouchableRipple>
      </Surface>
    );
  }
}

Item.defaultProps = {
  elevation: 3,
  itemTitle: "Item Title",
  descriptionText: "description",
  descriptionTextColor: "black",
  statusLabelText: "label",
  statusLabelColor: Colors.vividGreen,
  statusLabelBorderColor: Colors.green,
  iconName: "android",
  imagePath: Images.galaxy,
  iconColor: Colors.androidGreen,
  rippleColor: Colors.rippleGray,
  underlayColor: Colors.underlayGray
};

Item.propTypes = {
  color: PropTypes.string,
  loading: PropTypes.bool,
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  itemTitle: PropTypes.string,
  descriptionText: PropTypes.string,
  descriptionTextColor: PropTypes.string,
  statusLabelText: PropTypes.string,
  statusLabelColor: PropTypes.string,
  statusLabelBorderColor: PropTypes.string,
  imagePath: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  rippleColor: PropTypes.string,
  underlayColor: PropTypes.string
};

const styles = StyleSheet.create({
  card: {
    height: 144,
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 6
  },
  touchableContainer: {
    borderRadius: 8,
    height: 144
  },
  cardContent: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    flexDirection: "row",
  },
  imageContainer: {
    width: 100,
    backgroundColor: "#F5F5F5",
    borderRadius: 4
  },
  image: {
    flex: 1,
    alignSelf: "stretch",
    width: null,
    height: null
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 8,
    borderRadius: 4
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: "400",
    color: "#404040"
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  descriptionText: {
    marginLeft: 4,
    textAlignVertical: "bottom",
    fontSize: 18,
    fontWeight: "bold"
  },
  divider: {
    height: 1,
    backgroundColor: "#D8D8D8",
    marginBottom: 8,
    marginTop: 4
  },
  statusLabel: {
    alignSelf: "baseline",
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden"
  }
});

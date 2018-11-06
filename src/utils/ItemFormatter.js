import Colors from "./Colors";
import Strings from './Strings'

export default class ItemFormatter {
  static getDescriptionTextFormat(os) {
    return os === "ios" ? "iOS" : os;
  }

  static getPlatformTextColor(os) {
    return os === "ios" ? Colors.iosGray : Colors.androidGreen;
  }

  static getStatusLabelText(isRented, isRentedBySessionUser) {
    if (isRented && isRentedBySessionUser) {
      return Strings.itemFormatter.rentedBySessionUserText
    } else {
      return isRented ? Strings.itemFormatter.unavailableLabelText : Strings.itemFormatter.availableLabelText;
    }
  }
  static getStatusLabelColor(isRented, isRentedBySessionUser) {
    if (isRented && isRentedBySessionUser) {
      return Colors.vividPurple
    } else {
      return isRented ? Colors.vividRed : Colors.vividGreen;
    }
  }

  static getStatusLabelBorderColor(isRented, isRentedBySessionUser) {
    if (isRented && isRentedBySessionUser) {
      return Colors.purple
    } else {
      return isRented ? Colors.red : Colors.green;
    }
  }

  static getIconName(os) {
    return os === "ios" ? "apple" : "android";
  }
}

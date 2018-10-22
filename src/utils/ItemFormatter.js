import Colors from "./Colors";

export default class ItemFormatter {
  static getDescriptionTextFormat(os) {
    return os === "ios" ? "iOS" : os;
  }

  static getPlatformTextColor(os) {
    return os === "ios" ? Colors.iosGray : Colors.androidGreen;
  }

  static getStatusLabelText(isRented) {
    return isRented ? "indisponível" : "disponível";
  }

  static getStatusLabelColor(isRented) {
    return isRented ? Colors.vividRed : Colors.vividGreen;
  }

  static getStatusLabelBorderColor(isRented) {
    return isRented ? Colors.red : Colors.green;
  }

  static getIconName(os) {
    return os === "ios" ? "apple" : "android";
  }
}

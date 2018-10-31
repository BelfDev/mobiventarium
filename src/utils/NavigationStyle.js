import Colors from "./Colors";

const topBarDefaultStyle = {
  visible: true,
  elevation: 4,
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "500",
    alignment: "center"
  },
  background: {
    color: Colors.topBarPurple,
    translucent: true,
    blur: false
  },
  largeTitle: {
    visible: true,
    fontSize: 30,
    color: "white"
  }
};

const NavigationStyle = {
  InventoryScreen: {
    topBar: {
      visible: topBarDefaultStyle.visible,
      elevation: topBarDefaultStyle.elevation,
      title: Object.assign(topBarDefaultStyle.title, {
        text: "Inventory Manager"
      }),
      background: topBarDefaultStyle.background,
      largeTitle: topBarDefaultStyle.largeTitle
    }
  },
  ScannerScreen: {
    layout: {
      orientation: ["portrait"]
    },
    topBar: {
      visible: false,
      drawBehind: true,
      elevation: topBarDefaultStyle.elevation,
      title: Object.assign(topBarDefaultStyle.title, {}),
      background: topBarDefaultStyle.background,
      largeTitle: topBarDefaultStyle.largeTitle
    }
  },
  LoginScreen: {
    topBar: {
      visible: topBarDefaultStyle.visible,
      elevation: topBarDefaultStyle.elevation,
      transparent:true,
      background: topBarDefaultStyle.background,
    }
  },
  SignUpScreen: {
    topBar: {
      visible: topBarDefaultStyle.visible,
      elevation: topBarDefaultStyle.elevation,
      transparent:true,
      background: topBarDefaultStyle.background,
    }
  },

};

export default NavigationStyle;

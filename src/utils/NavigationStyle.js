import Colors from "./Colors";

const topBarDefaultStyle = {
  visible: true,
  elevation: 4,
  backButton: {
    color: 'black'
  },
  buttonColor: 'white',
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
      backButton: topBarDefaultStyle.backButton,
      buttonColor: topBarDefaultStyle.buttonColor,
      title: Object.assign({
        text: 'Inventory Manager'
      }, topBarDefaultStyle.title),
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
      backButton: topBarDefaultStyle.backButton,
      buttonColor: topBarDefaultStyle.buttonColor,
      elevation: topBarDefaultStyle.elevation,
      title: Object.assign({}, topBarDefaultStyle.title),
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

  RentedItemScreen: {
    topBar: {
      visible: topBarDefaultStyle.visible,
      animate: true,
      drawBehind: true,
      elevation: 0,
      backButton: {
        color: 'black'
      },
      buttonColor: 'black',
      title: {
        text: ''
      },
      background: {
        color: 'transparent',
        translucent: true,
      },
      largeTitle: topBarDefaultStyle.largeTitle
    }
  },
};

export default NavigationStyle;
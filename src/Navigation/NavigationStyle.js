import Colors from "../utils/Colors";
import { drop } from "ramda";
import { APP_BUNDLE_ID } from './AppConfig'

const statusBarDefaultStyle = {
  visible: true,
  backgroundColor: Colors.topBarPurple,
  style: "light"
};

const transitionDefaultStyle = {
  setRoot: {
    alpha: {
      from: 0,
      to: 1,
      duration: 250,
      interpolation: "accelerate"
    }
  },
  push: {
    enabled: "true",
    waitForRender: false,
    topBar: {
      alpha: {
        from: 0,
        to: 1
      }
    },
    content: {
      x: {
        from: 1000,
        to: 0,
        duration: 250,
        interpolation: "accelerate"
      },
      alpha: {
        from: 0,
        to: 1,
        duration: 250,
        interpolation: "accelerate"
      }
    }
  },
  pop: {
    enabled: "true",
    waitForRender: false,
    content: {
      x: {
        from: 0,
        to: 1000,
        duration: 250,
        interpolation: "decelerate"
      },
      alpha: {
        from: 1,
        to: 0,
        duration: 250,
        interpolation: "decelerate"
      }
    }
  }
};

const topBarDefaultStyle = {
  visible: true,
  elevation: 4,
  backButton: {
    color: "black"
  },
  buttonColor: "white",
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
  Shared: {
    statusBar: statusBarDefaultStyle,
    animations: transitionDefaultStyle
  },
  InventoryScreen: {
    topBar: {
      visible: topBarDefaultStyle.visible,
      elevation: topBarDefaultStyle.elevation,
      backButton: topBarDefaultStyle.backButton,
      buttonColor: topBarDefaultStyle.buttonColor,
      title: Object.assign(
        {
          text: "Inventory Manager"
        },
        topBarDefaultStyle.title
      ),
      background: topBarDefaultStyle.background,
      largeTitle: topBarDefaultStyle.largeTitle,
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
      transparent: true,
      background: topBarDefaultStyle.background
    }
  },
  SignUpScreen: {
    topBar: {
      visible: topBarDefaultStyle.visible,
      elevation: topBarDefaultStyle.elevation,
      transparent: true,
      background: topBarDefaultStyle.background
    }
  },
  RentedItemScreen: {
    topBar: {
      visible: false,
      animate: true,
      drawBehind: true,
      elevation: 0,
      backButton: {
        color: "black"
      },
      buttonColor: "black",
      title: {
        text: ""
      },
      background: {
        color: "transparent",
        translucent: true
      },
      largeTitle: topBarDefaultStyle.largeTitle
    }
  },
  OnboardingScreen: {
    topBar: {
      visible: true,
      drawBehind: true,
      transparent: true,
      elevation: 0,
      background: {
        color: "transparent"
      }
    }
  },
};

export function getNavigationStyle(componentName) {
  let bundleIdSize = APP_BUNDLE_ID.length + 1;
  let shortComponentName = drop(bundleIdSize, componentName);
  return NavigationStyle[shortComponentName];
}

export default NavigationStyle;

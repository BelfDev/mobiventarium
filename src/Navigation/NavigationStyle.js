import Colors from "../utils/Colors";
import Images from "assets";
import { drop } from "ramda";
import { APP_BUNDLE_ID } from './AppConfig'
import Strings from '../utils/Strings'

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
    color: "white"
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
          text: "Rentify"
        },
        topBarDefaultStyle.title
      ),
      rightButtons: [ {
        id: 'signOutButton',
        text: 'Logout',
        icon: Images.signOutIcon,
        color: Colors.smoothWhite,
      }],
      background: topBarDefaultStyle.background,
      largeTitle: topBarDefaultStyle.largeTitle,
    }
  },
  ScannerScreen: {
    layout: {
      orientation: ["portrait"]
    },
    topBar: {
      visible: topBarDefaultStyle.visible,
      animate: false,
      drawBehind: true,
      backButton: topBarDefaultStyle.backButton,
      buttonColor: topBarDefaultStyle.buttonColor,
      elevation: 0,
      transparent: true,
      background: {
        color: "transparent",
        translucent: true
      },
      title: Object.assign(
        {
          text: Strings.scanner.screenTitle
        },
        topBarDefaultStyle.title
      ),
      leftButtons: [
        {
          id: 'closeButton',
          icon: Images.closeIcon,
          color: 'white',
          text: 'Close',
          enabled: true,
        }
      ],
    }
  },
  LoginScreen: {
    layout: {
      orientation: ["portrait"]
    },
    topBar: {
      visible: topBarDefaultStyle.visible,
      animate: false,
      drawBehind: true,
      backButton: topBarDefaultStyle.backButton,
      buttonColor: topBarDefaultStyle.buttonColor,
      elevation: 0,
      transparent: true,
      background: {
        color: "transparent",
        translucent: true
      },
    }
  },
  SignUpScreen: {
    layout: {
      orientation: ["portrait"]
    },
    topBar: {
      visible: topBarDefaultStyle.visible,
      animate: false,
      drawBehind: true,
      backButton: topBarDefaultStyle.backButton,
      buttonColor: topBarDefaultStyle.buttonColor,
      elevation: 0,
      transparent: true,
      background: {
        color: "transparent",
        translucent: true
      },
    }
  },
  RentedItemScreen: {
    layout: {
      orientation: ["portrait"]
    },
    topBar: {
      visible: topBarDefaultStyle.visible,
      animate: false,
      drawBehind: true,
      backButton: topBarDefaultStyle.backButton,
      buttonColor: topBarDefaultStyle.buttonColor,
      elevation: 0,
      transparent: true,
      background: {
        color: "transparent",
        translucent: true
      },
      leftButtons: [
        {
          id: 'closeButton',
          icon: Images.closeIcon,
          color: 'white',
          text: 'Close',
          enabled: true,
        }
      ],
    }
  },
  OnboardingScreen: {
    layout: {
      orientation: ["portrait"]
    },
    topBar: {
      visible: false,
      drawBehind: true,
      animate: false,
    },
    animations: {
      setStackRoot: {
        enable: false
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

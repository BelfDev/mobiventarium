import {Navigation} from 'react-native-navigation';

export function Screens() {
Navigation.registerComponent('StartScreen', () => require('./StartScreen').default);
Navigation.registerComponent('WelcomeScreen', () => require('./WelcomeScreen').default);  
Navigation.registerComponent('LoginScreen', () => require('./LoginScreen').default);
Navigation.registerComponent('SignUpScreen', () => require('./SignUpScreen').default);

}
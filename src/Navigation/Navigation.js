import { Navigation } from 'react-native-navigation'

export const goToAuth = () => Navigation.setRoot({

root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'WelcomeScreen',
            options:{
                topBar:{
                    visible: false
                }
            }
            
          }
        }
    ],
    }
  }

});

export const goHome = () => Navigation.setRoot({
  root: {
    stack: {
      id: 'App',
      children: [
        {
          component: {
            name: 'WelcomeScreen',
            options:{
                navBarHidden: true
            },
            navigatorStyle: {
                navBarHidden: true
            }
          }
        }
    ],
    }
  }
})



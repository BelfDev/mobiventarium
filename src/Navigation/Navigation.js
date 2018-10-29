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
                  visible: true,
                  drawBehind: true,
                  transparent: true,
                  elevation: 0,
                  background: {
                    color: 'transparent',
                  },
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
              topBar:{
                visible: true,
                drawBehind: true,
                transparent: true,
                elevation: 0,
                background: {
                  color: 'transparent',
                },
              }
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



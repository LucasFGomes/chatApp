import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/LoginScreen';
import HomeScreen from './src/HomeScreen';
import AuthLoadingScreen from './src/AuthLoadingScreen';
import ChatScreen from './src/ChatScreen';
import ProfileScreen from './src/ProfileScreen';

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Chat: ChatScreen,
  Profile: ProfileScreen,
});

const AuthStack = createStackNavigator({ Login: LoginScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));
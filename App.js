import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { MaterialIcons, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'; 

// screen
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import JoinTeamScreen from './src/screens/JoinTeamScreen';
import HomeScreen from './src/screens/HomeScreen';
import CardScreen from './src/screens/CardScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// context provider
import { UserProvider } from './src/context/UserContext';

// utilities
import { setNavigator } from './src/navigationRef';
import styles, { StyleSheet } from './src/styles';

// navigation
const navigator = createSwitchNavigator({
  // resolveAuth: ResolveAuthScreen,
  // loginFlow: createStackNavigator({
  //   Signin: SigninScreen,
  //   Signup: SignupScreen
  // }),
  // joinTeam: JoinTeamScreen,
  mainFlow: createBottomTabNavigator({
    home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: () => { return null}, 
        tabBarIcon: ({ focused }) => {
          return <MaterialIcons name="group" size={30} color={focused? '#599DFF' : "black"} />
        }
      })
    },
    card: {
      screen: CardScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: () => { return null}, 
        tabBarIcon: ({ focused }) => {
          return <MaterialCommunityIcons name="cards" size={30} color={focused? '#599DFF': "black"} />
        }
      })
    },
    settings: {
      screen: SettingsScreen,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: () => { return null}, 
        tabBarIcon: ({ focused }) => {
          return <Ionicons name="settings" size={30} color={focused? '#599DFF': "black"} />
        }
      })
    },
  })
})

const App = createAppContainer(navigator);

export default () => {
  return <UserProvider>
    <App 
      ref={navigator => {
        setNavigator(navigator);
      }}
    />
  </UserProvider>
};
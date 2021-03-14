import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; 

// screen
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import JoinTeamScreen from './src/screens/JoinTeamScreen';
import HomeScreen from './src/screens/HomeScreen';
import CardScreen from './src/screens/CardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditPropertyScreen from './src/screens/EditPropertyScreen';

// context provider
import { UserProvider } from './src/context/UserContext';

// utilities
import { setNavigator } from './src/navigationRef';
import styles, { StyleSheet } from './src/styles';

// navigation
const navigator = createSwitchNavigator({
  resolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }, {
    headerMode: 'none',
    navigationOptions: {
      gestureDirection: 'horizontal'
    }
  }),
  joinTeam: JoinTeamScreen,
  mainFlow: createBottomTabNavigator({
    home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Home',
        tabBarIcon: ({ focused }) => {
          return <MaterialCommunityIcons name="home-variant" size={30} color={focused? '#599DFF' : "black"} />
        }
      })
    },
    card: {
      screen: createStackNavigator({
        Card: CardScreen,
        EditProperty: EditPropertyScreen
      }, {
        headerMode: null,
      }),
      navigationOptions: ({ navigation }) => ({
        title: 'Prepare',
        tabBarIcon: ({ focused }) => {
          return <MaterialCommunityIcons name="cards" size={30} color={focused? '#599DFF': "black"} />
        }
      })
    },
    profile: {
      screen: createStackNavigator({
        Profile: ProfileScreen,
        EditProperty: EditPropertyScreen
      }, {
        headerMode: 'none',
      }),
      navigationOptions: ({ navigation }) => ({
        header: null,
        title: 'Profile',
        tabBarIcon: ({ focused }) => {
          return <FontAwesome name="user" size={30} color={focused? '#599DFF': "black"} />;
        }
      })
    },
  })
}, {
  initialRouteName: 'resolveAuth'
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
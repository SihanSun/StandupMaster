import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; 

// screen
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SignInScreenFeature from './src/screens/SigninScreenFeature';
import SignUpScreenFeature from './src/screens/SignupScreenFeature';
import SignInScreen from './src/screens/SigninScreen';
import SignUpScreen from './src/screens/SignupScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import JoinTeamScreen from './src/screens/JoinTeamScreen';
import HomeScreen from './src/screens/HomeScreen';
import CardScreen from './src/screens/CardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditPropertyScreen from './src/screens/EditPropertyScreen';
import TeamProfileScreen from './src/screens/TeamProfileScreen';
import PendingMemberScreen from './src/screens/PendingMemberScreen';

// context provider
import { Provider as SharedContextProvider } from './src/context/SharedContext';

// utilities
import { setNavigator } from './src/navigationRef';
import styles, { StyleSheet } from './src/styles';

const signInfeature = false;
// navigation
const navigator = createSwitchNavigator({
  resolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signin: signInfeature ? { screen: SignInScreenFeature } : { screen: SignInScreen }, // if feature if true; call signinscreenFeature name
    Signup: signInfeature ? { screen: SignUpScreenFeature } : { screen: SignUpScreen }, // prod env, dev env, switching env, 
    confirm: { screen: ConfirmationScreen }
  }, {
    headerMode: 'none',
    navigationOptions: {
      gestureDirection: 'horizontal'
    }
  }),
  joinTeam: JoinTeamScreen,
  mainFlow: createBottomTabNavigator({
    home: {
      screen: createStackNavigator({
        Home: HomeScreen,
        TeamProfile: createStackNavigator({
          EditTeam: TeamProfileScreen,
          pendingMember: PendingMemberScreen,
        },{
          headerMode: null
        }),
        EditTeamProperty: EditPropertyScreen
      }, {
        headerMode: null
      }),
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
  initialRouteName: signInfeature ? 'loginFlow': 'resolveAuth'
})

const App = createAppContainer(navigator);

export default () => {
  return (
    <SharedContextProvider>
      <App 
        ref={navigator => {
          setNavigator(navigator);
         }}
      />
    </SharedContextProvider>
  )
};
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { MaterialIcons, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'; 

// screen
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SplashScreen from './src/screens/SplashScreen';
import SignInScreen from './src/screens/SigninScreen';
import SignUpScreen from './src/screens/SignupScreen';
import ConfirmationScreen from './src/screens/ConfirmationScreen';
import CreateTeamScreen from './src/screens/CreateTeamScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'
import JoinTeamScreen from './src/screens/JoinTeamScreen';
import HomeScreen from './src/screens/HomeScreen';
import CardScreen from './src/screens/CardScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditPropertyScreen from './src/screens/EditPropertyScreen';
import ViewPropertyScreen from './src/screens/ViewPropertyScreen';
import TeamProfileScreen from './src/screens/TeamProfileScreen';
import JoinMeetingScreen from './src/screens/JoinMeetingScreen';
import PendingMemberScreen from './src/screens/PendingMemberScreen';

// context provider
import { Provider as SharedContextProvider } from './src/context/SharedContext';

// utilities
import { setNavigator } from './src/navigationRef';
import styles, { StyleSheet } from './src/styles';

// navigation
const navigator = createSwitchNavigator({
  resolveAuth: ResolveAuthScreen,
  splash: SplashScreen,
  loginFlow: createStackNavigator({
    signin: { screen: SignInScreen },
    signup: { screen: SignUpScreen },
    confirm: { screen: ConfirmationScreen },
    forgotPassword: { screen: ForgotPasswordScreen }
  }, {
    headerMode: 'none',
    navigationOptions: {
      gestureDirection: 'horizontal'
    }
  }),
  joinTeam: JoinTeamScreen,  
  createTeam: CreateTeamScreen,
  Meeting: JoinMeetingScreen,
  mainFlow: createBottomTabNavigator({
    home: {
      screen: createStackNavigator({
        Home: HomeScreen,
        TeamProfile: TeamProfileScreen,
        pendingMember: PendingMemberScreen,
        EditTeamProperty: EditPropertyScreen,
        ViewTeamProperty: ViewPropertyScreen,
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
  initialRouteName: 'splash'
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
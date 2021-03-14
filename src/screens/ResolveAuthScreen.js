import React, { useContext, useEffect, useState , Component } from 'react';
import { Text, StyleSheet, SafeAreaView, Button} from 'react-native';

import Amplify, { Auth, Hub } from 'aws-amplify';
import { withAuthenticator, withOAuth } from 'aws-amplify-react-native'
import * as WebBrowser from 'expo-web-browser';


Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-east-2:8e3847e1-d2f6-4f68-a537-c79fed9edc0b',

        // REQUIRED - Amazon Cognito Region
        region: 'us-east-2',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'us-east-2',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-2_TehdqzKMZ',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        // userPoolWebClientId: '3qujane35tmocgn641cf0q11is',
        userPoolWebClientId: '53jj7124qq3s5q898k10q8i7mu',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: false,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        // cookieStorage: {
        // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
        //     domain: '.auth.us-east-2.amazoncognito.com',
        // // OPTIONAL - Cookie path
        //     path: '/',
        // // OPTIONAL - Cookie expiration in days
        //     expires: 365,
        // // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
        //     sameSite: "strict",
        // // OPTIONAL - Cookie secure flag
        // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
        //     secure: true
        // },

        // OPTIONAL - customized storage object
        // storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_SRP_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        // clientMetadata: { myCustomKey: 'myCustomValue' },

         // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: 'standup-master.auth.us-east-2.amazoncognito.com',
            scope: ['email', 'openid', 'aws.cognito.signin.user.admin', 'profile'],
            redirectSignIn: 'exp://sf-ker.chaibot.standupmaster.exp.direct',
            redirectSignOut: 'exp://sf-ker.chaibot.standupmaster.exp.direct',
            // redirectSignIn: 'StandupMaster://',
            // redirectSignOut: 'StandupMaster://',
            responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
            // urlOpener,
        }
    }
});

// async function urlOpener(url, redirectUrl) {
//   const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
//       url,
//       redirectUrl
//   );

//   if (type === 'success' && Platform.OS === 'ios') {
//       WebBrowser.dismissBrowser();
//       return Linking.openURL(newUrl);
//   }
// }


// const config = {};
// config.hideAllDefaults = true;
// config.signUpFields = [
//   {
// 		label: 'Email',
// 		key: 'email',
// 		required: true,
// 		placeholder: 'Email',
// 		type: 'email',
// 		displayOrder: 1,
// 	},
// 	{
// 		label: 'Password',
// 		key: 'password',
// 		required: true,
// 		placeholder: 'Password',
// 		type: 'password',
// 		displayOrder: 2,
// 	},
// 	{
// 		label: 'Username',
// 		key: 'preferred_username',
// 		required: true,
// 		placeholder: 'Username',
// 		displayOrder: 3,
// 	},
// ];

class ResolveAuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null, 
    };
  }
  
  componentDidMount() {
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getAllKeys();
    console.log(userToken);
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  }

  render() {
  }
}



const styles = StyleSheet.create({});

const doAuth = (props) => {
  const {
    oAuthUser,
    oAuthError,
    hostedUISignIn,
    signOut,
  } = props;

  return (
  <SafeAreaView>
    <Text>User: {oAuthUser ? JSON.stringify(oAuthUser.attributes) : 'None'}</Text>
    {oAuthUser ? (
        <Button title="Sign Out" onPress={() => signOut()} />
    ) : (
        <Button title="Federated Sign In" onPress={() => hostedUISignIn()} />
    )}
    </SafeAreaView>);
}

// export default withAuthenticator(ResolveAuthScreen, false, [], null, null, config);
export default withOAuth(doAuth);
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import { Auth } from 'aws-amplify';
import {SignButton, SignTextInput, styles} from '../components/SignButtons'

export default function SignInScreenFeature({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function signIn() {
        try {
            await Auth.signIn(username, password);
            console.log(' Success');
            navigation.navigate('home');
        } // show alert // code confirmation should say email 
        catch (error) {
            Alert.alert(error.message)
            // console.log(' Error signing in...', error); 
            // get back shared user object
            // setcognitouser// sharedcontext
                // call setcognitouser woth Object
                // navigate to homepage
        }
    }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.ccontainer}>
        <Text style={styles.title}>Sign In</Text>
        <SignTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="email"
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <SignTextInput
          value={password}
          onChangeText={text => setPassword(text)}
          leftIcon="lock"
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <SignButton title="Login" onPress={signIn} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('signup')}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
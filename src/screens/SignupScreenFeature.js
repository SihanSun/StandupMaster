// feature file
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import { Auth } from 'aws-amplify';
import {SignButton, SignTextInput, styles} from '../components/SignButtons'

export default function SignUpScreenFeature({ navigation }) {
    const [username, setEmail] = useState(''); // email
    const [preferred_username, setPrefUsername] = useState(''); // username
    const [password, setPassword] = useState('');

    async function signUp() {
        try {
            await Auth.signUp({ username, password, attributes: { preferred_username } });
            console.log(' Sign-up Confirmed');
            navigation.navigate('confirm');
        } 
        catch (error) {
            if (error.message.toUpperCase().includes("PASSWORD")) {
                Alert.alert("Password conditions not met", /[^:]*$/.exec(error.message)[0])
            }
            else {
                Alert.alert(error.message)
            }
            // console.log(' Error signing up...', error);
        }
    }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.ccontainer}>
        <Text style={styles.title}>Create an account</Text>
        <SignTextInput
          value={preferred_username}
          onChangeText={text => setPrefUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="default"
          textContentType="username"
        />
        <SignTextInput
          value={username}
          onChangeText={text => setEmail(text)}
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <SignTextInput
          value={password}
          onChangeText={text => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <SignButton title="Sign Up" onPress={signUp} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('confirm')}>
            <Text style={styles.confirmButtonText}>Unverified Account? Enter Verification Code</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerButtonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('signin')}>
                <Text style={styles.forgotPasswordButtonText}>Already have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
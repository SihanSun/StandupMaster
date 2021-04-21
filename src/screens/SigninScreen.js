import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert} from 'react-native';
import { Auth } from 'aws-amplify';
import {SignButton, SignTextInput, styles} from '../components/SignButtons'
import { Context as SharedContext } from '../context/SharedContext';
import { getUsers } from '../api/users';

export default function SignInScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {
        setCognitoUser,
        setUserInfo
    } = useContext(SharedContext);

    async function signIn() {
        try {
            const authUser = await Auth.signIn(username, password);
            setCognitoUser(authUser);
            
            // extract jwtToken and email
            const jwtToken = authUser.signInUserSession.idToken.jwtToken;
            const email = authUser.attributes.email;

            // fetch user information
            const userInfo = await getUsers(jwtToken, email);
            setUserInfo(userInfo);
            
            const teamId = userInfo.teamId;

            if (teamId) {
                navigation.navigate('home');
            } else {
                navigation.navigate('joinTeam');
            }
            console.log('Success');
        }
        catch (error) {
            Alert.alert(error.message);
            console.log(error);
        }
    }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.mainContainer}>
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
            <View style={styles.forgotButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('forgotPassword')}>
                    <Text style={styles.redButtonText}> Forgot Password? </Text>
                </TouchableOpacity>
            </View>
            <SignButton title="Login" onPress={signIn} />
        </View>
        <View style={styles.footerButtonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
                <Text style={styles.greyButtonText}> Don't have an account? Sign Up </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, Modal } from 'react-native';
import { Auth } from 'aws-amplify';
import { Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {SignButton, SignTextInput, styles} from '../components/SignButtons'

export default function ForgotPasswordScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [password, setPassword] = useState('');

    async function forgotPasswordRequest() { // initiate forgot password request 
        try {
            await Auth.forgotPassword(username);
            console.log('Code sent to email');
            toggleModalVisibility();
        } 
        catch (error) {
            Alert.alert(error.message);
            console.log(error);
        }
    }

    async function changePassword() { // confirm new password
        try {
            await Auth.forgotPasswordSubmit(username, authCode, password);
            console.log('Password changed.');
            navigation.navigate('signin')
        } 
        catch (error) {
            if (error.message.toUpperCase().includes("PASSWORD")) {
                Alert.alert("Password conditions not met", /[^:]*$/.exec(error.message)[0]);
            }
            else {
                Alert.alert(error.message);
            }
            console.log(error);
        }
    }

    const [isModalVisible, setModalVisible] = useState(true); //  manage Modal State
    const toggleModalVisibility = () => { // Open and close modal upon button clicks.
        setModalVisible(!isModalVisible);
    };
  
    return (
    <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Change Password</Text>
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
                placeholder="New Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                textContentType="password"
            />
            <SignTextInput
                value={authCode}
                onChangeText={text => setAuthCode(text)}
                leftIcon="numeric"
                placeholder="Confirmation Code"
                keyboardType="numeric"
            />
            <SignButton title="Change Password" onPress={changePassword} />
            <View style={styles.belowBigButtonContainer}>
                <TouchableOpacity onPress={toggleModalVisibility}>
                    <Text style={styles.redButtonText}>Resend Confirmation Code</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Modal
            transparent visible={isModalVisible} 
            presentationStyle="overFullScreen" 
            onDismiss={toggleModalVisibility}
            onRequestClose={() => setModalVisible(false)}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <SignTextInput
                            value={username}
                            onChangeText={text => setUsername(text)}
                            leftIcon="email"
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                        />
                        <Button title="Send Confirmation Code" onPress={forgotPasswordRequest} />
                    </View>
                </View>
        </Modal>
    </SafeAreaView>
  );
}
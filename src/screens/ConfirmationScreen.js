import React, { useState } from 'react';
import { View, Button, Text, TouchableOpacity, Modal } from 'react-native';
import { Auth } from 'aws-amplify';
import { Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {SignButton, SignTextInput, styles} from '../components/SignButtons'

export default function ConfirmationScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [resendEmail, setEmail] = useState(''); // for resending code

    async function confirmSignUp() { // confirm sign up function
        try {
            await Auth.confirmSignUp(username, authCode);
            console.log(' Code confirmed');
            navigation.navigate('signin');
        } 
        catch (error) {
            Alert.alert(error.message);
            console.log(error);
        }
    }

    async function resendSignUp() { // resend verification code
        try {
            await Auth.resendSignUp(resendEmail);
            console.log('Code sent');
            toggleModalVisibility();
        } 
        catch (error) {
            Alert.alert(error.message);
            console.log(error);
        }
    }

    const [isModalVisible, setModalVisible] = useState(false); //  manage Modal State
    const toggleModalVisibility = () => { // Open and close modal upon button clicks.
        setModalVisible(!isModalVisible);
    };
  
    return (
    <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Confirm Sign Up</Text>
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
                value={authCode}
                onChangeText={text => setAuthCode(text)}
                leftIcon="numeric"
                placeholder="Verification Code"
                keyboardType="numeric"
            />
            <SignButton title="Confirm" onPress={confirmSignUp} />
            <View style={styles.belowBigButtonContainer}>
                <TouchableOpacity onPress={toggleModalVisibility}>
                    <Text style={styles.redButtonText}>Resend Verification Code</Text>
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
                            value={resendEmail}
                            onChangeText={text => setEmail(text)}
                            leftIcon="email"
                            placeholder="Email"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                        />
                        <Button title="Send Verification Code" onPress={resendSignUp} />
                    </View>
                </View>
        </Modal>
    </SafeAreaView>
  );
}
import React, { useContext, useEffect } from 'react';
import { View, SafeAreaView} from 'react-native';
import { Auth } from 'aws-amplify';
import {styles} from '../components/SignButtons'
import { Context as SharedContext } from '../context/SharedContext';
import { getUsers } from '../api/users';


export default function SplashScreen({ navigation }) {

    const {
        setCognitoUser,
        setUserInfo
    } = useContext(SharedContext);

    async function checkUser() {
        try {
            const authUser = await Auth.currentAuthenticatedUser();
            if (authUser) {
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
                    navigation.navigate('joinTeam')
                }
                console.log('Successfully logged in');
            }
            else {
                navigation.navigate('signin');
            }
        }
        catch (error) {
            navigation.navigate('signin');
        }
    }

    useEffect(() => {
        checkUser();
    });

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
        </SafeAreaView>
    );
}
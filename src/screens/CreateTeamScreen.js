import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, SafeAreaView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import { postTeam } from '../api/teams';
import { getUsers } from '../api/users';
import { Context as SharedContext } from '../context/SharedContext';
import styles from '../styles';
import {SignTextInput} from '../components/SignButtons';

const CreateTeamScreen = ({navigation}) => {
  const [inputTeamName, setInputTeamName] = useState("");
  const [isRefreshing, setRefreshing] = useState(false);
  const { state: {cognitoUser, userInfo}, setUserInfo } = useContext(SharedContext);

  const CreateTeam = async (teamName, userInfo, setUserInfo) => {
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const email = cognitoUser.attributes.email;
    const data = JSON.stringify({
      name: teamName,
      ownerEmail: email,
    });
    await postTeam(jwtToken, data);
    const newUserInfo = await getUsers(jwtToken, userInfo.email);
    setUserInfo(newUserInfo);
    if (newUserInfo.teamId) {
      navigation.navigate('home')
    }
  }

  const renderCreateTeam = () => {
    return (
      <View style={[styles.mainUI, {flex: 1}]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{marginHorizontal: 20, marginTop: 20, flex: 1, alignItems: 'center', flexDirection: 'row'}}>
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>Team Name</Text>

          <SignTextInput
            style={{width: '100%'}}
            onChangeText={text => setInputTeamName(text)}
            value={inputTeamName}
          />
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity
        onPress={() => CreateTeam(inputTeamName, userInfo, setUserInfo)}
        style={{marginVertical: 20, marginHorizontal: 20, borderRadius: 10, 
        padding: 10, alignItems: 'center', 
        backgroundColor:'#599DFF'}}>
        <Text style={{fontSize: 20, color: 'white'}}>
          Create Team
        </Text>
      </TouchableOpacity>
    </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderCreateTeam()}
    </SafeAreaView>
  )
}

export default CreateTeamScreen;
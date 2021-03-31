import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, RefreshControl, SafeAreaView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

import { postPendingMember, deletePendingMember } from '../api/teams';
import { getUsers } from '../api/users';
import { Context as SharedContext } from '../context/SharedContext';
import styles from '../styles';
import {SignTextInput} from '../components/SignButtons';

const JoinTeamScreen = ({navigation}) => {
  const [inputTeamId, setInputTeamId] = useState("");
  const [isRefreshing, setRefreshing] = useState(false);
  const { state: {cognitoUser, userInfo}, setUserInfo } = useContext(SharedContext);

  const updatePendingStatus = async (userInfo, setUserInfo) => {
    setRefreshing(true);
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const newUserInfo = await getUsers(jwtToken, userInfo.email);
    setUserInfo(newUserInfo);
    setRefreshing(false);
    if (newUserInfo.teamId && newUserInfo.pendingToJoinTeam === false) {
      navigation.navigate('home')
    }
  }

  const joinTeam = async (code, userInfo, setUserInfo) => {
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const email = cognitoUser.attributes.email;
    const data = JSON.stringify({email});
    await postPendingMember(jwtToken, code, data);
    const newUserInfo = await getUsers(jwtToken, userInfo.email);
    setUserInfo(newUserInfo);
  }

  const quitPending = async (userInfo, setUserInfo) => {
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const email = cognitoUser.attributes.email;
    await deletePendingMember(jwtToken, userInfo.teamId, userInfo.email);
    const newUserInfo = await getUsers(jwtToken, userInfo.email);
    setUserInfo(newUserInfo);
  }

  const renderJoinTeam = () => {
    return (
      <View style={[styles.mainUI, {flex: 1}]}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{marginHorizontal: 20, marginTop: 20, flex: 1, alignItems: 'center', flexDirection: 'row'}}>
        <View style={{width: '100%'}}>
          <Text style={{fontSize: 30, textAlign: 'center'}}>Enter Team ID</Text>

          <SignTextInput
            style={{width: '100%'}}
            onChangeText={text => setInputTeamId(text)}
            value={inputTeamId}
          />
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity
        onPress={() => joinTeam(inputTeamId, userInfo, setUserInfo)}
        style={{marginVertical: 20, marginHorizontal: 20, borderRadius: 10, 
        padding: 10, alignItems: 'center', 
        backgroundColor:'#599DFF'}}>
        <Text style={{fontSize: 20, color: 'white'}}>
          Join Team
        </Text>
      </TouchableOpacity>
    </View>
    )
  }

  const renderPendingToJoinTeam = (userInfo) => {
    return (
      <View style={[styles.mainUI, {flex: 1}]}>
        <ScrollView 
          contentContainerStyle={{alignItems: 'center', flex: 1, flexDirection: 'row'}}
          refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => updatePendingStatus(userInfo, setUserInfo)}
              />} >
          <View style={{width: '100%'}}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              Your request to join team
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}>
              {userInfo.teamId}
            </Text>
            <Text style={{fontSize: 20, textAlign: 'center'}}>
              is pending approval
            </Text>
          </View>
        </ScrollView>

        <TouchableOpacity
          onPress={() => quitPending(userInfo, setUserInfo)}
          style={{marginVertical: 20, marginHorizontal: 20, borderRadius: 10, 
          padding: 10, alignItems: 'center', 
          backgroundColor:'#599DFF'}}>
          <Text style={{fontSize: 20, color: 'white'}}>
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const isPending = userInfo.pendingToJoinTeam === true;
  return (
    <SafeAreaView style={styles.container}>
      {!isPending && renderJoinTeam()}
      {isPending && renderPendingToJoinTeam(userInfo)}
    </SafeAreaView>
  )
}

export default JoinTeamScreen;
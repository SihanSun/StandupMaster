import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { postPendingMemeber } from '../api/teams';
import { Context as SharedContext } from '../context/SharedContext';


const JoinTeamScreen = ({navigation}) => {
  const [val, setVal] = useState("");
  const { state: {cognitoUser }} = useContext(SharedContext);

  const joinTeam = async (code) => {
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const email = cognitoUser.attributes.email;
      const payload = {
        email: email,
      }
      const data = JSON.stringify(payload);
      await postPendingMemeber(jwtToken, code, data);
      navigation.navigate('home');
  }

  return (
    <SafeAreaView>
      <Text>JoinTeam Screen</Text>
      <TextInput
        multiline={true}
        style={[{ flex: 1, paddingBottom: 48}, styles.textLarge,]}
        onChangeText={text => setVal(text)}
        value={val}
      />
      <TouchableOpacity
        style={{marginVertical: 20, marginHorizontal: 20, borderRadius: 10, 
        padding: 10, alignItems: 'center', backgroundColor: '#599DFF', flex: 1}} onPress={() => joinTeam(val)}>
        <Text style={{fontSize: 20, color: 'white'}}>Join Team</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({});

export default JoinTeamScreen;
import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Platform, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Context as SharedContext } from '../context/SharedContext';
import { addTeamMember, deletePendingMemeber } from '../api/teams';

import RowTemplate from '../components/RowTemplate';
import styles from '../styles';
import PropertyTemplate from '../components/PropertyTemplate';


class ProfileScreen extends Component {
  static contextType = SharedContext;

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    }
  }

  componentDidMount() {
  }

  accept = async (email) => {
    const { state: { teamInfo, cognitoUser } }  = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    await addTeamMember(jwtToken, teamInfo.id, email);
  }

  deny = async (email) => {
    const { state: { teamInfo, cognitoUser } } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    await deletePendingMemeber(jwtToken, teamInfo.id, email);
  }

  renderNavigation = () => {
    const { navigation } = this.props;

    return (
      <View style={{padding: 20, flexDirection: 'row'}}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{justifyContent: 'center'}}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 24}}>
          <Text style={[styles.textLarge]}>Manage Pending Members</Text>
        </View>
      </View>
    )
  }

  renderPendingMember = ({ item }) => {
    const { email, displayName, profilePictureUrl, isBlocked } = item;

    
    return (
      <>
        <RowTemplate
          image={{uri: profilePictureUrl}}
          title={displayName}
          description={email}
          metaInfo={null}
        />
        <Button title="Accept" onPress={()=>this.accept(email)}/>
        <Button title="Deny" onPress={()=>this.deny(email)}/>
      </>
    )
  }

  render() {
    const { state: { teamInfo, cognitoUser, userInfo } } = this.context;
    const { pendingMembers } = teamInfo;

    return (
      <SafeAreaView style={[styles.container]}>
        <View style={styles.mainUI}>
          {this.renderNavigation()}
          <View style={{ borderBottomWidth: 2, borderBottomColor: '#f2f0eb',}}>
          </View>
          <FlatList
            style={{flex: 1, backgroundColor: '#fafafa', flex: 1}}
            data={pendingMembers}
            renderItem={this.renderPendingMember}
            keyExtractor={(item) => item.email}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default ProfileScreen;
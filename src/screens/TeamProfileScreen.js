import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Context as SharedContext } from '../context/SharedContext';
import { addTeamMember } from '../api/teams';

import styles from '../styles';
import PropertyTemplate from '../components/PropertyTemplate';

const TEAM_PICTURE_DEFAULT = require('../../assets/pokemon.png');
const TEAM_NAME = "Team Name";
const ANNOUNCEMENT = "Announcement";
const INVITE = "Invite Member";

class TeamProfileScreen extends Component {

  static contextType = SharedContext;

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    }
  }

  componentDidMount() {

  }

  requestImagePermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  changePicture = async () => {
    await this.requestImagePermission();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const { setTeamInfo } = this.context;
      setTeamProfilePicture({ uri: result.uri });
    }
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
          <Text style={[styles.textLarge]}>Edit Team Profile</Text>
        </View>
      </View>
    )
  }

  renderHeader = () => {
    const { state: { teamInfo } } = this.context;
    const pictureSrc = {uri: teamInfo.profilePictureUrl}
    return (
      <View style={{marginHorizontal: 20, marginTop: 20, backgroundColor: 'white', alignItems: 'center'}}>
        <Image
          style={styles.largeImage}
          source={pictureSrc}
        />
        <TouchableOpacity 
          onPress={this.changePicture}
          style={{ marginVertical: 20 }}>
          <Text style={[{color: '#599DFF'}, styles.textRegular]}>Change Photo</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderProperty = ({ item }) => {
    const { name, value, setValue } = item;
    const { navigation } = this.props;
    const shouldLimit = item.name === TEAM_NAME || item.name === INVITE;
    const onPress = () => { navigation.navigate('EditTeamProperty', 
        { property: item, onSave: (value) => setValue(value), limit: { shouldLimit }}
      )};
    return (
      <PropertyTemplate
        name={name}
        value={value}
        onPress={onPress}
      />
    )
  }

  changeTeamName = (value) => {
    const { state: {teamInfo, cognitoUser }, setTeamName } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken
    setTeamName(jwtToken, teamInfo, value);
  }

  changeTeamAnnouncement = (value) => {
    const { state: {teamInfo, cognitoUser }, setTeamAnnouncement } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken
    setTeamAnnouncement(jwtToken, teamInfo, value);
  }

  inviteMember = (value) => {
    const { state: {teamInfo, cognitoUser }} = this.context;
  }

  render() {
    const { state: {teamInfo}, setTeamName } = this.context;
    const { id, name, announcement } = teamInfo;

    const properties = [{
      name: TEAM_NAME,
      value: name,
      setValue: this.changeTeamName
    }, {
      name: ANNOUNCEMENT,
      value: announcement,
      setValue: this.changeTeamAnnouncement
    }, {
      name: INVITE,
      value: 'Enter email here',
      setValue: (value) => addTeamMember(value)
    }];

    return (
      <SafeAreaView style={[styles.container]}>
        <View style={styles.mainUI}>
          {this.renderNavigation()}
          <View style={{ borderBottomWidth: 2, borderBottomColor: '#f2f0eb',}}>
            {this.renderHeader()}
          </View>
          <FlatList
            style={{flex: 1, backgroundColor: '#fafafa', flex: 1}}
            data={properties}
            renderItem={this.renderProperty}
            keyExtractor={(item) => item.name}
          />
        </View>
      </SafeAreaView>
    )
  }
}

export default TeamProfileScreen;
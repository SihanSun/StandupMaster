import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

import styles from '../styles';
import PropertyTemplate from '../components/PropertyTemplate';

const TEAM_PICTURE_DEFAULT = require('../../assets/pokemon.png');
const TEAM_NAME = "Team Name";
const ANNOUNCEMENT = "Announcement";
const INVITATION_CODE = "Invitation Code";

class TeamProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      teamName: 'Standup Master Team',
      teamPictureUri: null,
      announcement: '',
      invitationCode: 5238
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
      this.setState({teamPictureUri: result.uri});
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
    const { teamPictureUri } = this.state;
    return (
      <View style={{marginHorizontal: 20, marginTop: 20, backgroundColor: 'white', alignItems: 'center'}}>
        <Image
          style={styles.largeImage}
          source={teamPictureUri ? {uri: teamPictureUri} : TEAM_PICTURE_DEFAULT}
        />
        <TouchableOpacity 
          onPress={this.changePicture}
          style={{ marginVertical: 20 }}>
          <Text style={[{color: '#599DFF'}, styles.textRegular]}>Change Photo</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onChangeProperty = ({name, value}) => {
    switch (name) {
      case TEAM_NAME:
        this.setState({teamName: value});
        break;
      case ANNOUNCEMENT: 
        this.setState({announcement: value});
        break;
    }
  }

  renderProperty = ({ item }) => {
    const { name, value } = item;
    const { navigation } = this.props;
    const shouldLimit = item.name === TEAM_NAME
    const onPress = item.name === INVITATION_CODE
      ? null
      : () => { navigation.navigate('EditTeamProperty', { property: item, onSave: this.onChangeProperty, limit: { shouldLimit }}) };
    return (
      <PropertyTemplate
        name={name}
        value={value}
        onPress={onPress}
      />
    )
  }

  render() {

    const { teamName, announcement, invitationCode } = this.state;
    const properties = [{
      name: TEAM_NAME,
      value: teamName
    }, {
      name: ANNOUNCEMENT,
      value: announcement
    }, {
      name: INVITATION_CODE,
      value: invitationCode
    }];

    return (
      <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
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
      </SafeAreaView>
    )
  }
}

export default TeamProfileScreen;
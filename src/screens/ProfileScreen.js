import React, { useContext, Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

import styles from '../styles';
import PropertyTemplate from '../components/PropertyTemplate';
import { Context as SharedContext } from '../context/SharedContext';
import { getUsers } from '../api/users';
import { removeTeamMember } from '../api/teams';

const EMAIL = "Email";
const DISPLAY_NAME = "Display Name";
const FIRST_NAME = "First Name";
const LAST_NAME = "Last Name";

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
      const { state: {cognitoUser, userInfo}, setUserProfilePicture } = this.context;
      const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;

      const response = await ImageManipulator.manipulateAsync(result.uri, [], { base64: true })
      setUserProfilePicture(jwtToken, userInfo, JSON.stringify(response.base64));
    }
  }

  renderHeader = () => {
    const { state: {userInfo} } = this.context;
    const pictureSrc = {uri: userInfo.profilePictureUrl}
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

    const onPress = name === EMAIL
      ? null
      : () => {navigation.navigate('EditProperty', { property: item, onSave: (value) => setValue(value)})}
    return (
      <PropertyTemplate
        name={name}
        value={value}
        onPress={onPress}
      />
    )
  }

  changeUserDisplayName = (value) => {
    const { state: { cognitoUser, userInfo }, setUserDisplayName } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    setUserDisplayName(jwtToken, userInfo, value);
  }

  changeUserFirstName = (value) => {
    const { state: { cognitoUser, userInfo }, setUserFirstName } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    setUserFirstName(jwtToken, userInfo, value);
  }

  changeUserLastName = (value) => {
    const { state: { cognitoUser, userInfo }, setUserLastName } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    setUserLastName(jwtToken, userInfo, value);
  }

  quitTeam = async () => {
    const { state: { cognitoUser, userInfo }, setUserLastName } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const { email, teamId } = userInfo;
    await removeTeamMember(jwtToken, teamId, email);
    this.props.navigation.navigate('joinTeam');
  }

  render() {
    const { state: { userInfo }, signOut } = this.context;
    const {
      email, displayName, firstName, lastName
    } = userInfo;
    const properties = [{
      name: EMAIL,
      value: email,
      setValue: null
    }, {
      name: DISPLAY_NAME,
      value: displayName,
      setValue: this.changeUserDisplayName
    }, {
      name: FIRST_NAME,
      value: firstName,
      setValue: this.changeUserFirstName
    }, {
      name: LAST_NAME,
      value: lastName,
      setValue: this.changeUserLastName
    }];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainUI}>
          <View style={{ borderBottomWidth: 2, borderBottomColor: '#f2f0eb',}}>
            {this.renderHeader()}
          </View>
          <FlatList
            style={{flex: 1, backgroundColor: '#fafafa', flex: 1}}
            data={properties}
            renderItem={this.renderProperty}
            keyExtractor={(item) => item.name}
          />
          <View style={{borderTopWidth: 2, borderTopColor: '#f2f0eb', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={this.quitTeam}
              style={{marginVertical: 20, marginHorizontal: 20, borderRadius: 10, 
              padding: 10, alignItems: 'center', backgroundColor: '#599DFF', flex: 1}}>
              <Text style={{fontSize: 20, color: 'white'}}>Quit Team</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginVertical: 20, marginHorizontal: 20, borderRadius: 10, 
              padding: 10, alignItems: 'center', backgroundColor: '#599DFF', flex: 1}} onPress={() => signOut()}>
              <Text style={{fontSize: 20, color: 'white'}}>Sign out</Text>
           </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default ProfileScreen;
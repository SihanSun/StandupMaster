import React, { useContext, Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import styles from '../styles';
import PropertyTemplate from '../components/PropertyTemplate';

const PROFILE_PICTURE_DEFAULT = require('../../assets/pokemon.png');
const EMAIL = "Email";
const DISPLAY_NAME = "Display Name";
const FIRST_NAME = "First Name";
const LAST_NAME = "Last Name";

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      email: '',
      profilePictureUrl: null,
      profilePicture: null,
      displayName: '',
      firstName: '',
      lastName: '',
      blocked: false
    }
  }

  componentDidMount() {
    this.fetchUser();
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
      this.setState({profilePictureUrl: result.uri});
    }
  }

  fetchUser = async () => {
    const user = {
      email: 'sihan.sun@yale.edu',
      profilePictureUrl: null,
      profilePicture: null,
      displayName: 'Sihan Sun',
      firstName: 'Sihan',
      lastName: 'Sun',
      blocked: false
    }

    const { email, profilePictureUrl, profilePicture, 
      displayName, firstName, lastName, blocked } = user;

    this.setState({ email, profilePictureUrl, profilePicture, 
      displayName, firstName, lastName, blocked});
  }

  renderHeader = () => {
    const { profilePictureUrl } = this.state;
    return (
      <View style={{marginHorizontal: 20, marginTop: 20, backgroundColor: 'white', alignItems: 'center'}}>
        <Image
          style={styles.largeImage}
          source={profilePictureUrl ? {uri: profilePictureUrl} : PROFILE_PICTURE_DEFAULT}
        />
        <TouchableOpacity 
          onPress={this.changePicture}
          style={{marginVertical: 20, backgroundColor: '#599DFF', padding: 10, borderRadius: 10}}>
          <Text style={[{color: 'white'}, styles.textRegular]}>Change Photo</Text>
        </TouchableOpacity>
      </View>
    )
  }

  onChangeProperty = ({name, value}) => {
    console.log(name);
    switch (name) {
      case EMAIL:
        this.setState({email: value});
        break;
      case DISPLAY_NAME: 
        console.log('change display name to ' + value);
        this.setState({displayName: value});
        break;
      case FIRST_NAME:
        this.setState({firstName: value});
        break;
      case LAST_NAME:
        this.setState({lastName: value});
    }
  }

  renderProperty = ({ item }) => {
    const { name, value } = item;
    const { navigation } = this.props;
    return (
      <PropertyTemplate
        name={name}
        value={value}
        onPress={() => {navigation.navigate('EditProperty', { property: item, onSave: this.onChangeProperty})}}
      />
    )
  }

  render() {

    const { email, displayName, firstName, lastName } = this.state;
    const properties = [{
      name: EMAIL,
      value: email
    }, {
      name: DISPLAY_NAME,
      value: displayName
    }, {
      name: FIRST_NAME,
      value: firstName
    }, {
      name: LAST_NAME,
      value: lastName
    }];

    return (
      <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
        <View style={{ borderBottomWidth: 2, borderBottomColor: '#f2f0eb',}}>
          {this.renderHeader()}
        </View>
        <FlatList
          style={{flex: 1, backgroundColor: '#fafafa', flex: 1}}
          data={properties}
          renderItem={this.renderProperty}
          keyExtractor={(item) => item.name}
        />
        <View style={{borderTopWidth: 2, borderTopColor: '#f2f0eb'}}>
          <TouchableOpacity
            style={{marginVertical: 20, marginHorizontal: 20, borderRadius: 10, 
            padding: 10, alignItems: 'center', backgroundColor: '#599DFF'}}>
            <Text style={{fontSize: 20, color: 'white'}}>Quit Team</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

export default ProfileScreen;
import React, { useContext, Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import styles from '../styles';
import PropertyTemplate from '../components/PropertyTemplate';

import { Context as UserContext } from '../context/UserContext'; 

const EMAIL = "Email";
const DISPLAY_NAME = "Display Name";
const FIRST_NAME = "First Name";
const LAST_NAME = "Last Name";

class ProfileScreen extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
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
      const { setUserProfilePicture } = this.context;
      setUserProfilePicture({ uri: result.uri});
    }
  }

  fetchUser = async () => {
    const { setDisplayName, setFirstName, setLastName, 
      setUserProfilePicture, setUserEmail } = this.context;
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

    setDisplayName(displayName);
    setFirstName(firstName);
    setLastName(lastName);
    setUserEmail(email);
    profilePictureUrl && setUserProfilePicture({ uri: profilePictureUrl });
  }

  renderHeader = () => {
    const { state: {pictureSrc} } = this.context;
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
    const onSave = ({name, value}) => setValue(value);
    return (
      <PropertyTemplate
        name={name}
        value={value}
        onPress={() => {navigation.navigate('EditProperty', { property: item, onSave })}}
      />
    )
  }

  render() {
    const { signOut } = this.context;
    const { state: {
      email, displayName, firstName, lastName },  
      setUserEmail, setDisplayName, setFirstName, setLastName
    } = this.context;
    const properties = [{
      name: EMAIL,
      value: email,
      setValue: setUserEmail
    }, {
      name: DISPLAY_NAME,
      value: displayName,
      setValue: setDisplayName
    }, {
      name: FIRST_NAME,
      value: firstName,
      setValue: setFirstName
    }, {
      name: LAST_NAME,
      value: lastName,
      setValue: setLastName
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
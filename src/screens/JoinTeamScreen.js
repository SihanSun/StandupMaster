import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput,FlatList, Platform, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Context as TeamContext } from '../context/TeamContext';
import { Context as UserContext } from '../context/UserContext';

import styles from '../styles';
import PropertyTemplate from '../components/PropertyTemplate';
const INVITATION_CODE = "Invitation Code";
const MAX_LENGTH = 30;

class JoinTeamScreen extends Component {

  static contextType = TeamContext;

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
    }
  }

  componentDidMount() {

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
          <Text style={[styles.textLarge]}>Join A Team</Text>
        </View>
      </View>
    )
  }

  renderProperty = ({ item }) => {
    const { name, value, setValue } = item;
    const { navigation } = this.props;
    const shouldLimit = item.name === INVITATION_CODE
  }

  render() {
    const { state: {
        invitationCode 
      },
    } = this.context;

    const properties = [{
      name: INVITATION_CODE,
      value: invitationCode,
      setValue: null
    }];
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={styles.mainUI}>
          {this.renderNavigation()}
          <View style={{ borderBottomWidth: 2, borderBottomColor: '#f2f0eb',}}>
          <Text style={[styles.textRegular, {color: 'grey'}, {fontWeight: 'bold'}, {textAlign: 'center'}]}>Enter Team Code</Text>
          <View style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              multiline={false}
              maxLength="30"
              style={[{ flex: 1, paddingBottom: 48, textAlign: "center"}, styles.textLarge]}
              placeholder="Enter Code Here"
              // onChangeText={text => setVal(text)}
              // value={val}
            />
          </View>
          <Button
            title="  Submit  "
            color="#add8e6"
            onPress={() => do_something}
            /> 
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

export default JoinTeamScreen;
// const JoinTeamScreen = () => {
//   return (
//     <SafeAreaView>
//       <Text>JoinTeam Screen</Text>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({});

// export default JoinTeamScreen;
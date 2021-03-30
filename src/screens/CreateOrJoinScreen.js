import React, { Component, useState } from 'react';
import { View, Text, SafeAreaView, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Context as TeamContext } from '../context/TeamContext';

import styles from '../styles';
import PropertyTemplate from '../components/PropertyTemplate';

     
class CreateOrJoinScreen extends Component {
    static contextType = TeamContext;
    
    constructor(props) {
        super(props);
    
        this.state = {
          isRefreshing: false,
        }
    }

    componentDidMount() {

    }


      render() {
        const { navigation } = this.props;
          return(
            <SafeAreaView style={{flex: 1, marginHorizontal: 16}}>
                <View style={{marginVertical: 20}} />
                <Text style={{textAlign: 'center', fontWeight: "bold", fontSize: 20}}>
                    Join or Create a Team! 
                </Text>
                <View style={{marginVertical: 80}} />
            <View>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly', fontWeight: 'bold'}} >
              <Button
                title="           JOIN A TEAM          "
                color="#add8e6"
                onPress={() => navigation.navigate('JoinTeam')}
              />
            </View>
            <View style={{marginVertical: 20, borderBottomColor: '#737373', borderBottomWidth: 8}} />
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}} >
      <Button
        title="         CREATE A TEAM        "
        color="#add8e6"
        onPress={() => navigation.navigate('CreateTeam')}
      />
      </View>
      </View>
    </View>
            </SafeAreaView>

          )
      }
    
}
export default CreateOrJoinScreen;


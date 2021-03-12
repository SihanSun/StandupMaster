import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import styles from '../styles';

const MAX_LENGTH = 30;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const EditPropertyScreen = ({ navigation, route}) => {
  const { name, value } = navigation.getParam('property', {name: '', value: ''});
  const [val, setVal] = useState(value);

  const onSave = navigation.getParam('onSave', () => {});

  const { shouldLimit } = navigation.getParam('limit', { shouldLimit: true });

  const renderNavigation = () => {
    return (
      <View style={{padding: 20, flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: '#f2f0eb'}}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{justifyContent: 'center'}}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.textLarge]}>Edit your {name.toLowerCase()}</Text>
        </View>
        <TouchableOpacity 
          style={{justifyContent: 'center'}}
          onPress={() => {
            onSave({name, value: val});
            navigation.goBack()
          }}
        >
          <Text style={[styles.textLarge, {color: '#599DFF'}]}>Save</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderEditingSection = () => {
    const len = val ? val.length : 0;
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{marginHorizontal: 20, marginTop: 20, flex: 1}}>
        <View>
          <Text style={[styles.textRegular, {color: 'grey'}]}>{name}</Text>
          <View style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              multiline={shouldLimit ? false : true}
              maxLength={shouldLimit ? MAX_LENGTH : null}
              style={[{ flex: 1, paddingBottom: 48}, styles.textLarge,]}
              onChangeText={text => setVal(text)}
              value={val}
            />
            <TouchableOpacity 
              onPress={() => setVal('')}
              style={{marginLeft: 'auto', alignSelf: 'flex-start'}}>
              <MaterialIcons name="cancel" size={22} color="grey" />
            </TouchableOpacity>
          </View>
          {
            shouldLimit 
            ? (
              <Text style={[styles.textSmall, {color: 'grey'}]}>{len}/{MAX_LENGTH}</Text>
            ) : null
          }
        </View>
      </KeyboardAvoidingView>
    )
  }

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: 'white'}]}>
      {renderNavigation()}
      {renderEditingSection()}
    </SafeAreaView>
  )
}

export default EditPropertyScreen;
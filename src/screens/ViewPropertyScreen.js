import React, { useState } from 'react';
import { View, Text, SafeAreaView, Button, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Dimensions, Clipboard, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import styles from '../styles';

const MAX_LENGTH = 30;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const ViewPropertyScreen = ({ navigation, route}) => {
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
          <Text style={[styles.textLarge]}>View your {name.toLowerCase()}</Text>
        </View>
      </View>
    )
  }

  const renderViewingSection = () => {
    const len = val ? val.length : 0;
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{marginHorizontal: 20, marginTop: 20, flex: 1}}>
        <View>
          <Text style={[styles.textRegular, {color: 'grey'}]}>{name}</Text>
          <View style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[{ flex: 1, paddingBottom: 48}, styles.textLarge,]}
            >{val}</Text>
          </View>
            <TouchableOpacity
                onPress={() => {Clipboard.setString(val); Alert.alert(name+' Copied');}}
                style={{marginVertical: 20, marginHorizontal: 20, borderRadius: 10, 
                padding: 10, alignItems: 'center', 
                backgroundColor:'#599DFF'}}>
                <Text style={{fontSize: 20, color: 'white'}}>
                  Copy to clipboard
                </Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainUI}>
        {renderNavigation()}
        {renderViewingSection()}
      </View>
    </SafeAreaView>
  )
}

export default ViewPropertyScreen;
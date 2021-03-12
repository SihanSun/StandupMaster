import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, AsyncStorage } from 'react-native';

import styles from '../styles';

const editIcon = require('../../assets/edit.png');
const saveIcon = require('../../assets/save.png');

const EDITING_MODE = 0;
const VIEWING_MODE = 1;
const EDIT = "Edit";
const SAVE = "Save";

class EditCard extends Component {
  constructor(props) {
    super(props);

    const { title } = props;

    this.state = {
      mode: VIEWING_MODE,
      title,
      content: '',
      isRefreshing: false
    }
  }

  componentDidMount() {
    this.fetchContent();
  }

  fetchContent = async() => {
    const { title } = this.state;
    try {
      const content = await AsyncStorage.getItem(title);
      if (content !== null) {
        this.setState({content});
      } 
    } catch (error) {
      console.log(error);
    }
  }

  storeContent = async() => {
    const { title,  content } = this.state;
    try {
      await AsyncStorage.setItem(
        title,
        content
      );
    } catch (error) {
      console.log(error);
      // Error saving data
    }
  }

  render() {
    const { mode, title, content } = this.state;
    return (
      <View
        style={styles.cardStyle}
      >
        <View style={{padding: 10, borderBottomColor: '#f2f0eb', borderBottomWidth: 2, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[{fontWeight: 'bold'}, styles.textLarge]}>{title}</Text>
          <TouchableOpacity 
            onPress={() => {
              if (mode === EDITING_MODE) {
                this.storeContent();
              }
              const m = mode === EDITING_MODE ? VIEWING_MODE : EDITING_MODE;
              this.setState({mode: m});
            }}
            style={{marginLeft: 'auto'}}>
              <Text style={[{color: '#599DFF', fontWeight: 'bold'}, styles.textRegular]}
              >{mode === EDITING_MODE ? SAVE : EDIT}</Text>
          </TouchableOpacity>
        </View>
        <View style={{padding: 10, height: 100}}>
          {mode === EDITING_MODE ? (
            <TextInput
              multiline={true}
              onChangeText={text => this.setState({content: text})}
              value={content}
            />
          ) : (
            <Text>{content}</Text>
          )}
        </View>
      </View>
    )
  }
}

export default EditCard;
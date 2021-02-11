import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import styles from '../styles';

const TEAM_INDEX= 0;
const RECORD_INDEX = 1;

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      selectedIndex: TEAM_INDEX
    };
  }

  componentDIdMount() {
    //TODO
  }

  renderHeader = () => {
    return (
      <View style={{flexDirection: 'row'}}>

      </View>
    )
  }

  renderHeader = () => {
    return (
      <View style={{height: 300}}>
        <Text>HomeScreen</Text>
      </View>
    )
  }
  renderTabBar = () => {
    const { selectedIndex } = this.state;
    return (
      <View style={{flexDirection: 'row', width: '100%', height:60, backgroundColor: 'white'}}>
        <TouchableOpacity 
          style={{
            borderBottomWidth: 2,
            borderBottomColor: selectedIndex === TEAM_INDEX ? '#599DFF': 'white',
            flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'
            }}
          onPress={() => this.setState({selectedIndex: TEAM_INDEX})}>
          <Ionicons name="md-people-outline" size={24} color="black" />
          <Text>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            borderBottomWidth: 2,
            borderBottomColor: selectedIndex === RECORD_INDEX ? '#599DFF': 'white',
            flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'
          }}
          onPress={() => this.setState({selectedIndex: RECORD_INDEX})}>
          <MaterialCommunityIcons name="note-text-outline" size={24} color="black" />
          <Text>Record</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        {this.renderTabBar()}
      </SafeAreaView>
    )
  }
}

export default HomeScreen;
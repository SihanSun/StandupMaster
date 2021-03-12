import React, { Component } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, FlatList, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import RowTemplate from '../components/RowTemplate'
import styles from '../styles';

const TEAM_INDEX= 0;
const RECORD_INDEX = 1;
const JOIN_ICON = require('../../assets/up-arrow.png');
const TEAM_ICON = require('../../assets/meeting.jpg');

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      selectedIndex: TEAM_INDEX,
      teamMembers: [],
      pastRecords: []
    };
  }

  componentDidMount() {
    //TODO
    this.fetchTeamMembers();
    this.fetchPastRecords();
  }

  onRefresh = () => {
    this.setState({isRefreshing: true})
    setTimeout(() => {
      this.setState({isRefreshing: false})
    }, 2000)
  }

  fetchTeamMembers = async () => {
    const teamMembers = [
      {
        name: 'Lizhou Cai',
        email: 'lizhou.cai@yale.edu',
        imageUrl: require('../../assets/bart-simpson.jpg'),
        lastModified: 1614306931,
        isBlocked: false
      }, {
        name: 'Jasky Yang',
        email: 'jiaqi.yang@yale.edu',
        imageUrl: require('../../assets/Bugs-Bunny.jpg'),
        lastModified: 1614306931,
        isBlocked: true
      },{
        name: 'Daly Joseph',
        email: 'daly.joseph@yale.edu',
        imageUrl: require('../../assets/Fred-Flintstone.jpg'),
        lastModified: 1614306931,
        isBlocked: false
      },{
        name: 'Robert Lopez',
        email: 'robert.lopez@yale.edu',
        imageUrl: require('../../assets/Mickey-Mouse.jpg'),
        lastModified: 1614306931,
        isBlocked: false
      },{
        name: 'Kai Li',
        email: 'kai.li@yale.edu',
        imageUrl: require('../../assets/Patrick-Star.png'),
        lastModified: 1614306931,
        isBlocked: true
      },{
        name: 'Sihan Sun',
        email: 'sihan.sun@yale.edu',
        imageUrl: require('../../assets/pokemon.png'),
        lastModified: 1614306931,
        isBlocked: false
      }
    ];

    this.setState({ teamMembers });
  }

  fetchPastRecords = () => {
    const pastRecords = [
      {
        timestamp: 1614306931
      },{
        timestamp: 1614268030
      },{
        timestamp: 1614106931
      },{
        timestamp: 1614006931
      },{
        timestamp: 1613906931
      },{
        timestamp: 1613806931
      },
    ];

    this.setState({ pastRecords });
  }

  renderHeader = () => {
    return (
      <View style={{marginHorizontal: 20, marginTop: 20, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Image
            style={styles.largeImage}
            source={TEAM_ICON}
          />
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.textLarge]}>Standup Master Team</Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>6</Text>
                <Text style={{fontSize: 16}}>Members</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>4</Text>
                <Text style={{fontSize: 16}}>OK</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>2</Text>
                <Text style={{fontSize: 16}}>Blocked</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={[{flex: 3, height: 80}, styles.textBox]}>
            <Text>There is no new announcement today. Please arrive the meeting ontime</Text>
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity>
              <Image
                style={styles.mediumImage}
                source={JOIN_ICON}
              />
            </TouchableOpacity>
            <Text>Join</Text>
          </View>
        </View>
      </View>
    )
  }

  readTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    const day = "" + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
    const time = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return { day, time };
  }

  renderTeamMember = ({ item }) => {
    const { name, email, imageUrl, lastModified, isBlocked } = item;

    const { time } = this.readTimestamp(lastModified);

    const status = isBlocked ? require('../../assets/delete.png') : require('../../assets/checkmark.png');
    return (
      <RowTemplate
        image={imageUrl}
        title={name}
        description={email}
        secondaryImage={status}
        metaInfo={time}
      />
    )
  }

  renderPastRecords = ({ item }) => {
    const { timestamp } = item;
    const { day, time } = this.readTimestamp(timestamp);

    const documentIcon = require('../../assets/document.png');
    const viewIcon = require('../../assets/view.png');

    return (
      <RowTemplate
        onPress={() => {}}
        image={documentIcon}
        imageStyle={{borderRadius: 0, borderWidth: 0, width: 40, height: 40}}
        title={day}
        description={time}
        secondaryImage={viewIcon}
      />
    )
  }

  renderMainSection = () => {
    const { teamMembers, pastRecords, selectedIndex } = this.state;

    const data = selectedIndex === TEAM_INDEX ? teamMembers : pastRecords;
    const renderFunc = selectedIndex === TEAM_INDEX ? this.renderTeamMember : this.renderPastRecords;
    return (
      <View style={{flex: 1, backgroundColor: '#fafafa'}}>
        <FlatList
          data={data}
          renderItem={renderFunc}
          keyExtractor={item => selectedIndex === TEAM_INDEX ? item.email : item.timestamp.toString()}
        />
      </View>
    )
  }

  renderTabBar = () => {
    const { selectedIndex } = this.state;
    return (
      <View style={{flexDirection: 'row', width: '100%', height:60}}>
        <TouchableOpacity 
          style={{
            borderBottomWidth: 3,
            borderBottomColor: selectedIndex === TEAM_INDEX ? '#599DFF': '#f2f0eb',
            flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'
            }}
          onPress={() => this.setState({selectedIndex: TEAM_INDEX})}>
          <Ionicons name="md-people-outline" size={24} color="black" />
          <Text>Status</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={{
            borderBottomWidth: 3,
            borderBottomColor: selectedIndex === RECORD_INDEX ? '#599DFF': '#f2f0eb',
            flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center'
          }}
          onPress={() => this.setState({selectedIndex: RECORD_INDEX})}>
          <MaterialCommunityIcons name="note-text-outline" size={24} color="black" />
          <Text>Record</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderStickyHeader = () => {
    return (
      <>
        {this.renderHeader()}
        {this.renderTabBar()}
      </>
    )
  }

  render() {
    const { isRefreshing } = this.state;
    return (
      <SafeAreaView style={styles.container}>
          {this.renderHeader()}
          {this.renderTabBar()}
          {this.renderMainSection()}
      </SafeAreaView>
    )
  }
}

export default HomeScreen;
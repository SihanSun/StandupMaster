import React, { Component, useContext} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import RowTemplate from '../components/RowTemplate';
import Summaries from '../components/Summaries';
import styles from '../styles';
import { Context as UserContext } from '../context/UserContext'; 

const TEAM_INDEX= 0;
const RECORD_INDEX = 1;
const JOIN_ICON = require('../../assets/up-arrow.png');
const TEAM_ICON = require('../../assets/meeting.jpg');

class HomeScreen extends Component {

  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      cognitoUser: null,
      selectedIndex: TEAM_INDEX,
      teamMembers: [],
      pastRecords: [],
      modalVisible: false,
      selectedSummaries: []
    };
  }

  componentDidMount() {
    const { state: { cognitoUser } } = this.context;
    this.setState({ cognitoUser }) ;
    console.log("in home!");
    console.log(cognitoUser);
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

  fetchSummaryForUser = async (email) => {
    const currentSummary =  {
      email: 'sihan.sun@yale.edu',
      isBlocked: false,
      prevWork: 'this is the prev work',
      block: 'N/A',
      planToday: 'Finish the modal. To test this functionality, I wrote this SUPER long text to check how the card will be resized',
      name: 'Sihan Sun',
      pictureUrl: null
    };
    return currentSummary;
  }

  fetchPastRecords = () => {
    const pastRecords = [
      {
        timestamp: 1614306931,
        summaries: [
          {
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Finish the modal',
            name: 'Sihan Sun',
            email: 'sihan.sun@yale.edu',
            pictureUrl: null
          },
          {
            email: 'jiaqi.yang@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Database Schema',
            name: 'Jasky Yang',
            pictureUrl: null
          }
        ]
      },{
        timestamp: 1614268030,
        summaries: [
          {
            email: 'sihan.sun@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Finish the modal. To test this functionality, I wrote this SUPER long text to check how the card will be resized',
            name: 'Sihan Sun',
            pictureUrl: null
          },
          {
            email: 'jiaqi.yang@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Database Schema',
            name: 'Jasky Yang',
            pictureUrl: null
          }
        ]
      },{
        timestamp: 1614106931,
        summaries: [
          {
            email: 'sihan.sun@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Finish the modal',
            name: 'Sihan Sun',
            pictureUrl: null
          },
          {
            email: 'jiaqi.yang@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Database Schema',
            name: 'Jasky Yang',
            pictureUrl: null
          }
        ]
      },{
        timestamp: 1614006931,
        summaries: [
          {
            email: 'sihan.sun@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Finish the modal',
            name: 'Sihan Sun',
            pictureUrl: null
          },
          {
            email: 'jiaqi.yang@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Database Schema',
            name: 'Jasky Yang',
            pictureUrl: null
          }
        ]
      },{
        timestamp: 1613906931,
        summaries: [
          {
            email: 'sihan.sun@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Finish the modal',
            name: 'Sihan Sun',
            pictureUrl: null
          },
          {
            email: 'jiaqi.yang@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Database Schema',
            name: 'Jasky Yang',
            pictureUrl: null
          }
        ]
      },{
        timestamp: 1613806931,
        summaries: [
          {
            email: 'sihan.sun@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Finish the modal',
            name: 'Sihan Sun',
            pictureUrl: null
          },
          {
            email: 'jiaqi.yang@yale.edu',
            isBlocked: false,
            prevWork: 'this is the prev work',
            block: 'N/A',
            planToday: 'Database Schema',
            name: 'Jasky Yang',
            pictureUrl: null
          }
        ]
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
        onPress={async () => {
          const summary = await this.fetchSummaryForUser(email);
          this.setState({selectedSummaries: [summary], modalVisible: true})
        }}
        image={imageUrl}
        title={name}
        description={email}
        secondaryImage={status}
        metaInfo={time}
      />
    )
  }

  renderPastRecords = ({ item }) => {
    const { timestamp, summaries } = item;
    const { day, time } = this.readTimestamp(timestamp);

    const documentIcon = require('../../assets/document.png');
    const viewIcon = require('../../assets/view.png');

    return (
      <RowTemplate
        onPress={() => {
          this.setState({ selectedSummaries: summaries, modalVisible: true});
        }}
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

  render() {
    const { isRefreshing, selectedSummaries, modalVisible } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {this.renderHeader()}
        {this.renderTabBar()}
        {this.renderMainSection()}
        <Modal
          animationType={"slide"}
          visible={modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <Summaries
            summaries={selectedSummaries}
            onRequestClose={() => {
              this.setState({ modalVisible: false, selectedSummaries: [] });
            }}
          />
        </Modal>
      </SafeAreaView>
    )
  }
}

export default HomeScreen;
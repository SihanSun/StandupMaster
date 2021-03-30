import React, { Component, useContext} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, FlatList, Modal, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons'; 

import RowTemplate from '../components/RowTemplate';
import Summaries from '../components/Summaries';
import styles from '../styles';
import { Context as SharedContext } from '../context/SharedContext';
import { getTeam } from '../api/teams';
import { getStatus } from '../api/userStatus';
const PROFILE_PICTURE_DEFAULT = require('../../assets/meeting.jpg');

const TEAM_INDEX= 0;
const RECORD_INDEX = 1;
const JOIN_ICON = require('../../assets/up-arrow.png');

class HomeScreen extends Component {

  static contextType = SharedContext;

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      selectedIndex: TEAM_INDEX,
      teamInfo: null,
      membersStatus: [],
      pastRecords: [],
      modalVisible: false,
      selectedSummaries: []
    };
  }

  componentDidMount() {
    this.fetchTeamInfo();
    this.fetchPastRecords();
  }

  fetchTeamInfo = async () => {
    this.setState({isRefreshing: true});
    const { state: { cognitoUser, userInfo }, setTeamInfo } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const teamId = userInfo.teamId;

    console.log(jwtToken);

    const teamInfo = await getTeam(jwtToken, teamId);
    setTeamInfo(teamInfo);

    this.setState({teamInfo});
    const members = teamInfo.members;
    
    const membersStatus = [];
    for (let i = 0; i < members.length; i = i+1) {
      const { email, profilePictureUrl, displayName, firstName, lastName } = members[i];
      const { presentation, isBlocked } = await getStatus(jwtToken, email);
      membersStatus.push({
        email,
        presentation,
        isBlocked,
        profilePictureUrl,
        displayName,
        firstName,
        lastName
      });
    }
    this.setState({membersStatus, isRefreshing: false});
  }

  fetchSummaryForUser = (email) => {
    const { membersStatus } = this.state;
    console.log(membersStatus);
    for (let i = 0; i < membersStatus.length; i = i+1) {
      const ms = membersStatus[i];
      if (ms.email === email) {
        const { presentation, isBlocked, profilePictureUrl, displayName } = ms;
        const { prevWork, block, planToday } = presentation

        return {
          id: email,
          prevWork,
          block,
          planToday,
          name: displayName,
          pictureUrl: profilePictureUrl
        } 
      }
    }

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
    const { navigation } = this.props;
    const { teamInfo } = this.state;
    const { membersStatus } = this.state;
    const totalNum = membersStatus.length;
    let blockedNum = 0;
    for (let i = 0; i < totalNum; i = i+1) {
      const { isBlocked } = membersStatus[i];
      if (isBlocked) {
        blockedNum += 1;
      }
    }
    const okNum = totalNum -blockedNum;

    const teamProfile = teamInfo ? { uri: teamInfo.profilePictureUrl } : PROFILE_PICTURE_DEFAULT
    const teamName = teamInfo ? teamInfo.name : '';
    const teamAnnouncement = teamInfo ? teamInfo.announcement : '';

    return (
      <View style={{marginHorizontal: 20, marginTop: 20, backgroundColor: 'white'}}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('TeamProfile')}
          style={{flexDirection: 'row', marginBottom: 10}}>
            <Image
              style={styles.largeImage}
              source={teamProfile}
            />
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.textLarge]}>{teamName}</Text>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{totalNum}</Text>
                <Text style={{fontSize: 16}}>Members</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{okNum}</Text>
                <Text style={{fontSize: 16}}>OK</Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{blockedNum}</Text>
                <Text style={{fontSize: 16}}>Blocked</Text>
              </View>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Feather name="more-vertical" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <View style={[{flex: 3, height: 80}, styles.textBox]}>
            <ScrollView>
              <Text>{teamAnnouncement}</Text>
            </ScrollView>
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
    // const { name, email, imageUrl, lastModified, isBlocked } = item;
    const { email, displayName, profilePictureUrl, isBlocked } = item;

    // const { time } = this.readTimestamp(lastModified);

    const status = isBlocked ? require('../../assets/delete.png') : require('../../assets/checkmark.png');
    return (
      <RowTemplate
        onPress={async () => {
          const summary = this.fetchSummaryForUser(email);
          this.setState({selectedSummaries: [summary], modalVisible: true})
        }}
        image={{uri: profilePictureUrl}}
        title={displayName}
        description={email}
        secondaryImage={status}
        metaInfo={null}
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
    const { membersStatus, pastRecords, selectedIndex } = this.state;

    const data = selectedIndex === TEAM_INDEX ? membersStatus : pastRecords;
    const renderFunc = selectedIndex === TEAM_INDEX ? this.renderTeamMember : this.renderPastRecords;
    return (
      <View style={{flex: 1, backgroundColor: '#fafafa'}}>
        <FlatList
          scrollEnabled={false}
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
        <ScrollView style={styles.mainUI}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={this.fetchTeamInfo}
            />}>
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
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default HomeScreen;
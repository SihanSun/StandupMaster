import React, { Component, useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, FlatList, Modal, RefreshControl } from 'react-native';
import { Context as SharedContext } from '../context/SharedContext';
import RowTemplate from '../components/RowTemplate';
import Summaries from '../components/Summaries';
import { getStatus } from '../api/userStatus';
import styles from '../styles';
import { db } from '../config';

class JoinMeetingScreen extends Component {

  static contextType = SharedContext;

  constructor(props) {
    super(props);

    this.state = {
      currentSpeaker: null,
      attendees: [],
      modalVisible: false,
      membersStatus: [],
      isRefreshing: false,
      selectedSummaries: []
    }
  }

  finishedSpeakerSet = new Set();

  componentDidMount() {
    this.initialize();
  }

  initialize = async () => {
    await this.fetchMembeStatus();
    await this.registerSelfToMeeting();
    await this.listenMeeintUpdate();
  }

  registerSelfToMeeting = async () => {
    const { state: { cognitoUser, userInfo, teamInfo }, setTeamInfo } = this.context;
    const email = userInfo.email;
    const teamId = userInfo.teamId;

    // TODO
    // use teamId as key and push email to the attendees list
    db.ref(`/${teamId}/attendees`).push(email);

    if (teamInfo.owner.email === userInfo.email) {
      // set current speaker to be this email (first speaker is the owner)
      db.ref(`/${teamId}/currentSpeaker`).set(email);
    }

  }

  listenMeeintUpdate = () => {
    const { state: { cognitoUser, userInfo, teamInfo }, setTeamInfo } = this.context;
    const email = userInfo.email;
    const teamId = userInfo.teamId;

    db.ref(`/${teamId}/currentSpeaker`).on('value', querySnapShot => {
      const currentSpeaker = querySnapShot.val();
      this.setState({currentSpeaker});
    });

    db.ref(`/${teamId}/attendees`).on('value', querySnapShot => {
      const data = querySnapShot.val();
      const attendees = []
      if (data) {
        for (const [key, value] of Object.entries(data)) {
          attendees.push({key, email: value});
        }
      }
      this.setState({attendees});
    })
  }


  isOwner = () => {
    const { state: { userInfo, teamInfo } } = this.context;
    return userInfo.email === teamInfo.owner.email;
  }

  onUserQuit = async () => {
    //TODO remove user from the attendee list, if lastone, remove current speaker
    if (this.isOwner()) {
      const { attendees } = this.state;
      if (attendees.length > 1) {
        return;
      }
    }

    const { state: {userInfo}} = this.context;
    const { attendees, currentSpeaker } = this.state;
    const teamId = userInfo.teamId;
    for (let i = 0; i < attendees.length; i += 1) {
      const {key, email} = attendees[i];
      if (email === userInfo.email) {
        db.ref(`${teamId}/attendees/${key}`).remove();
      }
    }

    if (currentSpeaker === userInfo.email) {
      db.ref(`${teamId}/currentSpeaker`).remove();
    }
    // goback
    this.props.navigation.goBack();
  }

  fetchMembeStatus = async () => {
    this.setState({isRefreshing: true});

    const { state: { cognitoUser, teamInfo } } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
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

  renderTeamMember = ({ item }) => {
    // const { name, email, imageUrl, lastModified, isBlocked } = item;
    const { email, displayName, profilePictureUrl, isBlocked } = item;


    const {currentSpeaker} = this.state;
    const status = isBlocked ? require('../../assets/delete.png') : require('../../assets/checkmark.png');
    if (email === currentSpeaker) {
      return (
        <View style={{borderWidth: 2, borderColor: '#599DFF'}}>
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
        </View>
      )
    } else {
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
  }

  renderHeader = () => {
    const { state: { teamInfo } } = this.context;

    const { membersStatus, attendees, currentSpeaker } = this.state;

    // get current speaker display name
    let speakerName = '';
    if (currentSpeaker) {
      for (let i = 0; i < membersStatus.length; i += 1) {
        const member = membersStatus[i];
        if (member.email === currentSpeaker) {
          speakerName = member.displayName;
        }
      }
    }

    const teamProfile = teamInfo ? { uri: teamInfo.profilePictureUrl } : PROFILE_PICTURE_DEFAULT
    const teamName = teamInfo ? teamInfo.name : '';

    return (
      <View style={{marginHorizontal: 20, marginTop: 20, backgroundColor: 'white'}}>
        <View
          style={{flexDirection: 'row', marginBottom: 10}}>
            <Image
              style={styles.largeImage}
              source={teamProfile}
            />
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.textLarge]}>{teamName}</Text>
            <View style={{marginTop: 5}}>
              <Text>There are {attendees.length} members in the meeting</Text>
            </View>
            <View style={{marginTop: 5}}>
              <Text>CurrentSpeaker is {speakerName}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  renderMainSection = () => {
    const { membersStatus, attendees } = this.state;
    const attendeesSet = new Set();
    for (let i = 0; i < attendees.length; i += 1) {
      const attendee = attendees[i].email;
      attendeesSet.add(attendee);
    }
    const data = [];
    for (let i = 0; i < membersStatus.length; i += 1) {
      const member = membersStatus[i];
      if (attendeesSet.has(member.email)) {
        data.push(member);
      }
    }

    return (
      <View style={{flex: 1, backgroundColor: '#fafafa'}}>
        <FlatList
          scrollEnabled={false}
          data={data}
          renderItem={this.renderTeamMember}
          keyExtractor={item => item.email}
        />
      </View>
    )
  }

  popcorn = () => {
    console.log('popcorn!');
    const { currentSpeaker } = this.state;
    if (currentSpeaker) {
      this.finishedSpeakerSet.add(currentSpeaker);
    }
    const { attendees } = this.state;
    const unspokenAttendees = [];
    for (let i = 0; i < attendees.length; i += 1) {
      const attendee = attendees[i].email;
      if (!this.finishedSpeakerSet.has(attendee)) {
        unspokenAttendees.push(attendee);
      }
    }

    const idx = Math.floor(Math.random() * unspokenAttendees.length);
    const chosenAttendee = unspokenAttendees[idx];
    this.setState({currentSpeaker: chosenAttendee});

    const { state: {teamInfo}} = this.context;
    const teamId = teamInfo.teamId;
    db.ref(`${teamId}/currentSpeaker`).set(chosenAttendee);
  }

  renderPopcorn = () => {
    const { state: {teamInfo, userInfo }} = this.context;
    if (userInfo.email === teamInfo.owner.email) {
      return (
        <View style={{borderTopWidth: 2, borderTopColor: '#f2f0eb'}}>
            <TouchableOpacity
              onPress={this.popcorn}
              style={{marginVertical: 10, marginHorizontal: 10, borderRadius: 10, 
              padding: 10, alignItems: 'center', 
              backgroundColor: '#599DFF'}}>
              <Text style={{fontSize: 20, color: 'white'}}>
                Popcorn
              </Text>
            </TouchableOpacity>
          </View>
      )
    } else {
      return null;
    }
  }

  render() {
    const { isRefreshing, selectedSummaries, modalVisible } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.mainUI}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => {}}
            />}>
              <View style = {{borderBottomColor: '#f2f0eb', borderBottomWidth: 3}}>
                {this.renderHeader()}
              </View>
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
        {this.renderPopcorn()}
        <View style={{borderTopWidth: 2, borderTopColor: '#f2f0eb'}}>
            <TouchableOpacity
              onPress={this.onUserQuit}
              style={{marginVertical: 10, marginHorizontal: 10, borderRadius: 10, 
              padding: 10, alignItems: 'center', 
              backgroundColor: '#599DFF'}}>
              <Text style={{fontSize: 20, color: 'white'}}>
                Quite Meeting
              </Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    )
  }
}

export default JoinMeetingScreen;
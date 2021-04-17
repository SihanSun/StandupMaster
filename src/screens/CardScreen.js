import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, FlatList, TouchableOpacity, AsyncStorage, Alert } from 'react-native';

import SingleEntryCard from '../components/SingleEntryCard';
import styles from '../styles';
import { Context as SharedContext } from '../context/SharedContext';
import { getStatus } from '../api/userStatus';
import { getUsers } from '../api/users';

const PREV_WORK = "prevWork";
const IS_BLOCKED = "isBlocked";
const BLOCK = "block";
const PLAN_TODAY = "planToday";
const UPLOAD_STATUS = "uploadStatus";
const UPLOADED = "uploaded";
const NOT_UPLOADED = "not uploaded"


class CardScreen extends Component {

  static contextType = SharedContext;

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      prevWork: '',
      isBlocked: false,
      block: '',
      planToday: '',
      uploaded: false
    }
  }

  componentDidMount() {
    this.fetchUserStatus();
  }

  fetchLocalContent = async (key) => {
    try {
      const val = await AsyncStorage.getItem(key);
      return val;
    } catch (error) {
      return null;
    }
  }

  storeToLocal = async (key, val, callback) => {
    try {
      await AsyncStorage.setItem(key, val);
      switch (key) {
        case PREV_WORK:
          this.setState({ prevWork: val }, () => {callback && callback});
          break;
        case BLOCK:
          this.setState({ block: val }, () => {callback && callback});
          break;
        case PLAN_TODAY:
          this.setState({ planToday: val }, () => {callback && callback});
          break;
      }
    } catch (error) {
      Alert('Save failed! Please try again.');
      console.log(error);
    }
  }

  fetchUserStatus = async () => {
    let prevWork = await this.fetchLocalContent(PREV_WORK);
    prevWork = prevWork ? prevWork : '';
    let isBlocked = await this.fetchLocalContent(IS_BLOCKED);
    isBlocked = isBlocked ? isBlocked : false;
    let block = await this.fetchLocalContent(BLOCK);
    block = block ? block : '';
    let planToday = await this.fetchLocalContent(PLAN_TODAY);
    planToday = planToday ? planToday : '';

    this.setState({ prevWork, isBlocked, block, planToday });

    const { state: { cognitoUser }, setUserStatus, setUserInfo } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const email = cognitoUser.attributes.email;

    const userStatus = await getStatus(jwtToken, email);

    userStatus && setUserStatus(userStatus);

    const userInfo = await getUsers(jwtToken, email);
    userInfo && setUserInfo(userInfo);

    this.checkMatch();
  }

  renderHeader = () => {
    const { isBlocked } = this.state;

    const { state: { userInfo }} = this.context;
    const { profilePictureUrl, displayName } = userInfo;
    const pictureSrc = {uri: profilePictureUrl}
    return (
      <View style={{margin: 20, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{alignItems: 'center'}}>
            <Image
              testID="picture"
              style={styles.largeImage}
              source={pictureSrc}
            />
            <Text style={{fontSize: 20, marginTop: 5}}>{displayName}</Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => {
                this.setState({isBlocked: false})
              }}
              style={{
                backgroundColor: isBlocked ? '#f2f0eb' : '#599DFF',
                padding:12, borderColor: '#f2f0eb', 
                borderWidth: 1, borderTopLeftRadius: 10, 
                borderBottomLeftRadius: 10, width: 100, alignItems: 'center'}}
            >
              <Text style={[{color: isBlocked ? 'black' : 'white'}, styles.textRegular]}>OK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({isBlocked: true})
              }}
              style={{
                backgroundColor: isBlocked ? '#599DFF' : '#f2f0eb',
                padding:12, borderColor: '#f2f0eb', 
                borderWidth: 1, borderLeftWidth: 0, borderTopRightRadius: 10, 
                borderBottomRightRadius: 10, width: 100, alignItems: 'center'}}
            >
              <Text style={[{color: isBlocked ? 'white' : 'black'}, styles.textRegular]}>Blocked</Text>
            </TouchableOpacity>
  
          </View>
          
        </View> 
      </View>
    )
  }

  checkMatch = () => {
    const { prevWork, isBlocked, block, planToday } = this.state;

    const { state: {userStatus} } = this.context;
    let uploaded = false;
    if (userStatus) {
      const { presentation } = userStatus;
      uploaded = prevWork === presentation.prevWork 
        && block === presentation.blockedBy && planToday === presentation.planToday
        && isBlocked === userStatus.isBlocked;
    } 
    this.setState({uploaded});
  }

  onSave = (name, value) => {
    this.storeToLocal(name, value);
    this.setState({uploaded: false});
  } 

  renderCard = ({item}) => {
    const { navigation } = this.props;
    const property = {
      name: item.key,
      value: item.content
    };
    const limit = {
      shouldLimit: false
    }
    return (
      <SingleEntryCard
        title={item.title}
        content={item.content}
        onPress={() => {navigation.navigate('EditProperty', { property, limit, onSave: (val) => this.onSave(item.key, val) })}}
      />
    )
  }

  upload = async () => {
    // TODO
    const { state: {cognitoUser}, uploadUserStatus } = this.context;
    const jwtToken = cognitoUser.signInUserSession.idToken.jwtToken;
    const email = cognitoUser.attributes.email;
    const { isBlocked, prevWork, block, planToday } = this.state;
    const data = {
      email,
      isBlocked, 
      presentation: {
        prevWork,
        blockedBy: block,
        planToday
      }
    }
    await uploadUserStatus(jwtToken, data);
    this.setState({uploaded: true});
  }

  render() {
    const { prevWork, isBlocked, block, planToday } = this.state;
    const { uploaded } = this.state;
    const data = [
      {
        key: PREV_WORK,
        title: 'What did I do?',
        content: prevWork
      }
    ];
    if (isBlocked) {
      data.push({
        key: BLOCK,
        title: 'Any blocks?',
        content: block
      });
    }
    data.push({
      key: PLAN_TODAY,
      title: "What's my plan for today?",
      content: planToday
    });

    const disableUpload = uploaded ? true : false;
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={styles.mainUI}>
          <View style={{borderBottomColor: '#f2f0eb', borderBottomWidth: 2}}>
            {this.renderHeader()}
          </View>
          <FlatList
            style={styles.cardContainer}
            data={data}
            renderItem={this.renderCard}
            keyExtractor={(item) => item.key}
          />
          <View style={{borderTopWidth: 2, borderTopColor: '#f2f0eb'}}>
            <TouchableOpacity
              testID="upload"
              onPress={this.upload}
              disabled={disableUpload}
              style={{marginVertical: 20, marginHorizontal: 20, borderRadius: 10, 
              padding: 10, alignItems: 'center', 
              backgroundColor: disableUpload ?  '#f2f0eb' : '#599DFF'}}>
              <Text style={{fontSize: 20, color: 'white'}}>
                {disableUpload ? 'Uploaded' : 'Upload'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

export default CardScreen;
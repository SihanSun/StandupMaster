import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, FlatList, Button, TouchableOpacity, AsyncStorage, Alert } from 'react-native';

import EditCard from '../components/EditCard';
import SingleEntryCard from '../components/SingleEntryCard';
import styles from '../styles';

const PREV_WORK = "prevWork";
const IS_BLOCKED = "isBlocked";
const BLOCK = "block";
const PLAN_TODAY = "planToday";

class CardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      prevWork: '',
      isBlocked: false,
      block: '',
      planToday: ''
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

  storeToLocal = async (key, val) => {
    try {
      await AsyncStorage.setItem(key, val);
      switch (key) {
        case PREV_WORK:
          this.setState({ prevWork: val });
          break;
        case BLOCK:
          this.setState({ block: val });
          break;
        case PLAN_TODAY:
          this.setState({ planToday: val });
          break;
      }
    } catch (error) {
      Alert('Save failed! Please try again.');
      console.log(error);
    }
  }

  fetchUserStatus = async () => {
    const prevWork = await this.fetchLocalContent(PREV_WORK);
    const isBlocked = await this.fetchLocalContent(IS_BLOCKED);
    const block = await this.fetchLocalContent(BLOCK);
    const planToday = await this.fetchLocalContent(planToday);

    this.setState({ prevWork, isBlocked, block, planToday });
  }

  renderHeader = () => {
    const { isBlocked } = this.state;
    return (
      <View style={{margin: 20, backgroundColor: 'white'}}>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={styles.largeImage}
              source={require('../../assets/pokemon.png')}
            />
            <Text style={{fontSize: 20, marginTop: 5}}>Sihan Sun</Text>
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

  renderCard = ({item}) => {
    const { navigation } = this.props;
    const property = {
      name: item.key,
      value: item.content
    };
    const limit = {
      shouldLimit: false
    }
    const onSave = ({name, value}) => {
      this.storeToLocal(name, value);
    }
    return (
      <SingleEntryCard
        title={item.title}
        content={item.content}
        onPress={() => {navigation.navigate('EditProperty', { property, limit, onSave })}}
      />
    )
  }

  render() {
    const { prevWork, isBlocked, block, planToday } = this.state;
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
    return (
      <SafeAreaView style={[styles.container]}>
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
            style={{marginVertical: 20, marginHorizontal: 20, borderRadius: 10, 
            padding: 10, alignItems: 'center', backgroundColor: '#599DFF'}}>
            <Text style={{fontSize: 20, color: 'white'}}>Upload</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

export default CardScreen;
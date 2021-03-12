import React, { Component } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import EditCard from '../components/EditCard';
import styles from '../styles';

class CardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      whatDidIDo: '',
      anyBlocks: '',
      planToday: '',
      isBlocked: false
    }
  }

  componentDidMount() {

  }

  fetchUserCard = async () => {
    const cards = [
      {
        title: 'What did I do?',
        content: 'I finished the homescreen yesterday'
      }, {
        title: 'Any blocks?',
        content: 'Setting up eslint cause error when building'
      }, {
        title: 'What is my plan today?',
        content: 'Working on the card page'
      }
    ];

    const whatDidIDo = cards[0].content;
    const anyBlocks = cards[1].content;
    const planToday = cards[2].content;

    this.setState({ whatDidIDo, anyBlocks, planToday });
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

  renderBlockedCard = () => {
    const { isBlocked } = this.state;
    if (isBlocked) {
      return (
        <EditCard
          title="Any blocks?"
        />
      ); 
    } else {
      return null;
    }
  }

  render() {
    const {isBlocked} = this.state;
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={{borderBottomColor: '#f2f0eb', borderBottomWidth: 2}}>
          {this.renderHeader()}
        </View>
        <ScrollView style={{backgroundColor: '#fafafa', flex: 1}}>
          <EditCard
            title="What did I do?"
          />
          {this.renderBlockedCard()}
          <View style={{marginBottom: 20}}>
            <EditCard
              title="What's my plan for today?"
            />
          </View>
        </ScrollView>
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
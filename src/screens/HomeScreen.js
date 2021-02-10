import React, { Component } from 'react';
import { View, Text, SafeAreaView} from 'react-native';

import styles from '../styles';

const TEAM_INDEX= 0;
const RECORD_INDEX = 1;
const CARD_INDEX = 2;

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

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Home Screen</Text>
      </SafeAreaView>
    )
  }
}

export default HomeScreen;
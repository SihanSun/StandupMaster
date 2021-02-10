import React, { useContext } from 'react';
import { View, Text, SafeAreaView} from 'react-native';

import styles from '../styles';

const CardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Card Screen</Text>
    </SafeAreaView>
  )
}

export default CardScreen;
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styles from '../styles';

const SingleEntryCard = ({ title, content, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardStyle} onPress={onPress}>
      <View style={{padding: 10, borderBottomColor: '#f2f0eb', borderBottomWidth: 2, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.textLarge, { fontWeight: 'bold' }]}>{title}</Text>
        <View style={{marginLeft: 'auto', justifyContent: 'center'}}>
          <Feather name="more-horizontal" size={16} color="black" />
        </View>
      </View>
      <View style={{padding: 10, minHeight: 60}}>
        <Text style={[styles.textLarge]}>{content}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SingleEntryCard;
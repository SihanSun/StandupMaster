import React from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import SummaryCard from './SummaryCard';
import styles from '../styles';


const Summaries = ({ summaries, onRequestClose }) => {

  const renderSummaryCard = ({item}) => {
    const { id, isBlocked, prevWork, block, planToday, name, pictureUrl } = item;
    return (
      <SummaryCard
        isBlocked={isBlocked}
        prevWork={prevWork}
        block={block}
        planToday={planToday}
        name={name}
        pictureUrl={pictureUrl}
      />
    )
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableOpacity 
        onPress={onRequestClose}
        style={styles.modalHeader}>
        <AntDesign name="down" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.cardContainer}>
        <FlatList
          data={summaries}
          keyExtractor={item => item.id}
          renderItem={renderSummaryCard}
        />
      </View>
    </SafeAreaView>
  )
}

export default Summaries;
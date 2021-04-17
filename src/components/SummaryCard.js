import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from '../styles';

const PROFILE_PICTURE_DEFAULT = require('../../assets/person.png');
const BLOCKED_ICON = require('../../assets/delete.png');
const OK_ICON = require('../../assets/checkmark.png');

const SummaryCard = ({ isBlocked, prevWork, block, planToday, name, pictureUrl }) => {
  return (
    <View style={styles.cardStyle}>
      <View style={{padding: 10, borderBottomColor: '#f2f0eb', borderBottomWidth: 2, flexDirection: 'row', alignItems: 'center'}}>
        <Image 
          style={styles.smallImage}
          source={pictureUrl ? { uri: pictureUrl } : PROFILE_PICTURE_DEFAULT}
        />
        <View testID="name" style={{marginLeft: 20}}>
          <Text style={styles.textLarge}>{name}</Text>
        </View>
        <Image 
          style={[{marginLeft: 'auto'}, styles.xsmallImage]}
          source={ isBlocked ? BLOCKED_ICON : OK_ICON}/>
      </View>
      <View testID="prevWork" style={{padding: 10, borderBottomColor: '#f2f0eb', borderBottomWidth: 2}}>
        <Text style={[styles.textLarge]}>Finished Work</Text>
        <Text style={[styles.textRegular]}>{prevWork}</Text>
      </View>
      <View testID="blocks" style={{padding: 10, borderBottomColor: '#f2f0eb', borderBottomWidth: 2}}>
        <Text style={[styles.textLarge]}>Blocks</Text>
        <Text style={[styles.textRegular]}>{block}</Text>
      </View>
      <View testID="planToday" style={{padding: 10}}>
        <Text style={[styles.textLarge]}>Plans Today</Text>
        <Text style={[styles.textRegular]}>{planToday}</Text>
      </View>
    </View>
  );
}

export default SummaryCard;
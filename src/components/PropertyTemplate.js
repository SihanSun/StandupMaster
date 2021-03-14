import React from 'react';
import { View, Text, TouchableOpacity, Image} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styles from '../styles';

const PropertyTemplate = ({name, value, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.rowContainer]}
    >
      <View style={{justifyContent: 'center'}}>
        <Text style={[styles.textLarge,]}>{name}</Text>
      </View>
      <View style={{marginLeft: 'auto', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={[styles.textRegular]}>{value}</Text>
        <View style={{marginLeft: 5}}>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PropertyTemplate;
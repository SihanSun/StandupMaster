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
      <Text numberOfLines={1} style={[styles.textRegular, {marginLeft: 'auto', maxWidth: '50%'}]}>{value}</Text>
      {
        onPress ? (
          <View style={{marginLeft: 5}}>
            <AntDesign name="right" size={24} color="black" />
          </View>
        ) : null
      }
    </TouchableOpacity>
  )
}

export default PropertyTemplate;
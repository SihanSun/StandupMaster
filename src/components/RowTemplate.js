import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../styles';

const RowTemplate = ({
  onPress,
  topBorder, 
  bottomBorder, 
  image, 
  imageStyle,
  title, 
  description, 
  secondaryImage, 
  metaInfo}) => {
    return (
      <TouchableOpacity 
        onPress={onPress}
        style={{
          backgroundColor: 'white',
          borderBottomWidth: bottomBorder ? 2 : 0, 
          borderTopWidth: topBorder ? 2 : 0,
          borderColor: '#f2f0eb',
          flexDirection: 'row', 
          height: 80, alignItems: 'center', paddingHorizontal: 20}}>
        <Image
          style={[styles.mediumImage, {borderWidth: 1, borderColor: 'black'}, imageStyle]}
          source={image}
        />
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>{title}</Text>
          <Text>{description}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            style={[styles.xsmallImage, {marginLeft: 'auto'}]}
            source={secondaryImage}
          />
          <Text style={{marginLeft: 'auto'}}>{metaInfo}</Text>
        </View>
      </TouchableOpacity>
    )
}

export default RowTemplate;
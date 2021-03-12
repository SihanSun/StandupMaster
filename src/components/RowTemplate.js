import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import styles from '../styles';

const RowTemplate = ({
  onPress,
  image, 
  imageStyle,
  title, 
  description, 
  secondaryImage, 
  metaInfo}) => {
    return (
      <TouchableOpacity 
        onPress={onPress}
        style={styles.rowContainer}>
        <Image
          style={[styles.mediumImage, {borderWidth: 1, borderColor: 'black'}, imageStyle]}
          source={image}
        />
        <View style={{marginLeft: 20, justifyContent: 'center'}}>
          <Text style={styles.textLarge}>{title}</Text>
          <Text style={styles.textRegular}>{description}</Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            style={[styles.xsmallImage, {marginLeft: 'auto'}]}
            source={secondaryImage}
          />
          <Text style={[{marginLeft: 'auto'}, styles.textRegular]}>{metaInfo}</Text>
        </View>
      </TouchableOpacity>
    )
}

export default RowTemplate;
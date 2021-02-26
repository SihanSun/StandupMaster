import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  largeImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'black',
    resizeMode: 'cover'
  },
  mediumImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover'
  },
  smallImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover'
  },
  xsmallImage: {
    width: 20,
    height: 20,
    borderRadius: 10,
    resizeMode: 'cover'
  },
  textBox: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 10
  }
})
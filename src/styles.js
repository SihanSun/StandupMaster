import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainUI: {
    backgroundColor: 'white',
    flex: 1
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
  textSmall: {
    fontSize: 10
  },
  textRegular: {
    fontSize: 14
  },
  textLarge: {
    fontSize: 20
  },
  cardContainer: {
    flex: 1, 
    backgroundColor: '#fafafa', 
    padding: 5
  },
  cardStyle: {
    margin: 5,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#f2f0eb',
    borderRadius: 10,
    borderWidth: 2
  },
  textBox: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    padding: 10
  },
  rowContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 2, 
    borderColor: '#f2f0eb',
    flexDirection: 'row', 
    height: 80, 
    alignItems: 'center', 
    paddingHorizontal: 20
  },
  modalHeader: {
    alignItems: 'center', 
    padding: 10,
    paddingHorizontal: 10, 
    width: '100%',
    backgroundColor: '#599DFF', 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    borderBottomColor: '#f2f0eb'
  }
})
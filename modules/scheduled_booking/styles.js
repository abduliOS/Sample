import { StyleSheet, Dimensions } from "react-native";

let width = Dimensions.get('screen').width/2 - 8
let height = Dimensions.get('screen').height/2.3

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    borderRadius: 5, paddingBottom: 15
  },
  movieItemView: {
    width:width, height:height, margin: 4, elevation: 50
  },
  itemTitleText:{
    fontSize: 20,
    color: '#ced2c3',
    fontWeight: '200'
  },
  itemInfoText: {
    fontSize: 16,
    color: '#ced2c3',
    marginTop: 3
  },
  coverImage: {
    flex: 1,
    borderRadius: 10
 },
  
}));

import { StyleSheet, Dimensions } from "react-native";
import * as AppColors from '../AppColors'

let width = Dimensions.get('screen').width/2 - 8
let height = Dimensions.get('screen').height/2.3

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    flex: 1.0
  },
  movieItemView: {
    width:width, height:height, margin: 4, elevation: 50
  },
  searchContainer: { flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, marginLeft: 10, marginRight: 10, opacity: 0.8, backgroundColor: AppColors.DARK_PURPLE },
  searchTextInput: { backgroundColor: 'transparent', flex: 1, color: AppColors.WHITE },
  searchIcon: { width: 20, height: 20, alignSelf: 'center' },
  searchList: { justifyContent: 'space-between' }
  
}));

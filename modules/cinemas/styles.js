import { StyleSheet, Dimensions } from "react-native";
import * as AppColors from '../AppColors'

export default (styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gridContainer: {
    flex: 1.0
  },
  venueItemView: {
    flexDirection: 'row', borderBottomWidth: 0.2, paddingTop: 10, paddingBottom: 10
  },
  venueItemText: { color: '#5c4a5c', fontSize: 15, marginTop: 10 },
  searchContainer: { flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, marginLeft: 10, marginRight: 10, opacity: 0.8, backgroundColor: AppColors.DARK_PURPLE },
  searchTextInput: { backgroundColor: 'transparent', flex: 1, color: AppColors.WHITE },
  searchIcon: { width: 20, height: 20, alignSelf: 'center' },
  searchList: { flex: 1, paddingLeft: 10, paddingRight: 10 },
  venueHeader: { padding: 20, backgroundColor: '#645168' },
  venueHeaderText: { textAlign: 'center', fontSize: 20, color: '#fff' },
  bodyContainer: { padding: 10 },
  showDatesContainer: { height: 70 },
  showContainer: { width: '100%', height: 1, backgroundColor: '#5c4a5c', marginTop: 10 },
  movieInfoContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  movieInfoText: { color: '#5c4a5c', fontSize: 15, marginTop: 10 },
  showTimeContainer: { flexDirection: 'row' }

}));

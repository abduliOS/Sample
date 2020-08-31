import { StyleSheet, Dimensions } from "react-native";
import * as AppColors from '../AppColors'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default (styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center'
  },
  popularCitiesItemContainer: {
    flex: 0.85, marginTop: 10
  },
  sectionHeaderContainer: {
    flexDirection: 'row', borderRadius: 0, borderWidth: 0.5, borderColor: AppColors.DARK_PURPLE, paddingLeft: 10, paddingRight: 10, paddingTop: 15, paddingBottom: 15
  },
  sectionHeaderIconView: {
    flex: 0.1, justifyContent: 'center'
  },
  sectionHeaderTitleView: {
    flex: 0.8, justifyContent: 'center'
  },
  sectionHeaderIcon: {
    width: 25, height: 25, alignSelf: 'center'
  },
  sectionHeaderText: {
    color: AppColors.SHADE_GREEN, textAlign: 'center', fontSize: 16
  },
  popularCityContainer: {
    flex: 1, flexDirection: 'row'
  },
  popularCityView: {
    justifyContent: 'center', margin: 8
  },
  popularCityIconView: {
    flex: 1, backgroundColor: AppColors.WHITE, opacity: 0.3, borderRadius: 5, justifyContent: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10
  },
  popularCityIcon: {
    width: 40, height: 40, alignSelf: 'center'
  },
  popularCityText: {
    marginTop: 5, textAlign: 'center', color: AppColors.DARK_PURPLE, fontSize: 15
  },
  cityListContainer: {
    flex: 1
  },
  cityListItem: {
    padding: 5, opacity: 0.8, borderRadius: 5
  },
  cityListItemText: {
    fontSize: 20, color: AppColors.WHITE, paddingBottom: 5
  },
  searchTextInput: {
    color: AppColors.SHADE_GREEN, fontSize: 16, height: screenWidth / 10
  },
  searchBackIcon: {
    width: screenWidth / 15, height: screenWidth / 15, alignSelf: 'center'
  },
  noNetworkIcon: { width: '100%', height: screenWidth / 3, alignSelf: 'center' },
  noNetworkText: { textAlign: 'center', marginTop: 50, fontSize: screenWidth / 20 },
  tryAgainText: { textAlign: 'center', marginTop: 50, fontSize: screenWidth / 18, fontWeight: '500' },
  tryAgainView: { padding: 10 },
  otherCityItemView: { height: 0.5, backgroundColor: AppColors.DARK_PURPLE },
  otherCitiesErrContainer: { padding: 20 },
  otherCitiesErrText: { textAlign: 'center', fontSize: 20 },
  otherCitiesList: { paddingLeft: 10, paddingRight: 10, paddingTop: 10 },
  popularCityList: { marginTop: 10 }

}));


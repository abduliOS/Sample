import { StyleSheet, Dimensions } from "react-native";

let width = Dimensions.get('screen').width
let height = Dimensions.get('screen').height

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  popularCitiesItemContainer: {
    flex: 0.85, marginTop: 10
  },
  sectionHeaderContainer: {
    flexDirection: 'row', borderRadius: 0, borderWidth: 0.5, borderColor: '#5d515b', paddingLeft: 10, paddingRight: 10, paddingTop: 10, paddingBottom: 10
  },
  sectionHeaderIconView: {
    flex: 0.1, justifyContent: 'center'
  },
  sectionHeaderTitleView: {
    flex: 0.8, justifyContent: 'center'
  },
  sectionHeaderIcon: {
    width: 20, height: 20, alignSelf: 'center'
  },
  sectionHeaderText: {
    color: '#cdd2c2', textAlign: 'center', fontSize: 16
  },
  popularCityContainer: {
    flex: 1, flexDirection: 'row'
  },
  popularCityView: {
    justifyContent: 'center', margin: 8
  },
  popularCityIconView: {
    flex: 1, backgroundColor: '#fff', opacity: 0.3, borderRadius: 5, justifyContent: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 10, paddingBottom: 10
  },
  popularCityIcon: {
    width: 40, height: 40, alignSelf: 'center'
  },
  popularCityText: {
    marginTop: 5, textAlign: 'center', color: '#493a4b', fontSize: 15
  },
  cityListContainer: {
    flex: 1
  },
  cityListItem: {
    padding: 15, opacity: 0.8
  },
  drawerItem: {
    padding: 15, flexDirection: 'row', justifyContent: 'space-between'
  },
  drawerItemText: {
    fontSize: 20, color: '#cfd3c4', paddingBottom: 5
  },
  cityListItemText: {
    fontSize: 20, color: '#cfd3c4', paddingBottom: 5
  },
  bottomOptionText: {
    fontSize: 12, color: '#cfd3c4', paddingBottom: 5, textDecorationLine: 'underline'
  },
  bottomSignUpContainer: {
    padding: 15, opacity: 0.8, backgroundColor: '#6d5d6d'
  },
  bottomSignUpText: {
    fontSize: 20, color: '#cfd3c4', textAlign: 'center'
  },
  nameCardContainer: {
    height: '15%', justifyContent: 'center', padding: 15
  },
  nameCardTxt1: {
    fontSize: width / 30, color: '#cfd3c4'
  },
  nameCardTxt2: {
    fontSize: width / 20, color: '#cfd3c4'
  }

}));


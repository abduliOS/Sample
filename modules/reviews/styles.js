import { StyleSheet } from "react-native";

export default (styles = StyleSheet.create({
  container: {
     flex: 1,
  },
  popularCitiesItemContainer: {
    flex: 0.85, marginTop: 10
  },
  sectionHeaderContainer: {
     flexDirection: 'row', borderRadius: 0, borderWidth: 0.5, borderColor: '#5d515b',  paddingLeft: 10, paddingRight: 10, paddingTop: 15, paddingBottom: 15
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
    padding: 5, opacity: 0.8, borderRadius: 5
  },
  cityListItemText: {
    fontSize: 20, color: '#fff', paddingBottom: 5
  }
  
}));


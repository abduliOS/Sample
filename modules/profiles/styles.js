import { StyleSheet, Dimensions } from "react-native";

let screenWidth = Dimensions.get('screen').width / 2 - 8
let screenHeight = Dimensions.get('screen').height / 2.3

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    borderRadius: 5, padding: 15, elevation: 5
  },
  preferenceContainer: {
    padding: 15, marginTop: 0, marginLeft: 10, marginRight: 10, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, elevation: 2
  },
  headerTitle: { fontSize: screenWidth / 10, textAlign: 'center', color: '#ced2c3', elevation: 10 },
  profileItemContainer: { marginTop: 10 },
  profileLabel: { fontSize: screenWidth / 12, color: '#ced2c3', opacity: 0.8 },
  profileValue: { fontSize: screenWidth / 10, color: '#fff', opacity: 0.8, marginTop: 5, marginBottom: 5 },
  profileValueInput: { fontSize: screenWidth / 10, color: '#fff', opacity: 0.8 },
  profileView: { height: 0.5, backgroundColor: '#cfd3c4' },
  cancelText: { fontSize: screenWidth / 12, color: '#ced2c3', opacity: 0.8 },
  saveText: { fontSize: screenWidth / 12, color: '#ced2c3', opacity: 0.8 },
  editIcon: { width: screenWidth / 10, height: screenWidth / 10, tintColor: '#fff' },

}));

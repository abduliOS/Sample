import { StyleSheet, Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default (styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  logoIcon: { width: '100%', height: 100, alignSelf: 'center' },
  noNetworkText: { textAlign: 'center', marginTop: 50, fontSize: screenWidth / 20 },
  tryAgainText: { textAlign: 'center', marginTop: 50, fontSize: screenWidth / 18, fontWeight: '500' },
  tryAgainView: { padding: 10 },
}));


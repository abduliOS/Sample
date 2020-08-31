import { StyleSheet, Dimensions } from "react-native";
import * as AppColors from '../AppColors'

let width = Dimensions.get('screen').width / 2 - 8
let height = Dimensions.get('screen').height / 2.3

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    flex: 1.0, marginTop: 10
  },
  movieItemView: {
    width: width, height: height, margin: 4, elevation: 50
  },
  headerText: { fontSize: 18, color: AppColors.SHADE_GREEN },
  noNetworkText: { textAlign: 'center', marginTop: 50, fontSize: screenWidth / 20 },
  statusContainer: { justifyContent: 'center', flex: 1, padding: 20 },
  exitContainer: { justifyContent: 'center', flex: 1 },
  exitGradientContainer: { borderRadius: 10, padding: 20 },
  exitTextContainer: { marginLeft: 15 },
  exitText: { fontSize: 18, color: AppColors.WHITE },
  exitButtonView: { alignSelf: 'center', marginTop: 20, backgroundColor: AppColors.SHADE_GREEN, borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '45%' },
  exitButtonText: { textAlign: 'center', color: AppColors.DARK_PURPLE },
  exitButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  movieList: { justifyContent: 'space-between' },
  movieHeaderContainer: { flexDirection: 'row', justifyContent: 'space-between', marginLeft: 15, marginRight: 15 },
  locationContainer: { flexDirection: 'row' }

}));

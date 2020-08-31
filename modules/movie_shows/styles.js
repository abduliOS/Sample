import { StyleSheet, Dimensions } from "react-native";
import * as AppColors from '../AppColors'

let width = Dimensions.get('screen').width
let height = Dimensions.get('screen').height

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  showDateError: { fontSize: 15, width: '100%', alignContent: 'center', textAlign: 'center' },
  gridContainer: {
    flex: 1.0
  },
  venueItemView: {
    flexDirection: 'row', borderBottomWidth: 0.2, paddingTop: 10, paddingBottom: 10
  },
  venueItemText: { color: AppColors.DARK_PURPLE, fontSize: 15, marginTop: 10 },
  statusDescText: { textAlign: 'center', fontSize: 18, color: AppColors.DARK_PURPLE, marginTop: 40 },
  seatCountContainer: { justifyContent: 'center' },
  seatCountGradientContainer: { borderRadius: 10, padding: 20 },
  seatCountHeaderView: { flexDirection: 'row', justifyContent: 'center' },
  seatCountBackContainer: { flex: 0.2, alignSelf: 'center' },
  seatCountBackIcon: { width: 25, height: 25, tintColor: AppColors.WHITE },
  seatCountText: { flex: 0.6, textAlign: 'center', fontSize: 18, color: AppColors.SHADE_GREEN, alignSelf: 'center', justifyContent: 'center' },
  seatCountListContainer: { flexDirection: 'row', marginTop: 40, justifyContent: 'center' },
  seatItemContainer: { width: 25, height: 25, marginLeft: 2, borderRadius: 5, justifyContent: 'center', elevation: 5 },
  seatItemText: { fontSize: 12, textAlign: 'center' },
  seatCountButtonContainer: { alignSelf: 'center', marginTop: 40, backgroundColor: AppColors.SHADE_GREEN, borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' },
  seatCountButtonText: { textAlign: 'center', color: AppColors.DARK_PURPLE },
  showsItemView: { width: '100%', height: 1, backgroundColor: AppColors.DARK_PURPLE, marginTop: 10 },
  showsItemText: { color: AppColors.DARK_PURPLE, fontSize: 15, marginTop: 10 },
  showsTimeContainer: { flexDirection: 'row' },
  spButtonContainer: { alignSelf: 'center', marginTop: 20, marginBottom: 20, backgroundColor: AppColors.SHADE_GREEN, borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' },
  spButtonText: { textAlign: 'center', color: AppColors.DARK_PURPLE },
  venueList: { flex: 1, paddingLeft: 10, paddingRight: 10 },
  sDContainer: { justifyContent: 'center' },
  sDGradientContainer: { borderRadius: 10, padding: 20 },
  sDHeaderContainer: { flexDirection: 'row', justifyContent: 'center' },
  sDBackContainer: { flex: 0.2, alignSelf: 'center' },
  sDBackIcon: { width: 25, height: 25, tintColor: AppColors.SHADE_WHITE },
  sDHeaderText: { flex: 0.6, textAlign: 'center', fontSize: 18, color: AppColors.SHADE_GREEN, alignSelf: 'center', justifyContent: 'center' },
  sDHeaderRightView: { flex: 0.2 },
  sDSeatContainer: { flexDirection: 'row', marginTop: 40, justifyContent: 'center' },
  sDNextBtnContainer: { alignSelf: 'center', marginTop: 40, backgroundColor: AppColors.SHADE_GREEN, borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' },
  sDNextBtnText: { textAlign: 'center', color: AppColors.DARK_PURPLE },
  sDSeatIconContainer: { width: 25, height: 25, marginLeft: 2, borderRadius: 5, justifyContent: 'center', elevation: 5 },
  sDSeatIconText: { fontSize: 12, textAlign: 'center' }
}));

import { StyleSheet, Dimensions } from "react-native";
import * as AppColors from '../AppColors'

let width = Dimensions.get('screen').width / 2 - 8
let height = Dimensions.get('screen').height / 2.3

export default (styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loginBtnContainer: {
    backgroundColor: AppColors.SHADE_GREEN,
    borderRadius: 2,
    width: '80%',
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'center',
    paddingTop: 8,
    paddingBottom: 8
  },
  rateMovieText: {
    fontSize: 15,
    textAlign: 'center'
  },
  summaryLabelContainer: { marginLeft: 15 },
  summaryLabel: { fontSize: 15, color: AppColors.SHADE_GREEN, marginTop: 5 },
  summaryHeaderLabel: { flex: 0.6, fontSize: 18, color: AppColors.SHADE_GREEN, alignSelf: 'center', justifyContent: 'center' },
  seatBackground: { width: 25, height: 25, marginLeft: 5, borderRadius: 5, justifyContent: 'center', elevation: 5 },
  seatCountContainer: { justifyContent: 'center' },
  seatCountGradientContainer: { borderRadius: 10, padding: 20 },
  seatCountHeaderView: { flexDirection: 'row', justifyContent: 'center' },
  seatCountBackContainer: { flex: 0.2, alignSelf: 'center' },
  seatCountBackIcon: { width: 25, height: 25, tintColor: AppColors.SHADE_WHITE },
  seatCountText: { flex: 0.6, textAlign: 'center', fontSize: 18, color: AppColors.SHADE_GREEN, alignSelf: 'center', justifyContent: 'center' },
  seatCountListContainer: { flexDirection: 'row', marginTop: 40, justifyContent: 'center' },
  seatCountItemContainer: { width: 25, height: 25, marginLeft: 2, borderRadius: 5, justifyContent: 'center', elevation: 5 },
  seatCountItemText: { fontSize: 12, textAlign: 'center' },
  innerViewContainer: { flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10 },
  headerContainer: { borderRadius: 10, padding: 10, flexDirection: 'row', justifyContent: 'center', backgroundColor: AppColors.DARK_PURPLE, borderWidth: 0.5, borderColor: AppColors.DARK_PURPLE, elevation: 5 },
  backIconContainer: { alignItems: 'center' },
  backIcon: { width: 30, height: 30, tintColor: AppColors.SHADE_WHITE },
  headerInfoContainer: { flexDirection: 'column', flex: 1, marginLeft: 10 },
  headerInfoText: { color: AppColors.SHADE_GREEN },
  scButtonContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  scText: { color: AppColors.DARK_PURPLE },
  scTextContainer: { borderRadius: 5, backgroundColor: AppColors.SHADE_GREEN, padding: 5 },
  seatText: { marginLeft: 5, color: AppColors.SHADE_GREEN },
  showDatesContainer: { flexDirection: 'row', height: 60, alignSelf: 'center', marginTop: 10 },
  showTimeConatiner: { flexDirection: 'row', marginTop: 10  },
  showTimeView: { width: '60%', height: 2, marginTop: 0.5, backgroundColor: AppColors.DARK_PURPLE, alignSelf: 'center', borderRadius: 10 },
  paymentButtonContainer: { paddingTop: 20, paddingBottom: 20, backgroundColor: AppColors.DARK_PURPLE },
  ticketDialogBtnContainer: { alignSelf: 'center', marginTop: 40, backgroundColor: AppColors.SHADE_GREEN, borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' },
  ticketDialogBtn: { textAlign: 'center', color: AppColors.DARK_PURPLE },
  summaryDialogContainer: { justifyContent: 'center', flex: 1 },
  summaryDialogGradientContainer: { borderRadius: 10, padding: 20 },
  summaryBtnContainer: { alignSelf: 'center', marginTop: 20, backgroundColor: AppColors.SHADE_GREEN, borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' },
  summaryBtnText: { textAlign: 'center', color: AppColors.DARK_PURPLE },
  summaryDialogHeader: { flexDirection: 'row', justifyContent: 'center' },
  summaryBackContainer: { flex: 0.1, alignSelf: 'center' },
  summaryBackIcon: { width: 25, height: 25, tintColor: AppColors.SHADE_WHITE },
  summaryTicketNoContainer: { flex: 0.3 },
  summaryTicketNoText: { fontSize: 15, color: AppColors.SHADE_GREEN, alignSelf: 'center', justifyContent: 'center' },
  sLHeaderText: { color: AppColors.LITE_PURPLE, textDecorationLine: 'underline', textDecorationColor: AppColors.LITE_PURPLE },
  seatRowContainer: { flexDirection: 'row', marginTop: 10 },
  sLText: { fontSize: 12, textAlign: 'center' },
  sLEmptyView: { width: 25, height: 25, marginLeft: 5, borderRadius: 5, backgroundColor: 'transparent' },
  summaryInfoContainer: { marginLeft: 15 },
  summaryInfoSecContainer: { flexDirection: 'row', marginTop: 15 },
  summaryInfoSecView: { width: '100%', height: 1, backgroundColor: AppColors.WHITE, marginTop: 15 },
  userInfoTextInput: { fontSize: 18, color: AppColors.WHITE },
  userInfoView: { height: 0.5, backgroundColor: AppColors.SHADE_GREY },
  userInfoMandateText: { fontSize: 12, color: AppColors.RED, marginTop: 5 },
}));

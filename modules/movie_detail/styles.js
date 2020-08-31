import { StyleSheet, Dimensions } from "react-native";
import * as AppColors from '../AppColors'

let width = Dimensions.get('screen').width / 2 - 8
let height = Dimensions.get('screen').height

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    flex: 1,
  },
  moreDetailText: {
    color: AppColors.SHADE_GREEN,
    fontSize: 15,
    marginTop: 3
  },
  moreDetailTitle: {
    color: AppColors.WHITE,
    fontSize: 15,
    textDecorationLine: 'underline',
    textDecorationColor: AppColors.WHITE,
    marginTop: 10
  },
  movieName: {
    flex: 0.8,
    color: AppColors.WHITE,
    fontSize: 22
  },
  expandDetailIcon: {
    width: 30, height: 30, alignSelf: 'center', tintColor: AppColors.WHITE, alignSelf: 'flex-end'
  },
  rateMovieContainer: {
    backgroundColor: AppColors.SHADE_GREEN,
    borderRadius: 2,
    width: '80%',
    alignSelf: 'flex-end',
    paddingTop: 2,
    paddingBottom: 2
  },
  rateMovieText: {
    fontSize: 15,
    textAlign: 'center'
  },
  moreDetailBottomViewContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },
  moreDetailBottomView: {
    flex: 1,
    justifyContent: 'center',
  },
  moreDetailBottomViewText: {
    color: AppColors.WHITE,
    fontSize: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: AppColors.WHITE,
  },
  reviewsText: {
    color: AppColors.WHITE,
    fontSize: 15,
  },
  expandIconView: {
    flex: 0.2
  },
  titleView: {
    flexDirection: 'row', alignItems: 'center'
  },
  moreDetailView: {
    // flex: 1, marginTop: 10, paddingTop: 40, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, backgroundColor: 'yellow', borderRadius: 10
    flex: 1, marginTop: 0, paddingTop: 10, paddingBottom: 20, paddingLeft: 20, paddingRight: 20, backgroundColor: 'yellow', borderBottomLeftRadius: 5, borderBottomRightRadius: 5
  },
  moreDetailContainer: {
    // width: '90%', marginTop: height / 7.2, position: 'absolute', flexDirection: 'column'
    width: '90%', marginTop: 0, flexDirection: 'column', alignSelf: 'center'
  },
  videoViewContainer: {
    // width: '80%', height: height / 5, backgroundColor: 'blue', marginBottom: 60, alignSelf: 'center', borderRadius: 5, overflow: 'hidden'
    width: '90%', height: height / 5, marginBottom: 0, alignSelf: 'center', overflow: 'hidden', justifyContent: 'flex-end'
  },
  topViewContainer: {
    justifyContent: 'center', marginTop: 20, flexDirection: 'column', justifyContent: 'center'
  },
  moreDetailViewLeft: {
    flex: 0.75
  },
  moreDetailViewRight: {
    flex: 0.25
  },
  moreDetailSubView: {
    flexDirection: 'row'
  },
  bodyContainer: {
    marginTop: 10, flex: 1
  },
  ratingContainer: { flex: 1, justifyContent: 'center' },
  ratingGradientContainer: { borderRadius: 10, padding: 20 },
  ratingText: { textAlign: 'center', color: AppColors.SHADE_GREEN, fontSize: 18 },
  ratingStarContainer: { marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', width: '50%', alignSelf: 'center' },
  ratingStarText: { textAlign: 'center', color: AppColors.SHADE_GREEN, fontSize: 18 },
  ratingHeartContainer: { alignSelf: 'center', paddingLeft: 2, paddingRight: 2 },
  ratingHeartIcon: { width: 20, height: 20, marginTop: 4, marginRight: 5 },
  ratingInput: { fontSize: 18, color: AppColors.WHITE },
  ratingInputView: { height: 0.5, backgroundColor: AppColors.SHADE_GREY },
  ratingHintText: { textAlign: 'right', color: AppColors.SHADE_GREEN, fontSize: 12, marginTop: 5 },
  ratingSubmitContainer: { alignSelf: 'center', marginTop: 40, backgroundColor: AppColors.SHADE_GREEN, borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' },
  ratingCancelContainer: { alignSelf: 'center', marginTop: 10, width: '90%', padding: 10 },
  ratingButtonText: { textAlign: 'center', color: AppColors.DARK_PURPLE },
  videoViewBackground: { width: '100%', height: 50, backgroundColor: AppColors.DARK_PURPLE, position: 'absolute', borderTopLeftRadius: 5, borderTopRightRadius: 5 },
  videoViewForeground: { width: '90%', flex: 1, marginBottom: 0, alignSelf: 'center', borderRadius: 5, overflow: 'hidden', justifyContent: 'center' },
  videoPreviewImage: { width: '100%', height: '100%', position: 'absolute' },
  videoPlayContainer: { alignSelf: 'center' },
  videoPlayIcon: { width: 60, height: 60 },
  upVotesContainer: { flexDirection: 'row', justifyContent: 'center' },
  upVotesIcon: { width: 20, height: 20, marginTop: 4, marginRight: 5 }
}));

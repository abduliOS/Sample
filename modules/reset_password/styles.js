import { StyleSheet, Dimensions } from "react-native";

let width = Dimensions.get('screen').width / 2 - 8
let height = Dimensions.get('screen').height

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
    borderRadius: 5
  },
  backgroundVideo: {
    flex: 1,
  },
  moreDetailText: {
    color: '#c6d0b0',
    fontSize: 15,
    marginTop: 3
  },
  moreDetailTitle: {
    color: '#fff',
    fontSize: 15,
    textDecorationLine: 'underline',
    textDecorationColor: '#fff',
    marginTop: 10
  },
  movieName: {
    flex: 0.8,
    color: '#fff',
    fontSize: 22
  },
  expandDetailIcon: {
    width: 30, height: 30, alignSelf: 'center', tintColor: '#fff', alignSelf: 'flex-end'
  },
  loginBtnContainer: {
    backgroundColor: '#d6e0be',
    borderRadius: 2,
    width: '100%',
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 30
  },
  rateMovieContainer: {
    backgroundColor: '#d6e0be',
    borderRadius: 2,
    width: '40%',
    alignSelf: 'center',
    paddingTop: 5,
    paddingBottom: 5
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
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: '#fff',
  },
  reviewsText: {
    color: '#fff',
    fontSize: 15,
  },
  expandIconView: {
    flex: 0.2
  },
  titleView: {
    flexDirection: 'row', alignItems: 'center'
  },
  moreDetailView: {
    flex: 1, marginTop: 10, paddingTop: 40, paddingBottom: 10, paddingLeft: 20, paddingRight: 20, backgroundColor: 'yellow', borderRadius: 10
  },
  moreDetailContainer: {
    width: '90%', marginTop: height / 7.2, position: 'absolute', flexDirection: 'column'
  },
  videoViewContainer: {
    width: '80%', height: height / 5, backgroundColor: 'blue', marginBottom: 60, alignSelf: 'center', borderRadius: 5, overflow: 'hidden'
  },
  topViewContainer: {
    justifyContent: 'center', marginTop: 20, flexDirection: 'row'
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
  }


}));

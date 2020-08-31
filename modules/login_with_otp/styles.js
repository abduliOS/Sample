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
  headerContainer: { flexDirection: 'row', padding: 5 },
  headerIconContainer: { padding: 10, flex: 0.1 },
  backIcon: { width: 30, height: 30, tintColor: '#d2d1d2', alignSelf: 'center' },
  headerText: { flex: 0.8, textAlign: 'center', alignSelf: 'center', fontSize: 18, color: '#eee9e9' },
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
  rateMovieText: {
    fontSize: 15,
    textAlign: 'center'
  },
  otpInfoContainer: { padding: 20 },
  otpInfoText: { fontSize: 15, color: '#cfd3c4', textAlign: 'center' },
  msgInfoText: { fontSize: 15, color: '#cfd3c4', textAlign: 'center', marginTop: 20 },
  changeNoContainer: { marginTop: 20 },
  changeNoText: { textAlign: 'center', fontSize: 15, color: '#cfd3c4', textDecorationLine: 'underline' },
  resendOTPText: { fontSize: 15, color: '#cfd3c4', textDecorationLine: 'underline' },
  resendOTPContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  textInputView: { height: 0.5, backgroundColor: '#b4b4ac' },
  errorMsg: { fontSize: 12, color: 'red', marginTop: 5 }
}));

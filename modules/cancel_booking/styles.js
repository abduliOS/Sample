import { StyleSheet, Dimensions } from "react-native";

let width = Dimensions.get('screen').width / 2 - 8
let height = Dimensions.get('screen').height / 2.3

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridContainer: {
    borderRadius: 5, paddingTop: 10, paddingBottom: 10, paddingLeft: 35, paddingRight: 35, marginTop: 10
  },
  movieItemView: {
    width: width, height: height, margin: 4, elevation: 50
  },
  itemTitleText: {
    fontSize: 20,
    color: '#ced2c3',
    fontWeight: '200'
  },
  itemInfoText: {
    fontSize: 16,
    color: '#ced2c3',
    marginTop: 3
  },
  coverImage: {
    flex: 1,
    borderRadius: 5,
    width: 70,
    height: 70,
    alignSelf: 'center'
  },
  preferenceContainer: {
    padding: 15, marginTop: 0, marginLeft: 10, marginRight: 10, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, elevation: 2, flex: 1, marginBottom: 20
  },
  loginBtnContainer: {
    backgroundColor: '#d6e0be',
    borderRadius: 2,
    width: '90%',
    alignSelf: 'center',
    paddingTop: 8,
    paddingBottom: 8,

  },
  rateMovieText: {
    fontSize: 15,
    textAlign: 'center'
  },

}));

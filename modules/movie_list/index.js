/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, BackHandler, Image } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MovieItem from '../../components/MovieItem'
import * as AppColors from '../AppColors'
import * as AppConstants from '../AppConstants'
import Header from '../../components/Header'
import NetInfo from "@react-native-community/netinfo";
import NetworkInfo from '../../components/NetworkInfo'
import Spinner from 'react-native-loading-spinner-overlay';
import PTRView from 'react-native-pull-to-refresh';
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
import Utils from '../Utils'

const searchMoviesIcon = require('../../assets/drawer_search.png')

class MovieList extends Component {

  constructor() {
    super()
    this.state = {
      isNetworkConnected: null,
      isExitDialogVisible: false
    }
  }

  componentWillMount() {
    this.checkNetworkConnectivity()
  }

  checkNetworkConnectivity() {
    NetInfo.fetch().then(state => { this.setState({ isNetworkConnected: state.isConnected }) });
    NetInfo.addEventListener(state => { this.setState({ isNetworkConnected: state.isConnected }) });
  }

  render() {

    const isNetworkConnected = this.state.isNetworkConnected
    const isSuccess = this.props.isSuccess
    const selectedCity = this.props.selectedCity

    return (
      <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

        {isNetworkConnected == false ? <NetworkInfo checkNetworkConnectivity={this.checkNetworkConnectivity} /> : null}

        {isNetworkConnected == true ? <Header navigation={this.props.navigation} /> : null}
        {isNetworkConnected == true ? isSuccess ? <View style={styles.movieHeaderContainer} >
          <Text style={styles.headerText} >Now Showing</Text>
          <TouchableOpacity onPress={() => this.navigateCitySelection()} style={styles.locationContainer} >
            <Image style={{ width: 15, height: 15, alignSelf: 'center', marginRight: 10 }} source={searchMoviesIcon} />
            <Text style={styles.headerText} >{selectedCity}</Text>
          </TouchableOpacity>

        </View> : null : null}
        {isNetworkConnected == true ? isSuccess ? this.renderGridView() : this.renderStatus() : null}

        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          animation={'fade'}
          textStyle={{ color: AppColors.SPINNER_TEXT }}
        />
        {this.renderExitDialog()}
      </LinearGradient>
    );
  }

  navigateCitySelection() {

    this.props.navigation.navigate('CitySelection', { isReload: true })

  }

  renderGridView() {

    const movieList = this.props.data

    return (
      <PTRView onRefresh={() => this.getMovieList()} style={styles.gridContainer}>
        <FlatList
          columnWrapperStyle={styles.movieList}
          data={movieList}
          keyExtractor={item => item.movieId}
          horizontal={false}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={item.movieId} style={styles.movieItemView} onPress={() => this.props.navigation.navigate('MovieDetail', item)} >
              <MovieItem movieId={item.movieId} movieName={item.movieName} posterUrl={item.posterUrl} language={item.language} dimension={item.dimension} censorCertificate={item.censorCertificate} upVotes={item.upVotes} overAllRating={item.overAllRating} />
            </TouchableOpacity>
          )}
        />
      </PTRView>
    )
  }

  renderStatus() {

    const status = this.props.status
    const statusDescription = status.statusDescription ? status.statusDescription : ''

    return (
      <PTRView onRefresh={() => this.getMovieList()} contentContainerStyle={styles.statusContainer} >
        <Animatable.Text animation={'zoomIn'} easing="ease-out" style={styles.noNetworkText} >{statusDescription}</Animatable.Text>
      </PTRView>
    )
  }

  renderExitDialog() {

    return (<Modal isVisible={this.state.isExitDialogVisible} >
      <View style={styles.exitContainer}>
        <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.exitGradientContainer}>

          <View style={styles.exitTextContainer} >
            <Text style={styles.exitText} >{'Are you sure, you want to exit ?'}</Text>
          </View>

          <View style={styles.exitButtonContainer} >

            <TouchableOpacity style={styles.exitButtonView} onPress={() => { this.setState({ isExitDialogVisible: false }) }} >
              <Text style={styles.exitButtonText} >CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.exitButtonView} onPress={() => { this.setState({ isExitDialogVisible: false }); BackHandler.exitApp() }} >
              <Text style={styles.exitButtonText} >EXIT</Text>
            </TouchableOpacity>

          </View>

        </LinearGradient>
      </View>
    </Modal>)
  }

  async componentDidMount() {

    let city = await Utils.getCity()
    this.props.actions.setCity(city)

    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

    this.getMovieList()

  }

  getMovieList() {

    this.props.actions.movieListRequest()

  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {

    // const routeName = this.props.navigation.state.routeName
    // console.log('routeName ' + this.props.navigation.state.key)

    // if (routeName == 'Splash') {
    //   this.setState({ isExitDialogVisible: true })
    //   return true;
    // }

    return false;
  }

}

function mapStateToProps(state) {
  return {
    obj: state.movieListReducer,
    isSuccess: state.movieListReducer.isSuccess,
    status: state.movieListReducer.status,
    isLoading: state.movieListReducer.isLoading,
    data: state.movieListReducer.data,
    selectedCity: state.citySelection.selectedCity
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);

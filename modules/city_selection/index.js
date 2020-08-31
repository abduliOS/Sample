/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, AsyncStorage, TextInput } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Geolocation from '@react-native-community/geolocation';
import Spinner from 'react-native-loading-spinner-overlay';
import NetInfo from "@react-native-community/netinfo";
import * as Animatable from 'react-native-animatable';
import Utils from '../Utils';

import * as AppColors from '../AppColors'
import * as AppConstants from '../AppConstants'

const buildingIcon = require('../../assets/building.png')
const markerIcon = require('../../assets/marker.png')
const searchIcon = require('../../assets/search.png')
const backIcon = require('../../assets/left_arrow.png')
import { ScrollView } from 'react-native-gesture-handler';

const noNetworkIcon = require('../../assets/no_network.png')

class App extends Component {

  constructor(props) {
    super(props)

    const { navigation } = this.props;
    this.isReload = navigation.getParam('isReload', false);

    this.state = {
      isSearchView: false,
      otherCities: [],
      otherCitiesFiltered: [],
      isNetworkConnected: null,
    }

    this.checkNetworkConnectivity()

  }

  checkNetworkConnectivity() {
    NetInfo.fetch().then(state => { this.setState({ isNetworkConnected: state.isConnected }); this.fetchCityList() });
    // NetInfo.addEventListener(state => { this.setState({ isNetworkConnected: state.isConnected }) });
  }

  render() {

    const isSearchView = this.state.isSearchView
    const isNetworkConnected = this.state.isNetworkConnected

    return (
      <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={[styles.container]}>

        {isNetworkConnected == true ? <ScrollView>
          {isSearchView ? null : this.renderSectionHeader(0)}
          {isSearchView ? null : this.renderPopularCities()}
          {isSearchView ? null : this.renderSectionHeader(1)}
          {isSearchView ? this.renderSearchHeader() : null}
          {this.renderCityList()}
        </ScrollView> : null}

        {isNetworkConnected == false ? this.renderNoNetwork() : null}

        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          animation={'fade'}
          textStyle={{ color: AppColors.WHITE }}
        />

      </LinearGradient>
    );
  }

  renderNoNetwork() {

    return (
      <View>
        <Animatable.Image animation={'pulse'} iterationCount="infinite" easing="ease-out" source={noNetworkIcon} style={styles.noNetworkIcon} resizeMode={'contain'} />
        <Animatable.Text animation={'zoomIn'} easing="ease-out" style={styles.noNetworkText} >Looks like you don't {'\n'} have internet connection</Animatable.Text>
        <TouchableOpacity style={styles.tryAgainView} onPress={() => this.checkNetworkConnectivity()}  >
          <Text style={styles.tryAgainText} >Try again</Text>
        </TouchableOpacity>
      </View>
    )

  }

  renderSectionHeader(val) {

    const title = val == 0 ? 'POPULAR CITIES' : 'OTHER CITIES'

    return (
      <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={AppColors.HEADER_GRADIENT} style={[styles.sectionHeaderContainer, { margin: val == 0 ? 0 : 0, elevation: 10 }]} >

        <View style={styles.sectionHeaderIconView} >
          {val == 0 ?
            <TouchableOpacity onPress={() => this.detectLocation()} >
              <Image source={markerIcon} style={styles.sectionHeaderIcon} />
            </TouchableOpacity>
            : <View />}
        </View>

        <View style={styles.sectionHeaderTitleView} >
          <Text style={styles.sectionHeaderText} >{title}</Text>
        </View>

        <View style={styles.sectionHeaderIconView} >
          {val == 0 ?
            <TouchableOpacity onPress={() => this.toggleSearch()} >
              <Image source={searchIcon} style={[styles.sectionHeaderIcon, { tintColor: AppColors.SHADE_GREEN }]} />
            </TouchableOpacity>
            : <View />}
        </View>

      </LinearGradient>
    )
  }

  renderSearchHeader() {

    return (
      <Animatable.View animation={'lightSpeedIn'} easing="ease-out" >
        <LinearGradient start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={AppColors.HEADER_GRADIENT} style={[styles.sectionHeaderContainer, { margin: 0, elevation: 10 }]} >

          <View style={styles.sectionHeaderIconView} >
            <TouchableOpacity style={{}} onPress={() => this.toggleSearch()} >
              <Image source={backIcon} style={styles.searchBackIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeaderTitleView} >
            <TextInput style={styles.searchTextInput} placeholder={'Enter City Name'} onChangeText={val => this.searchText(val)} />
          </View>

        </LinearGradient>
      </Animatable.View>
    )
  }

  renderPopularCities() {

    let popularCities = this.props.popularCities

    return (
      <View style={styles.cityListContainer} >
        <FlatList
          // horizontal={true}
          style={styles.popularCityList}
          data={popularCities}
          showsHorizontalScrollIndicator={false}
          numColumns={4}
          keyExtractor={(j, i) => `${j._id}`}
          renderItem={({ item: j, index }) => {

            const iconURL = Utils.host_point + j.iconImage

            return (
              <TouchableOpacity style={styles.popularCityView} onPress={() => this.onPressLocation(j.name)}>
                <View style={styles.popularCityIconView} ><Image source={{ uri: iconURL }} style={styles.popularCityIcon} /></View>
                <Text style={styles.popularCityText} >{j.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    )

  }

  renderCityList() {

    const otherCities = this.state.otherCitiesFiltered

    return (
      <View style={styles.cityListContainer} >
        {otherCities.length > 0 ? <FlatList
          style={styles.otherCitiesList}
          data={otherCities}
          keyExtractor={(j, i) => `${j._id}`}
          renderItem={({ item: j, index }) => {

            return (
              <TouchableOpacity style={[styles.cityListItem]} onPress={() => this.onPressLocation(j.name)} >
                <Text style={styles.cityListItemText} >{j.name}</Text>
                <View style={styles.otherCityItemView} />
              </TouchableOpacity>
            );
          }}
        /> : <View style={styles.otherCitiesErrContainer} ><Text style={styles.otherCitiesErrText} >Other Cities Not Found</Text></View>}
      </View>
    )
  }

  fetchCityList() {
    this.props.actions.cityListRequest()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.otherCities && nextProps.otherCities.length > 0) {
      this.setState({ otherCities: nextProps.otherCities, otherCitiesFiltered: nextProps.otherCities })
    }
  }

  async onPressLocation(city) {
    await AsyncStorage.setItem(AppConstants.USER_CITY, city)
    this.props.actions.setCity(city)
    this.props.navigation.pop()

    if (this.isReload) {
      this.props.actions.movieListRequest()
    }

  }

  detectLocation() {
    Geolocation.getCurrentPosition(info => {
      let latitude = info.coords.latitude
      let longitude = info.coords.longitude
      alert(latitude + ' ' + longitude)
    });
  }

  toggleSearch() {
    this.setState(previousState => ({ isSearchView: !previousState.isSearchView }))
  }

  searchText(keyword) {

    let text = keyword.toLowerCase()
    let trucks = this.state.otherCities
    let filteredName = trucks.filter((item) => {
      console.log('item ' + JSON.stringify(item))
      return item.name.toLowerCase().match(text)
    })

    this.setState({ otherCitiesFiltered: filteredName })

  }

}

function mapStateToProps(state) {
  return {
    isLoading: state.citySelection.isLoading,
    otherCities: state.citySelection.otherCities,
    popularCities: state.citySelection.popularCities
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
)(App);

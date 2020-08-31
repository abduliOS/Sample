/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Image, AsyncStorage, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as AppColors from '../AppColors'
import styles from './styles'
import * as AppConstants from '../AppConstants'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./actions";
import NetInfo from "@react-native-community/netinfo";
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import NowShowing from '../movie_list/index'
import CitySelection from '../city_selection/index'

const splashIcon = require('../../assets/splash_icon.png')

class Splash extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isNetworkConnected: null,
            isCitySelected: null
        }

        this.checkNetworkConnectivity()

    }

    checkNetworkConnectivity() {
        NetInfo.fetch().then(state => {
            this.setState({ isNetworkConnected: state.isConnected })
        });
    }

    render() {

        const isNetworkConnected = this.state.isNetworkConnected
        const isCitySelected = this.props.city
        console.log('isCitySelected' + isCitySelected)

        if (isCitySelected == null) {
            return (<CitySelection navigation={this.props.navigation} />)
        }

        if (isCitySelected != null && isCitySelected != '') {
            return (<NowShowing navigation={this.props.navigation} />)
        }

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>
                {isNetworkConnected == null ? this.renderLoading() : null}
                {isNetworkConnected == false ? this.renderNoNetwork() : null}
                {isNetworkConnected == true ? this.renderLoading() : null}
            </LinearGradient>
        );
    }

    renderLoading() {

        return (
            <Animatable.Image animation={'pulse'} easing="ease-out" iterationCount="infinite" source={splashIcon} style={styles.logoIcon} resizeMode={'contain'} />
        )
    }

    renderNoNetwork() {

        return (
            <View>
                <Image source={splashIcon} style={styles.logoIcon} resizeMode={'contain'} />
                <Animatable.Text animation={'zoomIn'} easing="ease-out" style={styles.noNetworkText} >Looks like you don't {'\n'} have internet connection</Animatable.Text>
                <TouchableOpacity style={styles.tryAgainView} onPress={() => this.checkNetworkConnectivity()}  >
                    <Text style={styles.tryAgainText} >Try again</Text>
                </TouchableOpacity>
            </View>
        )
    }

    async componentDidMount() {

        const city = await AsyncStorage.getItem(AppConstants.USER_CITY);
        setTimeout(() => { this.props.actions.setCity(city) }, 2000)

        const loginType = await AsyncStorage.getItem(AppConstants.LOGIN_TYPE);
        this.props.actions.setAuthentication(loginType)

        const userProfile = await AsyncStorage.getItem(AppConstants.USER_PROFILE);
        this.props.actions.setProfile(JSON.parse(userProfile))

    }

}

function mapStateToProps(state) {
    return {
        isLoading: state.appReducer.isLoading,
        isTokenValid: state.appReducer.isTokenValid,
        city: state.citySelection.selectedCity
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
)(Splash);
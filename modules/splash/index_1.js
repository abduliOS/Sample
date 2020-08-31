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

const splashIcon = require('../../assets/splash_icon.png')

class Splash extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isNetworkConnected: null,
            isUserLoggedIn: null
        }

    }

    componentWillMount() {
        this.checkNetworkConnectivity()
        this.isUserLoggedIn()
    }

    checkNetworkConnectivity() {
        NetInfo.fetch().then(state => { this.setState({ isNetworkConnected: state.isConnected }) });
        NetInfo.addEventListener(state => { this.setState({ isNetworkConnected: state.isConnected }) });
    }

    async isUserLoggedIn() {
        let isLoggedIn = await AsyncStorage.getItem(AppConstants.LOGIN_TYPE)
        this.setState({ isUserLoggedIn: isLoggedIn != null ? true : false })
        
    }

    render() {

        const isNetworkConnected = this.state.isNetworkConnected
        const isLoading = this.props.isLoading
        const isTokenValid = this.props.isTokenValid
        const isLoggedIn = this.state.isLoggedIn

        if (isLoggedIn || isTokenValid) {
            return (<NowShowing navigation={this.props.navigation} />)
        }

        // if (!isLoggedIn && isNetworkConnected) {
        //     this.props.actions.getToken()
        // }

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>
                {isNetworkConnected == null ? this.renderLoading() : null}
                {isNetworkConnected == false ? this.renderNoNetwork() : null}
                {isNetworkConnected == true ? this.renderLoading() : null}
            </LinearGradient>
        );
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

    renderLoading() {

        return (
            <Animatable.Image animation={'pulse'} easing="ease-out" iterationCount="infinite" source={splashIcon} style={styles.logoIcon} resizeMode={'contain'} />
        )
    }

    componentDidMount() {

        const isNetworkConnected = this.state.isNetworkConnected
        if (isNetworkConnected) {
            this.props.actions.getToken()
        }

    }

    async navigateToHome() {

        const city = await AsyncStorage.getItem(AppConstants.USER_CITY);
        if (city != null) {
            setTimeout(() => { this.props.navigation.navigate('MovieList') }, 1000)
        } else {
            setTimeout(() => { this.props.navigation.navigate('CitySelection') }, 1000)
        }

    }

}

function mapStateToProps(state) {
    return {
        isLoading: state.appReducer.isLoading,
        isTokenValid: state.appReducer.isTokenValid
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
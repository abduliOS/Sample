/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as AppColors from '../AppColors'
import * as AppConstants from '../AppConstants'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//Menus
import Login from '../login_with_otp/index'
import Profile from '../profiles/index'
import SearchMovies from '../search_movies/index'
import UpcomingMovies from '../movie_list/UpcomingMovies'
import Cinemas from '../cinemas/index'
import MyBookings from '../my_bookings/index'
import Wallet from '../wallet/index'
import ScheduledBooking from '../scheduled_booking/index'

class SideMenuContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }

    }


    render() {

        this.props.navigation.closeDrawer();

        const navigation = this.props.navigation;
        const selectedMenu = navigation.getParam('menu', '');

        if (selectedMenu == 'Search Movies') { return (<SearchMovies navigation={navigation} />) }
        if (selectedMenu == 'Cinemas') { return (<Cinemas navigation={navigation} />) }
        if (selectedMenu == 'Upcoming Movies') { return (<UpcomingMovies navigation={navigation} />) }

        if (!this.props.isAuthenticated) {
            return (<Login navigation={this.props.navigation} />)
        }

        if (selectedMenu == 'Scheduled Booking') { return (<ScheduledBooking navigation={navigation} />) }
        if (selectedMenu == 'My Profile') { return (<Profile navigation={navigation} />) }
        if (selectedMenu == 'My Bookings') { return (<MyBookings navigation={navigation} />) }
        if (selectedMenu == 'Cancel Booking') { return (<MyBookings hidePast={true} navigation={navigation} />) }
        if (selectedMenu == 'Wallet') { return (<Wallet navigation={navigation} />) }

    }

    async componentDidMount() {

    }

}

// export default MovieDetail
function mapStateToProps(state) {
    return {
        isAuthenticated: state.otpLoginReducer.isAuthenticated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideMenuContainer);

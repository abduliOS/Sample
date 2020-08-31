/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import MovieItem from '../../components/MovieItem'
import * as AppColors from '../AppColors'
import * as actions from './actions'
import Header from '../../components/Header'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from 'react-native-loading-spinner-overlay';
import { ScrollView } from 'react-native-gesture-handler';

const closeIcon = require('../../assets/close.png')

class MyBookings extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        const hidePast = this.props.hidePast // Flag to hide past booking
        const bookingList = this.props.bookingList
        const upcomingBookingList = this.props.upcomingBookingList
        const pastBookingList = this.props.pastBookingList

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>
                <Header navigation={this.props.navigation} />
                <ScrollView style={{ marginLeft: 15, marginRight: 15 }} >
                    {upcomingBookingList.length > 0 ? <Text style={{ fontSize: 18, color: '#cbcec0', marginBottom: 5 }} >Upcoming Bookings</Text> : null}
                    {upcomingBookingList.map(item => {
                        return this.renderItem(item)
                    })}

                    {upcomingBookingList.length > 0 ? <View style={{ height: 1, backgroundColor: '#4c3a4e', marginTop: 10, marginLeft: 10, marginRight: 10 }} /> : null}

                    {hidePast != true ? pastBookingList.length > 0 ? <Text style={{ fontSize: 18, color: '#cbcec0', marginTop: 10, marginBottom: 5 }} >Past Bookings</Text> : null : null}
                    {hidePast != true ? pastBookingList.map(item => {
                        return this.renderItem(item)
                    }) : null}

                </ScrollView>
                <Spinner
                    visible={this.props.isLoading}
                    textContent={'Loading...'}
                    animation={'fade'}
                    textStyle={{ color: '#fff' }}
                />
            </LinearGradient>
        );
    }

    renderItem(item) {

        const coverImage = item.posterUrl
        const movieName = item.movie_name
        const language = item.language
        const dimension = item.dimension
        const certificate = item.censorCertificate
        const venueName = item.venue_name
        const showDate = item.show_date
        const showTime = item.show_time
        const className = item.class_name
        const seatCount = item.seat_count
        const seats = item.seats

        let seatNoList = []
        seats.map(item => seatNoList.push(item.seatNumber))

        return (
            <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.gridContainer}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('BookingDetail', item)} >

                    <View style={{ flexDirection: 'row' }} >

                        <View style={{ flex: 0.6 }} >
                            <Text style={styles.itemTitleText} >{movieName}</Text>
                            <Text style={styles.itemInfoText} >{`${language} ${dimension} ${certificate}`}</Text>
                            <Text style={styles.itemInfoText} >{venueName}</Text>
                            <Text style={styles.itemInfoText} >{`${showDate} | ${showTime}`}</Text>
                            <Text style={styles.itemInfoText} >{`${className} | ${seatCount} Seats`}</Text>
                        </View>

                        <View style={{ flex: 0.4 }} >
                            <Image resizeMode={'contain'} source={{ uri: coverImage }} style={styles.coverImage} />
                        </View>
                    </View>

                    <View style={{ width: '100%', height: 0.5, backgroundColor: '#fff', marginTop: 10 }} />

                    <View style={{ flexDirection: 'row', marginTop: 10 }} >

                        <View style={{ flex: 0.6, justifyContent: 'center' }} >
                            {/* <Text style={styles.itemInfoText} >{showTime}</Text> */}
                            <Text style={styles.itemInfoText} >{seatNoList.toString()}</Text>
                        </View>

                        <View style={{ flex: 0.4 }} >
                            <Text style={styles.itemCountText} >{seatNoList.length}</Text>
                            <Text style={styles.itemCountLabel} >{'Tickets'}</Text>
                        </View>
                    </View>

                </TouchableOpacity>

            </LinearGradient>
        )
    }

    componentDidMount() {
        this.props.actions.bookingListRequest()
    }

}

function mapStateToProps(state) {
    return {
        isLoading: state.myBookingsReducer.isLoading,
        bookingList: state.myBookingsReducer.bookingList,
        upcomingBookingList: state.myBookingsReducer.upcomingBookingList,
        pastBookingList: state.myBookingsReducer.pastBookingList
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
)(MyBookings);

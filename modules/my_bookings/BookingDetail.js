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

const closeIcon = require('../../assets/close.png')

class BookingDetail extends Component {

    constructor(props) {
        super(props)

        this.bookingInfo = this.props.navigation.state.params

        console.log('BookingDetail ' + JSON.stringify(this.props))

    }

    render() {

        const coverUrl = this.bookingInfo.posterUrl
        const isCancelEligible = this.bookingInfo.cancellationEligibility

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>
                <Header navigation={this.props.navigation} />
                <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }} >
                    <Text style={{ fontSize: 18, color: '#cbcec0', marginBottom: 5 }} >Booking Details</Text>
                    <View style={{ borderRadius: 10, height: '20%', overflow: 'hidden', marginTop: 5 }} >
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: coverUrl }} />
                    </View>
                    {this.renderItem(this.bookingInfo)}

                    <LinearGradient colors={AppColors.PREFERENCE_GRADIENT} style={{ paddingLeft: 20, paddingRight: 20, flex: 1, backgroundColor: 'red', justifyContent: 'space-between', marginBottom: 10 }} >
                        <View style={{ flexDirection: 'row', marginTop: 20 }} >
                            <View style={{ flex: 0.8 }} >
                                <Text style={styles.summaryLabel} >Sub Total</Text>
                                <Text style={styles.summaryLabel} >Internet Handling Charges</Text>
                                <Text style={styles.summaryLabel} >Additional Charges</Text>
                            </View>
                            <View style={{ flex: 0.2 }} >
                                <Text style={styles.summaryLabel} >{''}</Text>
                                <Text style={styles.summaryLabel} ></Text>
                                <Text style={styles.summaryLabel} ></Text>
                            </View>
                        </View>
                        {isCancelEligible ? <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 20, backgroundColor: '#dee2c7', borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' }} onPress={() => this.cancelTicket()} >
                            <Text style={{ textAlign: 'center', color: '#39253f' }} >{`CANCEL TICKET`}</Text>
                        </TouchableOpacity> : <View />}
                    </LinearGradient>

                </View>
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

        console.log('renderItem ' + JSON.stringify(item))

        const bookingId = item.booking_id
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
        const qrCode = 'http://122.165.186.93:9111/lixo-qrcode/api/rest/v1/qrCode/retrive/' + item.booking_id

        let seatNoList = []
        seats.map(item => seatNoList.push(item.seatNumber))

        return (
            <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.gridContainer}>

                <View style={{ flexDirection: 'row' }} >

                    <View style={{ flex: 0.6 }} >
                        <Text style={styles.itemTitleText} >{movieName}</Text>
                        <Text style={styles.itemInfoText} >{`${language} ${dimension} ${certificate}`}</Text>
                        <Text style={styles.itemInfoText} >{venueName}</Text>
                        <Text style={styles.itemInfoText} >{`${showDate} | ${showTime}`}</Text>
                        <Text style={styles.itemInfoText} >{`${className} | ${seatCount} Seats`}</Text>
                    </View>

                    <View style={{ flex: 0.4 }} >
                        <Image resizeMode={'contain'} source={{ uri: qrCode }} style={styles.coverImage} />
                        <Text style={styles.itemIdText} >{bookingId}</Text>
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

            </LinearGradient>
        )
    }

    cancelTicket() {

        const bookingId = this.bookingInfo.booking_id
        this.props.actions.cancelTicketRequest(bookingId)

    }

    componentDidMount() {

    }

}

function mapStateToProps(state) {
    return {
        isLoading: state.myBookingsReducer.isLoading
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
)(BookingDetail);

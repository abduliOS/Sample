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

class PaymentStatus extends Component {

    constructor(props) {
        super(props)

        this.bookingInfo = this.props.navigation.state.params

    }

    render() {

        const coverUrl = this.bookingInfo.posterUrl

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>
                <Header navigation={this.props.navigation} />
                <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }} >
                    <Text style={{ fontSize: 18, color: '#cbcec0', marginBottom: 5 }} >Booking Details</Text>
                    <View style={{ borderRadius: 10, height: '20%', overflow: 'hidden', marginTop: 5 }} >
                        <Image style={{ width: '100%', height: '100%' }} source={{ uri: coverUrl }} />
                    </View>
                    {this.renderItem(this.bookingInfo)}
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

    componentDidMount() {

    }

}

function mapStateToProps(state) {
    return {
        // isLoading: state.myBookingsReducer.isLoading
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
)(PaymentStatus);

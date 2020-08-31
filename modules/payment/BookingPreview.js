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
// import * as actions from './actions'
import Header from '../../components/Header'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from 'react-native-loading-spinner-overlay';
import Utils from '../Utils'
import Modal from "react-native-modal";

const errorMessage = 'Something went wrong! Try again Later'

class BookingDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ticketDetails: null,
            isSuccess: false,
            isMessageDialogVisible: false,
            message: null
        }

    }

    render() {

        const { isSuccess } = this.state

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>
                <Header navigation={this.props.navigation} />

                {isSuccess ? this.renderBooking() : null}
                {this.renderMessageDialog()}

                <Spinner visible={this.props.isLoading} textContent={'Loading...'} animation={'fade'} textStyle={{ color: '#fff' }} />

            </LinearGradient>
        );
    }

    renderMessageDialog() {

        return (<Modal isVisible={this.state.isMessageDialogVisible} >
            <View style={{ justifyContent: 'center', flex: 1 }}>
                <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={{ borderRadius: 10, padding: 20 }}>

                    <View style={{ marginLeft: 15 }} >
                        <Text style={styles.summaryLabel} >{this.state.message}</Text>
                    </View>

                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20, backgroundColor: '#dee2c7', borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' }} onPress={() => { this.setState({ isMessageDialogVisible: false, message: null }) }} >
                        <Text style={{ textAlign: 'center', color: '#39253f' }} >CLOSE</Text>
                    </TouchableOpacity>

                </LinearGradient>
            </View>
        </Modal>)
    }

    renderBooking() {

        const { isSuccess, ticketDetails } = this.state

        let posterUrl = isSuccess ? ticketDetails.posterUrl : null
        let subTotal = isSuccess ? ticketDetails.bookingTransaction.totalAmount : null

        return (
            <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }} >
                <Text style={{ fontSize: 18, color: '#cbcec0', marginBottom: 5 }} >Booking Details</Text>
                <View style={{ borderRadius: 10, height: '20%', overflow: 'hidden', marginTop: 5 }} >
                    <Image style={{ width: '100%', height: '100%' }} source={{ uri: posterUrl }} />
                </View>
                {this.renderItem()}

                <LinearGradient colors={AppColors.PREFERENCE_GRADIENT} style={{ paddingLeft: 20, paddingRight: 20, flex: 1, backgroundColor: 'red', justifyContent: 'space-between', marginBottom: 10 }} >
                    <View style={{ flexDirection: 'row', marginTop: 20 }} >
                        <View style={{ flex: 0.8 }} >
                            <Text style={styles.summaryLabel} >Sub Total</Text>
                            <Text style={styles.summaryLabel} >Internet Handling Charges</Text>
                            <Text style={styles.summaryLabel} >Additional Charges</Text>
                        </View>
                        <View style={{ flex: 0.2 }} >
                            <Text style={styles.summaryLabel} >{subTotal}</Text>
                            <Text style={styles.summaryLabel} ></Text>
                            <Text style={styles.summaryLabel} ></Text>
                        </View>
                    </View>
                </LinearGradient>

            </View>
        )
    }

    renderItem(item) {

        const { isSuccess, ticketDetails } = this.state

        const movieName = isSuccess ? ticketDetails.movieName : null
        const language = isSuccess ? ticketDetails.language : null
        const dimension = isSuccess ? ticketDetails.dimension : null
        const certificate = isSuccess ? ticketDetails.censorCertificate : null
        const venueName = isSuccess ? ticketDetails.venueName : null
        const showDate = isSuccess ? ticketDetails.showDate : null
        const showTime = isSuccess ? ticketDetails.showTime : null
        const className = isSuccess ? ticketDetails.className : null
        const seatCount = isSuccess ? ticketDetails.seatCount : null
        const bookingId = isSuccess ? ticketDetails.bookingReferenceId : null
        const qrCode = isSuccess ? ticketDetails.qrFile : null
        const seats = isSuccess ? ticketDetails.seats : []

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
                        <Text style={styles.itemCountLabel} >{seatNoList.length > 1 ? 'Tickets' : 'Ticket'}</Text>
                    </View>
                </View>

            </LinearGradient>
        )
    }

    componentDidMount() {

        // let bookingObj = { bookingId: 55, bookingReferenceId: 'MVPYJ9S3BAQC' }

        const { navigation } = this.props
        let bookingObj = navigation.state.params

        this.getTicketDetails(bookingObj)

    }

    // API Calls
    async getTicketDetails(bookingObj) {

        let header = await Utils.getHeader()

        let location = await Utils.getCity()
        let bookingId = bookingObj.bookingId ? bookingObj.bookingId : null
        let bookingReferenceId = bookingObj.bookingReferenceId ? bookingObj.bookingReferenceId : null

        let body = {
            header: { callingAPI: "string", channel: "string", transactionId: "string" },
            location,
            bookingId,
            bookingReferenceId
        }

        let request = { method: 'POST', headers: header, body: JSON.stringify(body) };
        console.log('getTicketDetails request ' + JSON.stringify(request))
        let response = await fetch(Utils.endpoint.getTicketDetails, request).then(res => res.json());
        console.log('getTicketDetails response ' + JSON.stringify(response))
        if (response.status) {
            if (response.status.statusCode && response.status.statusCode == '1001') {
                this.setState({ ticketDetails: response, isSuccess: true })
            } else if (response.status.statusCode && response.status.statusCode != '1001') {
                this.setState({ isMessageDialogVisible: true, message: response.status.statusDescription })
            }
        } else {
            this.setState({ isMessageDialogVisible: true, message: errorMessage })
        }

    }

}

function mapStateToProps(state) {
    return {
        isLoading: state.myBookingsReducer.isLoading
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
)(BookingDetail);

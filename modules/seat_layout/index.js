/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, ScrollView, TextInput } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppColors from '../AppColors'
import DateSelector from '../../components/DateSelector'
import ShowTime from '../../components/ShowTime'
import Utils from '../Utils'
import Modal from "react-native-modal";
import Spinner from 'react-native-loading-spinner-overlay';

const backIcon = require('../../assets/left_arrow.png')

const errorMessage = 'Something went wrong! Try again Later'

class SeatLayout extends Component {

    constructor(props) {
        super(props)

        const { navigation } = this.props;
        const showDates = navigation.getParam('showDates', '');
        const movieData = navigation.getParam('movieData', '');
        const seatCount = navigation.getParam('seatCount', '');
        const venueData = navigation.getParam('venueData', '');
        const selectedDate = navigation.getParam('selectedDate', '');
        const selectedShow = navigation.getParam('selectedShow', '');

        console.log('showDates ' + JSON.stringify(showDates))
        console.log('movieData ' + JSON.stringify(movieData))
        console.log('seatCount ' + JSON.stringify(seatCount))
        console.log('venueData ' + JSON.stringify(venueData))
        console.log('selectedDate ' + JSON.stringify(selectedDate))
        console.log('selectedShow ' + JSON.stringify(selectedShow))

        this.state = {
            isLoading: false,
            showDates: showDates,
            movieData: movieData,
            selectedSeatCount: seatCount,
            venueData: venueData,
            selectedDate: selectedDate,
            reserveBlockResponse: null,
            isSummaryDialogVisible: false,
            paymentInfo: null,
            selectedSeats: [],
            selectedSeatsId: [],

            venueDataDesc: '',
            selectedShow: selectedShow,
            seatClasses: [],
            selectedDateIndex: 0,
            selectedClassId: '',
            classPublishedId: '',
            isSeatDialogVisible: false,
            availableTicketCount: [],
            //Summary
            isSummaryNext: false,
            summaryName: '',
            summaryMobile: '',
            summaryEmail: '',
            isSummaryValidate: false,
            //Message Dialog
            isMessageDialogVisible: false,
            message: null
        }

    }

    render() {

        const { selectedDate, selectedShow } = this.state
        console.log('selectedShow ' + JSON.stringify(selectedShow))

        const { navigation } = this.props;
        const showDates = this.state.showDates

        const movieData = this.state.movieData;
        const movieName = movieData ? movieData.movieName : ''

        const venueData = this.state.venueData
        const venueName = venueData ? venueData.venueName : ''
        const venueLocation = venueData ? venueData.addressLine1 : ''

        const movieShows = this.props.showTimes

        let selectedSeatCount = this.state.selectedSeatCount // total selected seat
        let selectedSeats = this.state.selectedSeats // selected Seat List
        let isPaymentButtonVisible = selectedSeats.length == selectedSeatCount ? true : false

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                <View style={styles.innerViewContainer} >
                    <View style={styles.headerContainer} >

                        <TouchableOpacity style={styles.backIconContainer} onPress={() => navigation.pop()} >
                            <Image source={backIcon} style={styles.backIcon} />
                        </TouchableOpacity>

                        <View style={styles.headerInfoContainer} >
                            <Text style={styles.headerInfoText} >{movieName}</Text>
                            <Text style={styles.headerInfoText} >{venueName} : {venueLocation}</Text>
                        </View>

                        <TouchableOpacity onPress={() => this.onClickTicketDialog()} style={styles.scButtonContainer} >
                            <View style={styles.scTextContainer} ><Text style={styles.scText} >{selectedSeatCount}</Text></View>
                            <Text style={styles.seatText} >Tickets</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.showDatesContainer} >
                        <ScrollView horizontal={true} indicatorStyle={'default'}>
                            {showDates.map((res, index) => {
                                return (<TouchableOpacity key={`${index}`} onPress={() => this.onDateClick(res, index)} >
                                    <DateSelector isSelected={selectedDate == res.showDate ? true : false} data={res} />
                                </TouchableOpacity>)
                            })}
                        </ScrollView>
                    </View>

                    <View style={styles.showTimeConatiner} >
                        {venueData == null ? <Text>Venue Data Not Found</Text> : movieShows.map((res, index) => {
                            return (<TouchableOpacity onPress={() => this.onShowClick(res, index)} key={res.showPublishedId} >
                                <ShowTime data={res} displayType={false} />
                                {selectedShow.showTime == res.showTime ? <View style={styles.showTimeView} /> : null}
                            </TouchableOpacity>)
                        })}
                    </View>

                    <ScrollView horizontal={true} >
                        <ScrollView nestedScrollEnabled={true} >{this.renderSeatLayout()}</ScrollView>
                    </ScrollView>

                </View>

                {isPaymentButtonVisible ? <View style={styles.paymentButtonContainer} >
                    <TouchableOpacity onPress={() => this.onPaymentClick()} style={styles.loginBtnContainer} >
                        <Text style={styles.rateMovieText} >MAKE PAYMENT</Text>
                    </TouchableOpacity>
                </View> : null}

                {this.renderMessageDialog()}
                {this.renderSummaryDialog()}
                {this.renderTicketDialog()}

                <Spinner visible={this.props.isLoading} textContent={'Loading...'} animation={'fade'} textStyle={{ color: '#fff' }} />
                <Spinner visible={this.state.isLoading} textContent={'Loading...'} animation={'fade'} textStyle={{ color: '#fff' }} />

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

    onClickTicketDialog() {

        let availableSeats = 0
        let selectedShow = this.state.selectedShow
        let classes = selectedShow.classes
        classes.map((item, index) => { availableSeats = availableSeats + item.availableSeats })

        let ticketCount = availableSeats > 10 ? 10 : availableSeats
        let ticketCountArray = []

        for (var i = 0; i < ticketCount; i++) { ticketCountArray.push(i) }
        this.availableTicketCount = ticketCountArray
        this.setState({ availableTicketCount: ticketCountArray, isSeatDialogVisible: true })

    }

    renderTicketDialog() {

        let array = this.state.availableTicketCount

        return (<Modal isVisible={this.state.isSeatDialogVisible} >
            <View style={styles.seatCountContainer}>

                <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.seatCountGradientContainer}>
                    <View style={styles.seatCountHeaderView} >
                        <TouchableOpacity style={styles.seatCountBackContainer} onPress={() => this.setState({ isSeatDialogVisible: false })} >
                        </TouchableOpacity>
                        <Text style={styles.seatCountText} >How many seats?</Text>
                        <View style={{ flex: 0.2 }} />
                    </View>

                    <View style={styles.seatCountListContainer} >
                        {array.map((item, index) => {
                            return (<TouchableOpacity key={`${index}`} onPress={() => this.setState({ selectedSeatCount: index + 1 })} style={[styles.seatCountItemContainer, { backgroundColor: this.state.selectedSeatCount == index + 1 ? AppColors.DARK_PURPLE : AppColors.SHADE_GREEN }]} >
                                <Text style={[styles.seatCountItemText, { color: this.state.selectedSeatCount == index + 1 ? AppColors.SHADE_GREEN : AppColors.DARK_PURPLE }]} key={index} >{index + 1}</Text>
                            </TouchableOpacity>)
                        })}
                    </View>

                    <TouchableOpacity style={styles.ticketDialogBtnContainer} onPress={() => this.setState({ isSeatDialogVisible: false })} >
                        <Text style={styles.ticketDialogBtn} >Close</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Modal>)
    }

    renderSummaryDialog() {

        const movieData = this.state.movieData;
        const movieName = movieData ? movieData.movieName : ''
        const selectedSeats = this.state.selectedSeats

        const { isSummaryNext } = this.state

        return (<Modal isVisible={this.state.isSummaryDialogVisible} >
            <View style={styles.summaryDialogContainer}>

                <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.summaryDialogGradientContainer}>

                    <View style={styles.summaryDialogHeader} >
                        <TouchableOpacity style={styles.summaryBackContainer} onPress={() => this.onSummaryBack()} >
                            <Image source={backIcon} style={styles.summaryBackIcon} />
                        </TouchableOpacity>
                        <Text style={styles.summaryHeaderLabel} >{movieName}</Text>
                        <View style={styles.summaryTicketNoContainer} ><Text style={styles.summaryTicketNoText} >{`${selectedSeats.length} Tickets`}</Text></View>
                    </View>

                    {isSummaryNext ? null : this.renderSummaryInfoBody()}
                    {isSummaryNext ? this.renderUserInfo() : null}

                </LinearGradient>
            </View>
        </Modal>)
    }

    onSummaryBack() {

        const { isSummaryNext } = this.state

        if (isSummaryNext) {
            this.setState({ isSummaryNext: false })
            return
        }

        this.setState({ isSummaryDialogVisible: false })

    }

    renderSummaryInfoBody() {

        const reserveBlockResponse = this.state.reserveBlockResponse
        const orderId = reserveBlockResponse != null ? reserveBlockResponse.orderId : null
        const status = reserveBlockResponse != null ? reserveBlockResponse.status : null

        const movieData = this.state.movieData;
        const movieName = movieData ? movieData.movieName : ''

        const venueData = this.state.venueData
        const venueName = venueData ? venueData.venueName : ''
        const venueLocation = venueData ? venueData.addressLine1 : ''

        const showDate = this.state.selectedDate
        const selectedSeats = this.state.selectedSeats

        const paymentInfo = this.state.paymentInfo
        const subTotal = paymentInfo != null ? paymentInfo.subTotal : ''

        return (
            <View>
                <View style={styles.summaryInfoContainer} >
                    <Text style={styles.summaryLabel} >{`${movieData.language} ${movieData.dimension} ${movieData.censorCertificate}`}</Text>

                    <View style={styles.summaryInfoSecContainer} >
                        <View style={{ flex: 0.8 }} >
                            <Text style={styles.summaryLabel} >{`${venueName}: ${venueLocation}`}</Text>
                            <Text style={styles.summaryLabel} >{showDate}</Text>
                            <Text style={styles.summaryLabel} ></Text>
                        </View>
                        <View style={{ flex: 0.2, marginLeft: 5 }} >
                            {selectedSeats.map((item, index) => {
                                return (<Text key={`${index}`} style={styles.summaryLabel} >{item.seatNumber}</Text>)
                            })}
                        </View>
                    </View>

                    <View style={styles.summaryInfoSecView} />

                    <View style={styles.summaryInfoSecContainer} >
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

                </View>

                <TouchableOpacity style={styles.summaryBtnContainer} onPress={() => this.onSummaryNext()} >
                    <Text style={styles.summaryBtnText} >{`NEXT`}</Text>
                </TouchableOpacity>

            </View>
        )
    }

    onSummaryNext() { this.setState({ isSummaryNext: true }) }

    renderUserInfo() {

        const { summaryName, summaryEmail, summaryMobile, isSummaryValidate } = this.state

        const paymentInfo = this.state.paymentInfo
        const subTotal = paymentInfo != null ? paymentInfo.subTotal : ''

        return (
            <View>
                <View style={{ marginTop: 10 }} >
                    <TextInput onChangeText={(val) => this.setState({ summaryName: val })} placeholder={'Name'} placeholderTextColor={'#c9cdbf'} style={styles.userInfoTextInput} />
                    <View style={styles.userInfoView} />
                    {isSummaryValidate ? summaryName == '' ? <Text style={styles.userInfoMandateText} >Name is Required</Text> : null : null}
                </View>
                <View style={{ marginTop: 20 }} >
                    <TextInput onChangeText={(val) => this.setState({ summaryMobile: val })} keyboardType={'number-pad'} placeholder={'Mobile No'} placeholderTextColor={'#c9cdbf'} style={styles.userInfoTextInput} />
                    <View style={styles.userInfoView} />
                    {isSummaryValidate ? summaryMobile == '' ? <Text style={styles.userInfoMandateText} >Mobile No is Required</Text> : null : null}
                </View>
                <View style={{ marginTop: 20 }} >
                    <TextInput onChangeText={(val) => this.setState({ summaryEmail: val })} keyboardType={'email-address'} placeholder={'Email'} placeholderTextColor={'#c9cdbf'} style={styles.userInfoTextInput} />
                    <View style={styles.userInfoView} />
                    {isSummaryValidate ? summaryEmail == '' ? <Text style={styles.userInfoMandateText} >Email is Required</Text> : null : null}
                </View>

                <TouchableOpacity style={styles.summaryBtnContainer} onPress={() => this.onClickProceedPayment()} >
                    <Text style={styles.summaryBtnText} >{`PROCEED PAYMENT ${subTotal}`}</Text>
                </TouchableOpacity>
            </View>
        )

    }

    handleViewRef = ref => this.view = ref;

    onClickProceedPayment() {

        const { summaryName, summaryEmail, summaryMobile, isSummaryValidate } = this.state

        if (summaryName == '' || summaryEmail == '' || summaryMobile == '') {
            this.setState({ isSummaryValidate: true })
            return
        }

        this.proceedPayment()

    }

    renderSeatLayout() {

        const seatClasses = this.props.seatClasses

        return seatClasses.map((item, index) => {

            const classId = item.classId
            const classPublishedId = item.classPublishedId

            return (<View key={item.classPublishedId} style={{ margin: 10 }} >
                <Text style={styles.sLHeaderText} >{item.className + ' - ₹' + item.baseFare}</Text>
                {item.labels.map((item, index) => { return (this.renderSeatRow(item, index, classId, classPublishedId)) })}
            </View>)
        })
    }

    renderSeatRow(labels, index, classId, classPublishedId) {

        const groupId = labels.groupId
        const seatArray = labels.seats
        const selectedSeatsId = this.state.selectedSeatsId

        return (
            <View key={`${index}`} style={styles.seatRowContainer} >
                {
                    seatArray.map((item, index) => {
                        if (item.seat) {

                            let seatColor = selectedSeatsId.indexOf(item.seatsPublishedId) != -1 ? '#452f47' : item.bookingStatus == 'BLOCKED' ? '#787a76' : '#ced3c2'
                            let seatTextColor = selectedSeatsId.indexOf(item.seatsPublishedId) != -1 ? '#fff' : item.bookingStatus == 'BLOCKED' ? '#452f47' : '#452f47'

                            return (
                                <TouchableOpacity key={`${index}`} onPress={() => this.onSeatClick(labels, item, classId, classPublishedId)} style={[styles.seatBackground, { backgroundColor: seatColor }]} >
                                    <Text key={`${index}`} style={[styles.sLText, { color: seatTextColor }]} >{item.seatNumber}</Text>
                                </TouchableOpacity>
                            )
                        } else { return (<View key={`${index}`} style={styles.sLEmptyView} />) }
                    })
                }
            </View>
        )
    }

    async componentDidMount() {

        this.getShowTimes(this.state.selectedDate)

    }

    getShowTimes(date) {

        let movieId = this.state.movieData.movieId
        let showDate = date
        let venueId = this.state.venueData.venueId
        let showPublishedId = this.state.selectedShow.showPublishedId
        console.log('showPublishedId ' + showPublishedId)

        let showTimesRequest = { movie_id: movieId, showDate: showDate, venue_id: venueId, showPublishedId: showPublishedId }
        this.props.actions.showTimeRequest(showTimesRequest)

    }

    async onDateClick(data, index) {

        this.setState({ selectedDateIndex: index, selectedDate: data.showDate, selectedSeats: [], selectedSeatsId: [], selectedClassId: '', classPublishedId: '' })
        this.getShowTimes(data.showDate)

    }

    onShowClick(showData, index) {

        this.setState({ selectedShow: showData, selectedSeats: [], selectedSeatsId: [], selectedClassId: '', classPublishedId: '' })
        let _requestObj = { showDetailsId: showData.showPublishedId }
        this.props.actions.seatLayoutRequest(_requestObj)

    }

    onSeatClick(labels, seatData, classId, classPublishedId) {

        let seatRowList = labels.seats // seat Row List
        let selectedSeatIndex = seatRowList.indexOf(seatData) // Getting position selected seat

        let selectedSeatCount = this.state.selectedSeatCount // total selected seat
        let selectedSeats = this.state.selectedSeats // selected Seat List
        let selectedSeatsId = this.state.selectedSeatsId // selected Seat Id List

        let remainingSeatCount = selectedSeatCount - selectedSeats.length

        let seatIndex = selectedSeatsId.indexOf(seatData.seatsPublishedId) // checking if Seat is added already
        if (seatIndex == -1) {

            if (remainingSeatCount == 0) { return }

            selectedSeats.push(seatData)
            selectedSeatsId.push(seatData.seatsPublishedId)

            // selecting next seats
            for (var i = selectedSeatIndex + 1; i < selectedSeatIndex + remainingSeatCount; i++) {
                let seatItem = seatRowList[i]
                console.log('seatItem ' + JSON.stringify(seatItem))
                if (seatItem.bookingStatus == 'AVAILABLE' && seatItem.seat) {
                    selectedSeats.push(seatItem)
                    selectedSeatsId.push(seatItem.seatsPublishedId)
                } else { break }
            }

        } else {
            selectedSeats.splice(seatIndex, 1)
            selectedSeatsId.splice(seatIndex, 1)
        }

        this.setState({ selectedSeats: selectedSeats, selectedClassId: classId, selectedSeatsId: selectedSeatsId, classPublishedId: classPublishedId })

    }

    onPaymentClick() {

        const selectedShow = this.state.selectedShow
        const venueData = this.state.venueData

        const classId = this.state.selectedClassId
        const movieId = this.state.movieData.movieId
        const screenId = selectedShow.screenId
        const classPublishedId = this.state.classPublishedId
        const seatsPublishedId = this.state.selectedSeats
        const showDetailsId = selectedShow.screenPublishedId
        const venueId = venueData.venueId
        let showPublishedId = this.state.selectedShow.showPublishedId

        let reqObj = {
            classId: classId,
            movieId: movieId,
            screenId: screenId,
            classPublishedId: classPublishedId,
            seatsPublishedId: seatsPublishedId,
            showDetailsId: showPublishedId,
            venueId: venueId
        }

        this.getFareDetails(reqObj)

    }

    async proceedPayment() {

        this.setState({ isSummaryDialogVisible: false, isSummaryNext: false })

        const { summaryName, summaryEmail, summaryMobile, venueData, selectedShow } = this.state

        const venueId = venueData.venueId

        let city = await Utils.getCity()
        const classId = this.state.selectedClassId
        const seatsPublishedId = this.state.selectedSeats
        const classPublishedId = this.state.classPublishedId
        const movieId = this.state.movieData.movieId
        const screenId = selectedShow.screenId
        let showPublishedId = this.state.selectedShow.showPublishedId

        let bookingObj = {
            customerEmail: summaryEmail,
            customerName: summaryName,
            customerPhone: summaryMobile,
            city: city,
            classId: classId,
            movieConsent: 'y',
            movieId: movieId,
            paymentMode: 1,
            screenId: screenId,
            showDetailsId: showPublishedId,
            venueConsent: 'y',
            venueId: venueId
        }

        let labelArray = []
        seatsPublishedId.map(item => { labelArray.push({ seatsPublishedId: item.seatsPublishedId, seatNumber: item.seatNumber }) })

        bookingObj = {
            ...bookingObj,
            seat_layout: { classes: { classPublishedId: classPublishedId, labels: labelArray } },
        }

        this.getPaymentDetails(bookingObj)

    }

    // API Calling 
    async fetchMovieShows(obj) {

        let body = { header: { callingAPI: "string", channel: "BOOKING-ANDROID", transactionId: "string" }, ...obj }
        let request = { method: 'POST', headers: await Utils.getHeader(), body: JSON.stringify(body) };
        let response = await fetch(Utils.endpoint.movieShows, request).then(res => res.json());

        if (response.status) {
            if (response.status.success) {
                const venueData = response.movie.venues
                this.setState({ venueData: venueData })
            } else {
                const statusDescription = response.status.statusDescription
                this.setState({ venueData: null, venueDataDesc: statusDescription })
            }
        }

    }

    async getFareDetails(requestObj) {

        this.setState({ isLoading: true })

        let header = await Utils.getHeader()
        let city = await Utils.getCity()

        let labelArray = []
        requestObj.seatsPublishedId.map(item => {
            labelArray.push({ seatsPublishedId: item.seatsPublishedId, seatNumber: item.seatNumber })
        })

        let body = {
            city: city,
            seat_layout: { classes: { classPublishedId: requestObj.classPublishedId, labels: labelArray } },
            showDetailsId: requestObj.showDetailsId,
            header: { callingAPI: "string", channel: "string", transactionId: "string" }
        }

        console.log('reserveBlockSeat body ' + JSON.stringify(body))
        let request = { method: 'POST', headers: header, body: JSON.stringify(body) };
        console.log('reserveBlockSeat request ' + JSON.stringify(request))
        console.log('reserveBlockSeat API ' + Utils.endpoint.getFareDetails)
        let response = await fetch(Utils.endpoint.getFareDetails, request).then(res => res.json());
        console.log('reserveBlockSeat response ' + JSON.stringify(response))
        this.setState({ reserveBlockResponse: response })
        this.setState({ isLoading: false })
        if (response.status) {
            if (response.status.statusCode && response.status.statusCode == '1001') {

                let totalSeatCount = response.total_seats_booked
                let fareResponseDetails = response.fareResponseDetails ? response.fareResponseDetails : null
                let subTotal = fareResponseDetails != null ? fareResponseDetails.subTotal : 0
                let internetHandlingCharges = ''
                let additionalCharges = ''

                let paymentInfo = { totalSeatCount, subTotal, internetHandlingCharges, additionalCharges }
                console.log('paymentInfo ' + JSON.stringify(paymentInfo))
                this.setState({ paymentInfo: paymentInfo, isSummaryDialogVisible: true })

            } else if (response.status.statusCode && response.status.statusCode != '1001') {

                this.setState({ isMessageDialogVisible: true, message: response.status.statusDescription })

            }
        } else {
            this.setState({ isMessageDialogVisible: true, message: errorMessage })
        }

    }

    async getPaymentDetails(requestObj) {

        this.setState({ isLoading: true })

        let header = await Utils.getHeader()

        let body = { ...requestObj, header: { calling_api: "reservationweb", channel: "BOOKING-WEB", transaction_id: "123" } }

        let request = { method: 'POST', headers: header, body: JSON.stringify(body) };
        console.log('getPaymentDetails request ' + JSON.stringify(request))
        let response = await fetch(Utils.endpoint.getPaymentDetails, request).then(res => res.json());
        console.log('getPaymentDetails response ' + JSON.stringify(response))
        this.setState({ isLoading: false })
        if (response.status) {
            if (response.status.statusCode && response.status.statusCode == '1001') {

                let paymentDetails = response.paymentDetails ? response.paymentDetails : null
                if (paymentDetails != null && paymentDetails.orderId) {
                    let cfToken = await this.generateCFToken(paymentDetails)
                    paymentDetails = { ...paymentDetails, cfToken }
                    this.props.navigation.navigate('Payment', paymentDetails)
                }

            } else if (response.status.statusCode && response.status.statusCode != '1001') {
                this.setState({ isMessageDialogVisible: true, message: response.status.statusDescription })
            }
        } else {
            this.setState({ isMessageDialogVisible: true, message: errorMessage })
        }

    }

    generateCFToken(bookingObj) {

        let cfToken = null

        return new Promise(async (resolve) => {

            let body = { orderId: bookingObj.orderId, orderAmount: bookingObj.orderAmount, orderCurrency: bookingObj.customerCurrency }
            let request = { method: 'POST', headers: await Utils.getPaymentTokenHeader(), body: JSON.stringify(body) };
            console.log('generateCFToken request ' + JSON.stringify(request))
            let response = await fetch(Utils.cashFree.test, request).then(res => res.json());
            console.log('generateCFToken ' + JSON.stringify(response))
            if (response.status && response.status == 'OK') {
                cfToken = response.cftoken
            }
            resolve(cfToken)

        })

    }

    // Deprecated
    async reserveBlockSeat(requestObj) {

        let header = await Utils.getHeader()
        let city = await Utils.getCity()

        let labelArray = []
        requestObj.seatsPublishedId.map(item => {
            labelArray.push({ seatsPublishedId: item.seatsPublishedId })
        })

        let body = {
            city: city,
            classId: requestObj.classId,
            movieId: requestObj.movieId,
            screenId: requestObj.screenId,
            seat_layout: {
                classes: {
                    classPublishedId: requestObj.classPublishedId,
                    labels: labelArray
                }
            },
            showDetailsId: requestObj.showDetailsId,
            venueId: requestObj.venueId,
            header: { callingAPI: "string", channel: "string", transactionId: "string" }
        }

        let request = { method: 'POST', headers: header, body: JSON.stringify(body) };
        console.log('reserveBlockSeat request ' + JSON.stringify(request))
        let response = await fetch(Utils.endpoint.reserveBlockSeats, request).then(res => res.json());
        console.log('reserveBlockSeat response ' + JSON.stringify(response))
        this.setState({ reserveBlockResponse: response, isSummaryDialogVisible: true })

        if (response.orderId != null) {

            let totalSeatCount = response.total_seats_booked
            let subTotal = response.total_amount.sub_total
            let internetHandlingCharges = ''
            let additionalCharges = ''

            let paymentInfo = {
                totalSeatCount,
                subTotal,
                internetHandlingCharges,
                additionalCharges
            }

            this.setState({ paymentInfo: paymentInfo })

        }

    }

    async bookTickets(obj) {

        let body = { header: { callingAPI: "string", channel: "string", transactionId: "string" }, ...obj }
        let request = { method: 'POST', headers: await Utils.getHeader(), body: JSON.stringify(body) };
        console.log('bookTickets request ' + JSON.stringify(request))
        let response = await fetch(Utils.endpoint.bookingSuccess, request).then(res => res.json());
        console.log('bookTickets ' + JSON.stringify(response))

    }

    // async generateCFToken(bookingObj) {

    //     let body = { orderId: bookingObj.orderId, orderAmount: '500', orderCurrency: 'INR' }
    //     let request = { method: 'POST', headers: await Utils.getPaymentTokenHeader(), body: JSON.stringify(body) };
    //     console.log('generateCFToken request ' + JSON.stringify(request))
    //     let response = await fetch(Utils.cashFree.test, request).then(res => res.json());
    //     console.log('generateCFToken ' + JSON.stringify(response))

    //     let paymentObj = {
    //         orderId: bookingObj.orderId,
    //         tokenData: response.cftoken
    //     }

    //     this.props.navigation.navigate('Payment', paymentObj)
    // }

    // proceedPayment() {

    //     this.setState({ isSummaryDialogVisible: false })
    //     const reserveBlockResponse = this.state.reserveBlockResponse

    //     let bookingObj = {
    //         customerEmail: 'amjath.tech@gmail.com',
    //         customerName: 'Amjath',
    //         customerPhone: '9659228080',
    //         location: 'chennai',
    //         orderId: reserveBlockResponse.orderId
    //     }

    //     this.generateCFToken(bookingObj)
    //     // this.bookTickets(bookingObj)

    // }

}

function mapStateToProps(state) {
    return {
        isLoading: state.seatLayoutReducer.isLoading,
        showTimes: state.seatLayoutReducer.showTimes,
        seatClasses: state.seatLayoutReducer.seatClasses,
        status: state.seatLayoutReducer.status,
        reserveBlockStatus: state.seatLayoutReducer.reserveBlockStatus
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
)(SeatLayout);



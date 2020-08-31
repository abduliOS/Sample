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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppColors from '../AppColors'
import { ScrollView } from 'react-native-gesture-handler';
import * as actions from './actions'
import Modal from "react-native-modal";
import Spinner from 'react-native-loading-spinner-overlay';

const backIcon = require('../../assets/left_arrow.png')

import DateSelector from '../../components/DateSelector'
import ShowTime from '../../components/ShowTime'

class MovieDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {

            isSeatDialogVisible: false,
            selectedVenueData: '',
            selectedShow: '',
            selectedDateIndex: 0,
            selectedDate: null,
            selectedSeatIndex: 2,
            availableTicketCount: []

        }

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        const showDates = nextProps.showDates
        const selectedDate = prevState.selectedDate

        if (selectedDate == null && showDates.length > 0) {

            return {
                selectedDate: showDates[0].showDate,
                selectedDateIndex: 0
            };
        }

        return null
    }

    render() {

        let array = this.state.availableTicketCount

        let showDates = this.props.showDates
        let showDateStatus = this.props.showDateStatus != null ? this.props.showDateStatus.statusDescription : ''

        const isSuccess = this.props.status != '' ? this.props.status.statusCode == 2001 ? true : false : false
        const statusDesc = this.props.status != '' ? this.props.status.statusDescription : ''

        return (
            <View style={styles.container} >

                <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {showDates.length > 0 ? showDates.map((res, index) => {
                        return (<TouchableOpacity key={`${index}`} onPress={() => { this.onClickShowDate(res.showDate, index) }} >
                            <DateSelector isSelected={index == this.state.selectedDateIndex ? true : false} data={res} />
                        </TouchableOpacity>)
                    }) : <Text style={styles.showDateError} >{showDateStatus}</Text>}
                </ScrollView>

                {isSuccess ?
                    <View>
                        <FlatList data={this.props.venues} keyExtractor={(j, i) => `${j.venueId}`} renderItem={({ item: j, index }) => {
                            return (
                                <View style={styles.cityListItem} >
                                    {this.renderFlatlistItem(j)}
                                </View>
                            );
                        }}
                        />
                    </View> : <View />
                }

                {isSuccess ? <View /> : <View><Text style={styles.statusDescText} >{statusDesc}</Text></View>}

                <Modal isVisible={this.state.isSeatDialogVisible} >
                    <View style={styles.seatCountContainer}>

                        <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.seatCountGradientContainer}>
                            <View style={styles.seatCountHeaderView} >
                                <TouchableOpacity style={styles.seatCountBackContainer} onPress={() => this.setState({ isSeatDialogVisible: false })} >
                                    <Image source={backIcon} style={styles.seatCountBackIcon} />
                                </TouchableOpacity>
                                <Text style={styles.seatCountText} >How many seats?</Text>
                                <View style={{ flex: 0.2 }} />
                            </View>

                            <View style={styles.seatCountListContainer} >
                                {array.map((item, index) => {
                                    return (<TouchableOpacity key={`${index}`} onPress={() => this.setState({ selectedSeatIndex: index + 1 })} style={[styles.seatItemContainer, { backgroundColor: this.state.selectedSeatIndex == index + 1 ? AppColors.DARK_PURPLE : AppColors.SHADE_GREEN }]} >
                                        <Text style={[styles.seatItemText, { color: this.state.selectedSeatIndex == index + 1 ? AppColors.SHADE_GREEN : AppColors.DARK_PURPLE }]} key={index} >{index + 1}</Text>
                                    </TouchableOpacity>)
                                })}
                            </View>

                            <TouchableOpacity style={styles.seatCountButtonContainer} onPress={() => this.navigateSeatSelection()} >
                                <Text style={styles.seatCountButtonText} >CONTINUE</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </Modal>

                <Spinner
                    visible={this.props.isLoading}
                    textContent={'Loading...'}
                    animation={'fade'}
                    textStyle={{ color: '#fff' }}
                />
            </View>
        );
    }

    renderFlatlistItem(item) {

        return (
            <View>
                <View style={styles.showsItemView} />
                <Text style={styles.showsItemText} >{item.venueName}</Text>
                <View style={styles.showsTimeContainer} >
                    {item.shows.map(res => {

                        const classes = res.classes
                        let availableSeats = 0
                        let totalSeats = 0

                        classes.map(item => {
                            availableSeats = availableSeats + item.availableSeats
                            totalSeats = totalSeats + item.totalSeats
                        })

                        let seatColor = '#fff'
                        let calculatedSeats = (availableSeats / totalSeats) * 100
                        if (calculatedSeats >= 50) {
                            seatColor = AppColors.SHOWS_GREEN
                        } else if (calculatedSeats < 50) {
                            seatColor = AppColors.SHOWS_ORANGE
                        } else if (calculatedSeats <= 10) {
                            seatColor = AppColors.SHOWS_RED
                        }

                        return (
                            <TouchableOpacity key={res.showPublishedId} onPress={() => this.onClickShow(item, res)} >
                                <ShowTime textColor={seatColor} data={res} />
                            </TouchableOpacity>)
                    })}
                </View>
            </View>
        )
    }

    async componentDidMount() {

        this.props.actions.movieDatesRequest(this.props.movieId)

    }

    navigateSeatSelection() {

        let showDates = this.props.showDates
        let movieData = this.props.movieData
        let venueData = this.state.selectedVenueData
        let seatCount = this.state.selectedSeatIndex
        let selectedDate = this.state.selectedDate
        let selectedShow = this.state.selectedShow

        if (seatCount == 0) {
            return
        }
        this.setState({ isSeatDialogVisible: false })
        this.props.navigation.navigate('SeatLayout', { selectedDate: selectedDate, seatCount: seatCount, showDates: showDates, movieData: movieData, venueData: venueData, selectedShow: selectedShow });
    }

    onClickShow(venueData, selectedShow) {

        let availableSeats = 0

        let classes = selectedShow.classes
        classes.map((item, index) => { availableSeats = availableSeats + item.availableSeats })

        let ticketCount = availableSeats > 10 ? 10 : availableSeats
        let ticketCountArray = []
        for (var i = 0; i < ticketCount; i++) { ticketCountArray.push(i) }
        this.availableTicketCount = ticketCountArray
        this.setState({ availableTicketCount: ticketCountArray })
        this.setState({ isSeatDialogVisible: true, selectedVenueData: venueData, selectedShow: selectedShow })
    }

    onClickShowDate(showDate, index) {

        this.setState({ selectedDateIndex: index, selectedDate: showDate });

        let reqObj = {
            movie_id: this.props.movieId,
            showDate: showDate
        }

        this.props.actions.movieShowsRequest(reqObj)

    }

}

function mapStateToProps(state) {
    return {
        isLoading: state.movieShowReducer.isLoading,
        showDates: state.movieShowReducer.showDates,
        showDateStatus: state.movieShowReducer.showDateStatus,
        status: state.movieShowReducer.status,
        venues: state.movieShowReducer.venues
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
)(MovieDetail);

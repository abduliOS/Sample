/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppColors from '../AppColors'
import { ScrollView } from 'react-native-gesture-handler';
import * as actions from './actions'
import Modal from "react-native-modal";
import moment from 'moment'
import Spinner from 'react-native-loading-spinner-overlay';

const backIcon = require('../../assets/left_arrow.png')

import DateSelector from '../../components/DateSelector'
import TimeSlot from '../../components/TimeSlot'
import ExperienceItem from '../../components/ExperienceItem'
import ClassItem from '../../components/ClassItem'

class MovieDetail extends Component {

    constructor(props) {
        super(props)

        this.movieData = this.props.movieData

        this.state = {

            showDates: [],
            selectedExperienceIndex: null,
            selectedClassList: [],
            selectedTimeSlotIndex: null,
            selectedTimeSlot: {},
            selectedClassIndex: null,
            selectedClass: {},
            selectedVenueIndex: null,
            selectedVenue: {},
            selectedDateIndex: 0,
            selectedDate: null,

            isSeatDialogVisible: false,
            selectedVenueData: '',
            selectedShow: '',
            selectedSeatIndex: 0,
            availableTicketCount: []

        }

    }

    render() {

        let { showDates } = this.state
        const timeSlot = this.props.timeSlot
        const venuesFilteredList = this.props.venuesFilteredList
        let showDateStatus = this.props.showDateStatus != null ? this.props.showDateStatus.statusDescription : ''

        return (
            <View style={styles.container} >

                <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {showDates.length > 0 ? showDates.map((res, index) => {
                        return (<TouchableOpacity onPress={() => { this.onClickShowDate(res.showDate, index) }} key={res.date} >
                            <DateSelector isSelected={index == this.state.selectedDateIndex ? true : false} data={res} />
                        </TouchableOpacity>)
                    }) : <Text style={styles.showDateError} >{showDateStatus}</Text>}
                </ScrollView>

                <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {timeSlot.length > 0 ? timeSlot.map((res, index) => {
                        return (<TouchableOpacity onPress={() => { this.onClickTimeSlot(res, index) }} key={res.date} >
                            <TimeSlot isSelected={index == this.state.selectedTimeSlotIndex ? true : false} data={res} />
                        </TouchableOpacity>)
                    }) : <Text style={styles.showDateError} >{showDateStatus}</Text>}
                </ScrollView>

                <View>

                    <FlatList
                        style={styles.venueList}
                        data={venuesFilteredList}
                        keyExtractor={item => item.venueId}
                        horizontal={false}
                        renderItem={({ item, index }) => this.renderVenueList(item, index)}
                    />

                    <TouchableOpacity style={styles.spButtonContainer} onPress={() => this.schedulePreference()} >
                        <Text style={styles.spButtonText} >{`SCHEDULE PREFERENCES`}</Text>
                    </TouchableOpacity>

                </View>

                {this.renderSeatsDialog()}

                <Spinner
                    visible={this.props.isLoading}
                    textContent={'Loading...'}
                    animation={'fade'}
                    textStyle={{ color: '#fff' }}
                />
            </View>
        );
    }

    onClickShowDate(showDate, index) {
        this.setState({ selectedDateIndex: index, selectedDate: showDate });
    }

    onClickTimeSlot(timeSlot, index) {
        this.setState({ selectedTimeSlotIndex: index, selectedTimeSlot: timeSlot })
    }

    renderVenueList(item, index) {

        const venueName = item.venueName
        const venueAddress = item.addressLine1

        const experienceList = this.props.experienceList
        const screens = this.state.selectedClassList
        const classList = screens.length > 0 ? screens[0].classes : []

        const selectedVenueIndex = this.state.selectedVenueIndex

        return (
            <View>
                <TouchableOpacity style={styles.venueItemView} onPress={() => this.onClickVenue(item, index)} >
                    <Text style={styles.venueItemText} >{`${venueName} -  ${venueAddress}`}</Text>
                </TouchableOpacity>

                {selectedVenueIndex == index ? <ScrollView style={{ flex: 1, marginTop: 5 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {experienceList.length > 0 ? experienceList.map((res, index) => {
                        return (<TouchableOpacity onPress={() => { this.onClickExperience(res.screens, index) }} key={res.date} >
                            <ExperienceItem isSelected={index == this.state.selectedExperienceIndex ? true : false} data={res.experienceName} />
                        </TouchableOpacity>)
                    }) : null}
                </ScrollView> : null}

                {selectedVenueIndex == index ? <ScrollView style={{ flex: 1, marginTop: 5 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {classList.length > 0 ? classList.map((res, index) => {
                        return (<TouchableOpacity onPress={() => { this.onClickClass(res, index) }} key={res.date} >
                            <ClassItem isSelected={index == this.state.selectedClassIndex ? true : false} data={res} />
                        </TouchableOpacity>)
                    }) : null}
                </ScrollView> : null}


            </View>
        )
    }

    onClickVenue(item, index) {

        this.setState({ selectedVenueIndex: index, selectedVenue: item })

        this.setState({ selectedExperienceIndex: null, selectedClassList: [] })
        this.setState({ selectedClassIndex: null, selectedClass: {} })

        this.props.actions.experienceListRequest(item.venueId)

    }

    onClickExperience(screens, index) {
        this.setState({ selectedExperienceIndex: index, selectedClassList: screens })
    }

    onClickClass(selectedClass, index) {
        this.setState({ selectedClassIndex: index, selectedClass: selectedClass })
    }

    renderSeatsDialog() {

        let array = this.state.availableTicketCount

        return (<View>
            <Modal isVisible={this.state.isSeatDialogVisible} >
                <View style={styles.sDContainer}>

                    <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.sDGradientContainer}>
                        <View style={styles.sDHeaderContainer} >
                            <TouchableOpacity style={styles.sDBackContainer} onPress={() => this.setState({ isSeatDialogVisible: false })} >
                                <Image source={backIcon} style={styles.sDBackIcon} />
                            </TouchableOpacity>
                            <Text style={styles.sDHeaderText} >How many seats?</Text>
                            <View style={styles.sDHeaderRightView} />
                        </View>

                        <View style={styles.sDSeatContainer} >
                            {array.map((item, index) => {
                                return (<TouchableOpacity onPress={() => this.setState({ selectedSeatIndex: index + 1 })} style={[{ backgroundColor: this.state.selectedSeatIndex == index + 1 ? AppColors.DARK_PURPLE : AppColors.SHADE_GREEN }, styles.sDSeatIconContainer]} >
                                    <Text style={[{ color: this.state.selectedSeatIndex == index + 1 ? AppColors.SHADE_GREEN : AppColors.DARK_PURPLE }, styles.sDSeatIconText]} key={index} >{index + 1}</Text>
                                </TouchableOpacity>)
                            })}
                        </View>

                        <TouchableOpacity style={styles.sDNextBtnContainer} onPress={() => this.navigateSeatSelection()} >
                            <Text style={styles.sDNextBtnText} >CONTINUE</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </Modal>
        </View>)
    }

    async componentDidMount() {

        let showDates = []
        let dateObj = {
            showDate: this.movieData.releaseDate,
            day: moment(Math.floor(new Date(this.movieData.releaseDate))).format('MMM')
        }
        showDates.push(dateObj)

        this.setState({ showDates: showDates })

        //TimeSlot Request
        this.props.actions.timeSlotRequest()
        this.props.actions.cinemaListRequest()

    }

    schedulePreference() {

        let showDate = this.state.selectedDate
        let movieId = this.movieData.movieId
        let classId = this.state.selectedClass.classId
        let screenId = this.state.selectedClassList[0].screenId
        let timeSlotId = this.state.selectedTimeSlot.timeId
        let venueId = this.state.selectedVenue.venueId

        let preferences = {
            bookingStatus: 'New',
            bookingType: '',
            classId: classId,
            movieId: movieId,
            screenId: screenId,
            seatCount: 2,
            showDate: showDate,
            timeSlotId: timeSlotId,
            venueId: venueId
        }

        this.props.actions.scheduleBookingRequest(preferences)

    }

}

function mapStateToProps(state) {
    return {
        isLoading: state.movieShowReducer.isLoading,
        timeSlot: state.movieShowReducer.timeSlot,
        venuesFilteredList: state.cinemasReducer.venuesFilteredList,
        experienceList: state.movieShowReducer.experienceList,
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

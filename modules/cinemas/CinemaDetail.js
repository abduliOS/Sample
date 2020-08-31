/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, ScrollView } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppColors from '../AppColors'
import Header from '../../components/Header'
import NetInfo from "@react-native-community/netinfo";
import Spinner from 'react-native-loading-spinner-overlay';
import DateSelector from '../../components/DateSelector'
import ShowTime from '../../components/ShowTime'

class CinemaDetail extends Component {

    constructor(props) {
        super(props)

        const { navigation } = this.props;
        this.venueData = navigation.state.params

        this.state = {
            isNetworkConnected: null,
            dateSelectedIndex: null,
            dateSelected: null
        }
    }

    componentWillMount() {
        this.checkNetworkConnectivity()
    }

    checkNetworkConnectivity() {
        NetInfo.fetch().then(state => { this.setState({ isNetworkConnected: state.isConnected }) });
        NetInfo.addEventListener(state => { this.setState({ isNetworkConnected: state.isConnected }) });
    }

    render() {

        const venueName = this.venueData.venueName
        const venueLocation = this.venueData.addressLine1

        const showDates = this.props.showDates
        const showDatesDesc = this.props.showDatesStatus != null ? this.props.showDatesStatus.statusDescription : ''

        const movieList = this.props.movieList
        const movieListDesc = this.props.movieListStatus != null ? this.props.movieListStatus.statusDescription : ''

        showDates.length > 0 ? this.updateShowDate(showDates[0]) : null

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                <Header navigation={this.props.navigation} />

                <View style={styles.venueHeader} >
                    <Text style={styles.venueHeaderText} >{`${venueName} ${venueLocation}`}</Text>
                </View>

                <View style={styles.bodyContainer} >
                    <ScrollView style={styles.showDatesContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                        {showDates.length > 0 ? showDates.map((res, index) => {
                            return (<TouchableOpacity onPress={() => { this.onClickShowDate(res.showDate, index) }} key={res.date} >
                                <DateSelector isSelected={index == this.state.dateSelectedIndex ? true : false} data={res} />
                            </TouchableOpacity>)
                        }) : <Text style={styles.showDateError} >{showDatesDesc}</Text>}
                    </ScrollView>

                    {movieList.length > 0 ?
                        <View>
                            <FlatList data={movieList} keyExtractor={(j, i) => `${j.movieId}`} renderItem={({ item: j, index }) => {
                                return (<TouchableOpacity> {this.renderFlatlistItem(j)}</TouchableOpacity>);
                            }} />
                        </View> : <View />}
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

    renderFlatlistItem(item) {

        return (
            <View>
                <View style={styles.showContainer} />
                <View style={styles.movieInfoContainer} >
                    <Text style={styles.movieInfoText} >{item.movieName}</Text>
                    <Text style={styles.movieInfoText} >{`${item.language} ${item.dimension}`}</Text>
                </View>
                <View style={styles.showTimeContainer} >
                    {item.shows.map(res => {
                        return (
                            <TouchableOpacity key={res.showPublishedId} onPress={() => this.onClickShow(item, res)} >
                                <ShowTime data={res} />
                            </TouchableOpacity>)
                    })}
                </View>
            </View>
        )
    }

    updateShowDate(date) {

        let dateSelectedIndex = this.state.dateSelectedIndex

        if (dateSelectedIndex == null) {
            this.setState({ dateSelectedIndex: 0, dateSelected: date.showDate })
        }

    }

    onClickShowDate(showDate, index) {

        this.setState({ dateSelectedIndex: index, dateSelected: showDate });

        const venueId = this.venueData.venueId
        let reqObj = { showDate: showDate, venueId: venueId }

        this.props.actions.showTimeRequest(reqObj)

    }

    componentDidMount() {
        const venueId = this.venueData.venueId
        this.props.actions.venueDatesRequest(venueId)
    }

}

function mapStateToProps(state) {
    return {
        isLoading: state.cinemasDetailReducer.isLoading,
        showDates: state.cinemasDetailReducer.showDates,
        showDatesStatus: state.cinemasDetailReducer.showDatesStatus,
        movieList: state.cinemasDetailReducer.movieList,
        movieListStatus: state.cinemasDetailReducer.movieListStatus,
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
)(CinemaDetail);

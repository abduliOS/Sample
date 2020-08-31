/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, Image, Text, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import MovieItem from '../../components/MovieItem'
import * as AppColors from '../AppColors'
import Header from '../../components/Header'
import * as AppCosnstants from '../AppConstants'
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment'
import * as actions from './actions'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const closeIcon = require('../../assets/close.png')
const editIcon = require('../../assets/edit.png')
const ratingSelectedIcon = require('../../assets/rating_selected.png')

class Venues extends Component {

    constructor() {
        super()

        this.state = {

        }

    }

    render() {

        const venuesList = this.props.venuesList

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>
                <Header enableBack={true} navigation={this.props.navigation} />
                <FlatList
                    style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}
                    data={venuesList}
                    keyExtractor={item => item.venueId}
                    horizontal={false}
                    renderItem={({ item, index }) => {

                        const venueName = item.venueName

                        return (<TouchableOpacity style={styles.venueItemView} >
                            <Text style={{ color: '#5c4a5c', fontSize: 15, marginTop: 10 }} >{`${venueName}`}</Text>
                        </TouchableOpacity>)
                    }}
                />

            </LinearGradient>
        );
    }

    componentDidMount(){
        this.props.actions.venuesListRequest()
    }

}

// export default MovieDetail
function mapStateToProps(state) {
    return {
        isLoading: state.profileReducer.isLoading,
        venuesList: state.profileReducer.venuesList,
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
)(Venues);


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import MovieItem from '../../components/MovieItem'
import * as AppColors from '../AppColors'
import Header from '../../components/Header'
import NetInfo from "@react-native-community/netinfo";
// import NetworkInfo from '../../components/NetworkInfo'
import Spinner from 'react-native-loading-spinner-overlay';

const searchIcon = require('../../assets/search.png')

class Cinemas extends Component {

    constructor() {
        super()
        this.state = {
            isNetworkConnected: null
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


        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                <Header navigation={this.props.navigation} />

                <View style={styles.searchContainer} >
                    <TextInput style={styles.searchTextInput} onChangeText={(txt) => this.searchCinemas(txt)} />
                    <Image source={searchIcon} style={styles.searchIcon} />
                </View>

                {this.renderGridView()}

                <Spinner
                    visible={this.props.isLoading}
                    textContent={'Loading...'}
                    animation={'fade'}
                    textStyle={{ color: '#fff' }}
                />

            </LinearGradient>
        );
    }

    renderGridView() {

        const filteredData = this.props.venuesFilteredList

        return (
            <View style={styles.gridContainer}>
                <FlatList
                    style={styles.searchList}
                    data={filteredData}
                    keyExtractor={item => item.venueId}
                    horizontal={false}
                    renderItem={({ item, index }) => {

                        const venueName = item.venueName
                        const venueAddress = item.addressLine1

                        return (<TouchableOpacity style={styles.venueItemView} onPress={() => this.props.navigation.navigate('CinemaDetail', item)} >
                            <Text style={styles.venueItemText} >{`${venueName} -  ${venueAddress}`}</Text>
                        </TouchableOpacity>)
                    }}
                />
            </View>
        )
    }

    componentDidMount() {

        this.props.actions.cinemaListRequest()

    }

    searchCinemas(_searchText) {

        this.props.actions.searchCinemas(_searchText)

    }

}

function mapStateToProps(state) {
    return {
        venuesFilteredList: state.cinemasReducer.venuesFilteredList
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
)(Cinemas);

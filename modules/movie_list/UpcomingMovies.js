/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MovieItem from '../../components/MovieItem'
import * as AppColors from '../AppColors'
import Header from '../../components/Header'
import NetInfo from "@react-native-community/netinfo";
import NetworkInfo from '../../components/NetworkInfo'
import Spinner from 'react-native-loading-spinner-overlay';
import PTRView from 'react-native-pull-to-refresh';
import * as Animatable from 'react-native-animatable';

class UpcomingMovies extends Component {

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

        const isNetworkConnected = this.state.isNetworkConnected
        const movieList = this.props.upcomingMovies
        const isSuccess = movieList.length > 0 ? true : false

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                {isNetworkConnected == false ? <NetworkInfo checkNetworkConnectivity={this.checkNetworkConnectivity} /> : null}

                {isNetworkConnected == true ? <Header navigation={this.props.navigation} /> : null}
                {isNetworkConnected == true ? isSuccess ? <Text style={styles.headerText} >Upcoming Movies</Text> : null : null}
                {isNetworkConnected == true ? isSuccess ? this.renderGridView() : this.renderStatus() : null}

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

        const movieList = this.props.upcomingMovies

        return (
            <PTRView onRefresh={() => this.getMovieList()} style={styles.gridContainer}>
                <FlatList
                    columnWrapperStyle={styles.movieList}
                    data={movieList}
                    keyExtractor={item => item.movieId}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item, index }) => {

                        let paramObj = {
                            ...item,
                            isUpcoming: true
                        }

                        return (<TouchableOpacity key={item.movieId} style={styles.movieItemView} onPress={() => this.props.navigation.navigate('MovieDetail', paramObj)} >
                            <MovieItem isUpcoming={true} movieId={item.movieId} movieName={item.movieName} posterUrl={item.posterUrl} language={item.language} dimension={item.dimension} censorCertificate={item.censorCertificate} upVotes={item.upVotes} />
                        </TouchableOpacity>)
                    }}
                />
            </PTRView>
        )
    }

    renderStatus() {

        const status = this.props.status
        const statusDescription = status != null ? status.statusDescription ? status.statusDescription : '' : ''

        return (
            <PTRView onRefresh={() => this.getMovieList()} contentContainerStyle={styles.statusContainer} >
                <Animatable.Text animation={'zoomIn'} easing="ease-out" style={styles.noNetworkText} >{statusDescription}</Animatable.Text>
            </PTRView>
        )
    }

    async componentDidMount() {

        this.getMovieList()

    }

    getMovieList() {

        this.props.actions.upcomingMoviesRequest()

    }

}

function mapStateToProps(state) {
    return {
        isLoading: state.movieListReducer.isLoading,
        upcomingMovies: state.movieListReducer.upcomingMovies,
        upcomingStatus: state.movieListReducer.upcomingStatus,
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
)(UpcomingMovies);

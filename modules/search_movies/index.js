/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, ScrollView } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as actions from "../movie_list/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppColors from '../AppColors'
import Header from '../../components/Header'
import MovieItem from '../../components/MovieItem'
import { TextInput } from 'react-native-gesture-handler';

const searchIcon = require('../../assets/search.png')

class SearchMovies extends Component {

    constructor() {
        super()

        this.state = {
            searchText: '',
            filteredData: []
        }

    }

    render() {

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                <Header navigation={this.props.navigation} />

                <View style={styles.searchContainer} >
                    <TextInput style={styles.searchTextInput} onChangeText={(txt) => this.searchMovies(txt)} />
                    <Image source={searchIcon} style={styles.searchIcon} />
                </View>

                {this.renderGridView()}

            </LinearGradient>
        );
    }

    renderGridView() {

        const filteredData = this.props.filteredData

        return (
            <View style={styles.gridContainer}>
                <FlatList
                    columnWrapperStyle={styles.searchList}
                    data={filteredData}
                    keyExtractor={item => item.movieId}
                    horizontal={false}
                    numColumns={2}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity key={item.movieId} style={styles.movieItemView} onPress={() => this.props.navigation.navigate('MovieDetail', item)} >
                            <MovieItem movieId={item.movieId} movieName={item.movieName} posterUrl={item.posterUrl} language={item.language} dimension={item.dimension} censorCertificate={item.censorCertificate} upVotes={item.upVotes} />
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    searchMovies(_searchText) {

        this.props.actions.searchMovie(_searchText)

    }

}

function mapStateToProps(state) {
    return {
        data: state.movieListReducer.data,
        filteredData: state.movieListReducer.filteredData
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
)(SearchMovies);



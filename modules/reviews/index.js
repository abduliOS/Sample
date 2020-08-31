/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, ScrollView, AsyncStorage } from 'react-native';
import styles from './styles'
// import * as actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppConstants from '../AppConstants'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../../components/Header'

const userPlaceholder = require('../../assets/user_place_holder.png')

import * as AppColors from '../AppColors'

class Reviews extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isUserVisible: true,
            isCriticVisible: true
        }

    }

    render() {

        const userReview = this.props.userReview
        const criticReview = this.props.criticReview

        const movieName = this.props.navigation.getParam('movieName', 'NA');

        console.log('userReview ' + JSON.stringify(userReview))
        console.log('criticReview ' + JSON.stringify(criticReview))

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={[styles.container]}>

                <Header navigation={this.props.navigation} />

                <ScrollView>

                    <View style={{ paddingLeft: 15 }} >
                        <Text style={{ padding: 2, color: '#f2f1f1', fontSize: 18 }} >{movieName}</Text>
                    </View>

                    <TouchableOpacity style={{ padding: 15, backgroundColor: this.state.isUserVisible == true ? '#49384d' : '#5e535d' }} onPress={() => this.setState(previousState => ({ isUserVisible: !previousState.isUserVisible }))} >
                        <Text style={{ padding: 2, color: '#f2f1f1', fontSize: 18 }} >User Reviews</Text>
                    </TouchableOpacity>

                    {this.state.isUserVisible == true ? <View style={{ padding: 15 }} >
                        {userReview.map((item, index) => {

                            let title = item.title ? item.title : ''

                            return (
                                <View style={{ paddingTop: 5, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#49384d' }} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                                        <Image source={userPlaceholder} resizeMode={'contain'} style={{ flex: 0.1, width: 25, height: 25, borderRadius: 10, elevation: 10 }} />
                                        <Text style={{ flex: 0.7, padding: 2, color: '#f2f1f1', marginLeft: 5 }} >The Indian</Text>
                                        <Text style={{ flex: 0.2, padding: 2, color: '#f2f1f1', textAlign: 'right' }} >{item.rating}%</Text>
                                    </View>

                                    <View style={{ marginTop: 10 }} >
                                        <Text style={{ color: '#4b3852', fontSize: 15 }} >{title}</Text>
                                        <Text style={{ color: '#4b3852', fontSize: 12, marginTop: 5 }} >{item.comments}</Text>
                                    </View>

                                </View>
                            )

                        })}
                    </View> : null}

                    <TouchableOpacity style={{ padding: 15, backgroundColor: this.state.isCriticVisible == true ? '#49384d' : '#5e535d' }} onPress={() => this.setState(previousState => ({ isCriticVisible: !previousState.isCriticVisible }))} >
                        <Text style={{ padding: 2, color: '#f2f1f1', fontSize: 18 }} >Critics Reviews</Text>
                    </TouchableOpacity>

                    {this.state.isCriticVisible == true ? <View style={{ padding: 15 }} >
                        {criticReview.map((item, index) => {

                            let title = item.title ? item.title : ''

                            return (
                                <View style={{ paddingTop: 5, paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: '#49384d' }} >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                                        <Image source={userPlaceholder} resizeMode={'contain'} style={{ flex: 0.1, width: 25, height: 25, borderRadius: 10, elevation: 10 }} />
                                        <Text style={{ flex: 0.7, padding: 2, color: '#f2f1f1', marginLeft: 5 }} >The Indian</Text>
                                        <Text style={{ flex: 0.2, padding: 2, color: '#f2f1f1', textAlign: 'right' }} >{item.rating}%</Text>
                                    </View>

                                    <View style={{ marginTop: 10 }} >
                                        <Text style={{ color: '#4b3852', fontSize: 15 }} >{title}</Text>
                                        <Text style={{ color: '#4b3852', fontSize: 12, marginTop: 5 }} >{item.comments}</Text>
                                    </View>

                                </View>
                            )

                        })}
                    </View> : null}
                </ScrollView>
            </LinearGradient>
        );
    }

    componentDidMount() {

        // let reqObj = {
        //     // movie_id: this.props.movieId,
        //     movieId: '17'
        // }

        // this.props.actions.criticsReviewRequest(reqObj)
        // this.props.actions.userReviewRequest(reqObj)

    }

    renderSection(type) {

        return (<View></View>)

    }

}

function mapStateToProps(state) {
    return {
        criticReview: state.castCrewReducer.criticsReviews,
        userReview: state.castCrewReducer.userReviews
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
)(Reviews);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, AsyncStorage, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import MovieItem from '../../components/MovieItem'
import * as AppColors from '../AppColors'
import Header from '../../components/Header'
import * as AppCosnstants from '../AppConstants'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const closeIcon = require('../../assets/close.png')
const ratingSelectedIcon = require('../../assets/rating_selected.png')

class Profile extends Component {

    constructor() {
        super()



    }

    render() {

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                <Header enableBack={true} navigation={this.props.navigation} />

                <View style={{ flex: 1, marginLeft: 15, marginRight: 15 }} >

                    {this.renderUserDetails()}

                </View>

            </LinearGradient>
        );
    }

    renderUserDetails() {

        return (
            <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.gridContainer}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Image source={null} style={{ width: 12, height: 12 }} />
                    <Text style={styles.headerTitle} >Profile</Text>
                    <TouchableOpacity  style={{ justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }} >
                        <Image source={ratingSelectedIcon} style={{ width: 12, height: 12 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'column' }} >

                    <View style={{ marginTop: 10 }} >
                        <Text style={styles.profileLabel} >Name:</Text>
                        <Text style={styles.profileValue} >Bhuvaneshwaran Duraisamy</Text>
                        <View style={styles.profileView} />
                    </View>

                    <View style={{ marginTop: 10 }} >
                        <Text style={styles.profileLabel} >Mobile:</Text>
                        <Text style={styles.profileValue} >+919994403584</Text>
                        <View style={styles.profileView} />
                    </View>

                    <View style={{ marginTop: 10 }} >
                        <Text style={styles.profileLabel} >Email:</Text>
                        <Text style={styles.profileValue} >bhuvan@lixotechnologies.com</Text>
                        <View style={styles.profileView} />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }} >

                        <View style={{ width: '45%' }} >
                            <Text style={styles.profileLabel} >Birth Date:</Text>
                            <Text style={styles.profileValue} >29-Mar-1989</Text>
                            <View style={styles.profileView} />
                        </View>

                        <View style={{ width: '45%' }} >
                            <Text style={styles.profileLabel} >Location:</Text>
                            <Text style={styles.profileValue} >Chennai</Text>
                            <View style={styles.profileView} />
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }} >

                        <View style={{ width: '45%' }} >
                            <Text style={styles.profileLabel} >Married?</Text>
                            <Text style={styles.profileValue} >Yes</Text>
                            <View style={styles.profileView} />
                        </View>

                        <View style={{ width: '45%' }} >
                            <Text style={styles.profileLabel} >Anniversary Date:</Text>
                            <Text style={styles.profileValue} >29-Mar-1989</Text>
                            <View style={styles.profileView} />
                        </View>

                    </View>

                </View>

            </LinearGradient>
        )
    }

    async componentDidMount() {

        let isLoggedIn = await AsyncStorage.getItem(AppCosnstants.IS_LOGGED_IN)
        // this.setState({ isLoggedIn: isLoggedIn })

        if (!isLoggedIn) {
            return
        }

    }

}

export default Profile

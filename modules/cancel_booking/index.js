/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import MovieItem from '../../components/MovieItem'
import * as AppColors from '../AppColors'
import Header from '../../components/Header'

const closeIcon = require('../../assets/close.png')
const qrIcon = require('../../assets/sample_qr.png')

class CancelBooking extends Component {

    constructor() {
        super()

    }

    render() {

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                <Header navigation={this.props.navigation} />

                <View style={{ flex: 1, marginLeft: 15, marginRight: 15 }} >
                    <Text style={{ fontSize: 18, color: '#cbcec0', marginBottom: 5 }} >Booking Details</Text>
                    <Image resizeMode={'stretch'} style={{ width: '100%', height: 120, borderRadius: 5 }} source={{ uri: 'https://data1.ibtimes.co.in/cache-img-850-417/en/full/711289/1553760517_vijay-sethupathiin-super-deluxe.jpg' }} />
                    {this.renderGridView()}
                    {this.renderUserPreferences()}
                </View>

            </LinearGradient>
        );
    }

    renderGridView() {

        return (
            <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.gridContainer}>

                <View style={{ flexDirection: 'row' }} >

                    <View style={{ flex: 1.2, alignContent: 'center' }} >
                        <Text style={styles.itemTitleText} >Captan Marvel</Text>
                        <Text style={styles.itemInfoText} >Tamil   3D   UA</Text>
                        <Text style={styles.itemInfoText} >Luxe Cinemas: Chennai</Text>
                        <Text style={styles.itemInfoText} >Sunday, 3 Mar | 11:00 AM</Text>
                        <Text style={styles.itemInfoText} >Screen 4 | Diamond</Text>
                    </View>

                    <View style={{ flex: 0.8 }} >
                        <Image resizeMode={'contain'} source={qrIcon} style={styles.coverImage} />
                        <Text style={[styles.itemInfoText, { textAlign: 'center' }]} >MVP0003232</Text>
                    </View>

                </View>

                <View style={{ height: 1, backgroundColor: '#ced2c3', marginTop: 10 }} />

                <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }} >
                    <Text style={{ fontSize: 15, color: '#ced2c3', width: '40%' }} >C1, C2, C3, C4, C5, C6, C7, C8, C9, C10</Text>
                    <Text style={{ fontSize: 15, color: '#ced2c3', textAlign: 'center', width: '40%' }} ><Text style={{ fontSize: 18, color: '#ced2c3', textAlign: 'center' }} >10</Text>{"\n"}Tickets</Text>
                </View>

            </LinearGradient>
        )
    }

    renderUserPreferences() {

        return (
            <LinearGradient colors={AppColors.PREFERENCE_GRADIENT} style={styles.preferenceContainer}>

                <View style={{ flex: 1 }} >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }} >
                        <Text style={{ color: '#45344c' }} >Sub Total</Text>
                        <Text style={{ color: '#45344c' }}  >$ 158.6</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }} >
                        <Text style={{ color: '#45344c' }} >Internet Handling Charges</Text>
                        <Text style={{ color: '#45344c' }}  >$ 64.90</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }} >
                        <Text style={{ color: '#45344c' }} >Additional Charges</Text>
                        <Text style={{ color: '#45344c' }}  >$ 10.0</Text>
                    </View>

                </View>

                <TouchableOpacity style={styles.loginBtnContainer} >
                    <Text style={styles.rateMovieText} >CANCEL TICKET</Text>
                </TouchableOpacity>

            </LinearGradient>
        )

    }

    componentDidMount() {


    }

}

export default CancelBooking

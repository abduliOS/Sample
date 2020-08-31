/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import MovieItem from '../../components/MovieItem'
import * as AppColors from '../AppColors'
import Header from '../../components/Header'

const closeIcon = require('../../assets/close.png')

class UpcomingBookings extends Component {

    constructor() {
        super()

    }

    render() {

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                <Header navigation={this.props.navigation} />

                <View style={{ flex: 1, marginLeft: 15, marginRight: 15 }} >

                    <Text style={{ fontSize: 18, color: '#cbcec0', marginBottom: 5 }} >Upcoming Bookings</Text>

                    {this.renderGridView()}

                    <View style={{ height: 1, backgroundColor: '#4c3a4e', marginTop: 10, marginLeft: 10, marginRight: 10 }} />

                    <Text style={{ fontSize: 18, color: '#cbcec0', marginTop: 10, marginBottom: 5 }} >Past Bookings</Text>

                    {this.renderGridView()}

                    <View style={{ height: 1, backgroundColor: '#4c3a4e', marginTop: 10, marginLeft: 10, marginRight: 10 }} />


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

                        <Image resizeMode={'contain'} source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Super_Deluxe_poster.jpg/220px-Super_Deluxe_poster.jpg' }} style={styles.coverImage} />

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

    componentDidMount() {


    }

}

export default UpcomingBookings

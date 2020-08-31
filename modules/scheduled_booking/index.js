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

class ScheduledBooking extends Component {

    constructor() {
        super()

    }

    render() {

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                <Header navigation={this.props.navigation} />

                <View style={{ flex: 1,  marginLeft: 15, marginRight: 15 }} >

                    <Text style={{ fontSize: 18, color: '#cbcec0', marginBottom: 5 }} >Scheduled Booking Preferences</Text>

                    {this.renderGridView()}

                    <View style={{ height: 1, backgroundColor: '#4c3a4e', marginTop: 10, marginLeft: 10, marginRight: 10 }} />
                    
                </View>

            </LinearGradient>
        );
    }

    renderGridView() {

        return (
            <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.gridContainer}>

                    <View>
                        <Image resizeMode={'contain'} source={closeIcon} style={{ width: 10, height: 10, margin: 8, alignSelf: 'flex-end' }} />
                    </View>

                    <View style={{ flexDirection: 'row', paddingBottom: 10, paddingLeft: 35, paddingRight: 35 }} >

                        <View style={{ flex: 1.2, alignContent: 'center' }} >

                            <Text style={styles.itemTitleText} >Captan Marvel</Text>

                            <Text style={styles.itemInfoText} >Tamil   3D   UA</Text>

                            <Text style={styles.itemInfoText} >Luxe Cinemas: Chennai</Text>

                            <Text style={styles.itemInfoText} >Sunday, 3 Mar</Text>

                            <Text style={styles.itemInfoText} >09.00 AM - 12.00 PM</Text>

                            <Text style={styles.itemInfoText} >Diamond | 10 Seats</Text>


                        </View>

                        <View style={{ flex: 0.8 }} >

                            <Image resizeMode={'contain'} source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Super_Deluxe_poster.jpg/220px-Super_Deluxe_poster.jpg' }} style={styles.coverImage} />

                        </View>

                    </View>

            </LinearGradient>
        )
    }

    componentDidMount() {


    }

}

export default ScheduledBooking

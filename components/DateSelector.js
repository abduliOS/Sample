/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment'

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class MovieItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        var data = this.props.data

        var date = moment(Math.floor(new Date(data.showDate))).format('DD');

        var isSelected = this.props.isSelected
        const bgColor = isSelected ? '#645168' : '#d6debf'
        const txtColor = isSelected ? '#d6debf' : '#645168'

        return (
            <View style={styles.container}>

                <View style={{ padding: 5, backgroundColor: bgColor, width: 60, height: 55, elevation: 5, borderRadius: 5, justifyContent: 'center' }} >

                    <Text style={{ textAlign: 'center', color: txtColor, fontSize: screenWidth / 28 }} >{data.day}</Text>
                    <Text style={{ textAlign: 'center', color: txtColor, marginTop: 3 }} >{date}</Text>

                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 5
    },
    imageContainer: {
        flex: 0.85,
    },
    coverImage: {
        flex: 1,
        borderRadius: 10
    },
    labelContainer: {
        flex: 0.15,
        paddingLeft: 5,
        marginTop: 5
    },
    title: {
        flex: 1,
        fontSize: 15,
        color: '#473348'
    },
    info: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    infoItems: {
        flex: 1,
        fontSize: 12,
        color: '#fff'
    }

})

export default MovieItem

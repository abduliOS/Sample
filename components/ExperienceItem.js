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

class ExperienceItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        var data = this.props.data

        // var timeSlot = data.timeSlot

        var isSelected = this.props.isSelected
        const bgColor = isSelected ? '#645168' : '#d6debf'
        const txtColor = isSelected ? '#d6debf' : '#645168'

        return (
                <View style={{ padding: 5, backgroundColor: bgColor, width: 80, height: 45, elevation: 5, borderRadius: 5, justifyContent: 'center', marginRight: 10 }} >
                    <Text style={{ textAlign: 'center', color: txtColor, marginTop: 3, fontSize: screenWidth / 30 }} >{data}</Text>
                </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
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

export default ExperienceItem

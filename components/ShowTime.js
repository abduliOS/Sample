/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import moment from 'moment'

class MovieItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        var data = this.props.data
        const displayType = this.props.displayType ? this.props.displayType : null
        const textColor = this.props.textColor ? this.props.textColor : '#8de18e'

        return (
            <View style={styles.container}>

                <View style={{ width: 80, padding: 5, backgroundColor: '#645168', elevation: 5, borderRadius: 5 }} >
                    <Text style={{ textAlign: 'center', color: '#8de18e', fontSize: 15 }} >{data.showTime}</Text>
                    {displayType == null ? null : <Text style={{ textAlign: 'center', color: textColor, marginTop: 3, fontSize: 12 }} >XPOD</Text>}
                </View>

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

export default MovieItem

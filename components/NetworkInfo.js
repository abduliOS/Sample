/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const noNetworkIcon = require('../assets/no_network.png')

class MovieItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <View style={styles.container} >
                <Animatable.Image animation={'pulse'} iterationCount="infinite" easing="ease-out" source={noNetworkIcon} style={styles.noNetworkIcon} resizeMode={'contain'} />
                <Animatable.Text animation={'zoomIn'} easing="ease-out" style={styles.noNetworkText} >Looks like you don't {'\n'} have internet connection</Animatable.Text>
                {/* <TouchableOpacity style={styles.tryAgainView} onPress={() => this.props.checkNetworkConnectivity}  >
                    <Text style={styles.tryAgainText} >Try again</Text>
                </TouchableOpacity> */}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center' },
    logoIcon: { width: '100%', height: 100, alignSelf: 'center' },
    noNetworkIcon: { width: '100%', height: screenWidth / 3, alignSelf: 'center' },
    noNetworkText: { textAlign: 'center', marginTop: 50, fontSize: screenWidth / 20 },
    tryAgainText: { textAlign: 'center', marginTop: 50, fontSize: screenWidth / 18, fontWeight: '500' },
    tryAgainView: { padding: 10 },

})

export default MovieItem

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const drawerIcon = require('../assets/drawer.png')
const backIcon = require('../assets/left_arrow.png')

class Header extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center', paddingTop:20, paddingBottom: 20 }} >

                    {this.props.enableBack ? <TouchableOpacity style={{ flex: 0.1, alignSelf: 'center', padding: 10 }} onPress={() => this.props.navigation.goBack()} >
                        <Image source={backIcon} style={{ width: 25, height: 25, tintColor: '#d2d1d2', alignSelf: 'center' }} />
                    </TouchableOpacity> : <View style={{ flex: 0.1 }} />}

                    <View style={{ flex: 0.8, justifyContent: 'center' }} >
                        <Image source={{uri : 'http://122.165.186.93/static/images/logos/panda-logo.png'}} style={{ width: 30, height: 30, alignSelf: 'center' }} />
                    </View>

                    <TouchableOpacity style={{ flex: 0.1, alignSelf: 'center', padding: 10 }} onPress={() => this.props.navigation.openDrawer()} >
                        <Image source={drawerIcon} style={{ width: 20, height: 20, tintColor: '#d2d1d2', alignSelf: 'center' }} />
                    </TouchableOpacity>

                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        // height: 150
        paddingTop: 10,
        paddingBottom: 10
    }

})

export default Header

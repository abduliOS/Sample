/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, Moda, TextInput } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as AppColors from '../AppColors'

let width = Dimensions.get('screen').width / 2 - 8
let height = Dimensions.get('screen').height

const upArrowIcon = require('../../assets/up_arrow.png')
const downArrowIcon = require('../../assets/down_arrow.png')
const backIcon = require('../../assets/left_arrow.png')

class ResetPassword extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }

    }



    render() {



        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.innerContainer}>

                    <View style={{ flexDirection: 'row', padding: 5 }} >

                        <TouchableOpacity style={{ padding: 10, flex: 0.1 }} onPress={() => this.props.navigation.goBack()} >
                            <Image source={backIcon} style={{ width: 30, height: 30, tintColor: '#d2d1d2', alignSelf: 'center' }} />
                        </TouchableOpacity>

                        <Text style={{ flex: 0.8, textAlign: 'center', alignSelf: 'center', fontSize: 18, color: '#eee9e9' }} >RESET PASSWORD</Text>

                        <TouchableOpacity style={{ padding: 10, flex: 0.1 }} >

                        </TouchableOpacity>

                    </View>

                    <View style={styles.container} >

                        <View style={{ padding: 40, justifyContent: 'center' }} >

                            <View>
                                <TextInput placeholder={'+91 '} placeholderTextColor={'#b4b4ac'} style={{ backgroundColor: 'transparent', top: 5, fontSize: 18 }} />
                                <View style={{ height: 0.5, backgroundColor: '#b4b4ac' }} />
                            </View>

                            <View style={{ marginTop: 10 }} >
                                <TextInput placeholder={'Enter OTP'} placeholderTextColor={'#b4b4ac'} style={{ backgroundColor: 'transparent', top: 5, fontSize: 18 }} />
                                <View style={{ height: 0.5, backgroundColor: '#b4b4ac' }} />
                            </View>

                            <View style={{ marginTop: 10 }} >
                                <TextInput placeholder={'New Password'} placeholderTextColor={'#b4b4ac'} style={{ backgroundColor: 'transparent', top: 5, fontSize: 18 }} />
                                <View style={{ height: 0.5, backgroundColor: '#b4b4ac' }} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} >

                                <TouchableOpacity style={{}} >
                                   
                                </TouchableOpacity>

                                <TouchableOpacity >
                                    <Text style={{ fontSize: 15, color: '#cfd3c4', textDecorationLine: 'underline' }} >Resend OTP</Text>
                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity style={styles.loginBtnContainer} >
                                <Text style={styles.rateMovieText} >RESET PASSWORD</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={{ padding: 20 }} >
                    <Text style={{ color: '#b9bab1', fontSize: 14, textAlign: 'center' }} >OTP will be sent to this mobile number</Text>
                    </View>

                </LinearGradient>

            </LinearGradient>
        );
    }

}

export default ResetPassword

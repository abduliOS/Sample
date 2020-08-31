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
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

let width = Dimensions.get('screen').width / 2 - 8
let height = Dimensions.get('screen').height

const upArrowIcon = require('../../assets/up_arrow.png')
const downArrowIcon = require('../../assets/down_arrow.png')
const backIcon = require('../../assets/left_arrow.png')

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            password: ''
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

                        <Text style={{ flex: 0.8, textAlign: 'center', alignSelf: 'center', fontSize: 18, color: '#eee9e9' }} >LOGIN</Text>

                        <TouchableOpacity style={{ padding: 10, flex: 0.1 }} >

                        </TouchableOpacity>

                    </View>

                    <View style={styles.container} >

                        <View style={{ padding: 40, justifyContent: 'center' }} >

                            <View>
                                <TextInput placeholder={'+91 | mobile number'} placeholderTextColor={'#b4b4ac'} style={{ backgroundColor: 'transparent', top: 5, fontSize: 18 }} onChangeText={val => this.setState({ userName: val })} />
                                <View style={{ height: 0.5, backgroundColor: '#b4b4ac' }} />
                            </View>

                            <View style={{ marginTop: 10 }} >
                                <TextInput placeholder={'Password'} placeholderTextColor={'#b4b4ac'} style={{ backgroundColor: 'transparent', top: 5, fontSize: 18 }} onChangeText={val => this.setState({ password: val })} />
                                <View style={{ height: 0.5, backgroundColor: '#b4b4ac' }} />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }} >

                                <TouchableOpacity style={{}} onPress={() => this.props.navigation.navigate('LoginOTP')} >
                                    <Text style={{ fontSize: 15, color: '#cfd3c4', textDecorationLine: 'underline' }} >Login with OTP</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ResetPassword')} >
                                    <Text style={{ fontSize: 15, color: '#cfd3c4', textDecorationLine: 'underline' }} >Forget Password</Text>
                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity style={styles.loginBtnContainer} onPress={() => this.validateUser()} >
                                <Text style={styles.rateMovieText} >LOGIN</Text>
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }} >

                                <TouchableOpacity style={styles.rateMovieContainer} >
                                    <Text style={styles.rateMovieText} >FACEBOOK</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.rateMovieContainer} >
                                    <Text style={styles.rateMovieText} >GOOGLE</Text>
                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.props.navigation.navigate('Registration')}  >
                                <Text style={{ fontSize: 15, color: '#cfd3c4', textAlign: 'center', textDecorationLine: 'underline' }} >New to Movie Panda? REGISTER</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </LinearGradient>

            </LinearGradient>
        );
    }

    validateUser(){

    }

}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

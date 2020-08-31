/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, Moda, TextInput, Alert } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as AppColors from '../AppColors'
import * as actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Spinner from 'react-native-loading-spinner-overlay';

const backIcon = require('../../assets/left_arrow.png')

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOTPTriggered: false,
            mobileNo: '',
            otp: '',
            isValidate: false,
            statusDesc: null
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        console.log('getDerivedStateFromProps ' + JSON.stringify(nextProps))

        if (nextProps.isAuthenticated) {
            return null
        }

        if (nextProps.statusCode) {
            let statusDesc = nextProps.statusDesc
            return { statusDesc: statusDesc };
        }

        return null
    }

    render() {

        const { statusDesc } = this.state

        const isOTPTriggered = this.state.isOTPTriggered

        if (this.props.isAuthenticated) {
            this.props.navigation.goBack()
        }

        console.log('statusDesc ' + statusDesc)

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>
                <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.innerContainer}>

                    <View style={styles.headerContainer} >
                        <TouchableOpacity style={styles.headerIconContainer} onPress={() => this.props.navigation.goBack()} >
                            <Image source={backIcon} style={styles.backIcon} />
                        </TouchableOpacity>

                        <Text style={styles.headerText} >LOGIN</Text>

                        <TouchableOpacity style={styles.headerIconContainer} >
                        </TouchableOpacity>
                    </View>

                    <View style={styles.container} >

                        <View style={{ padding: 40, justifyContent: 'center' }} >

                            <View>
                                <TextInput editable={!isOTPTriggered} maxLength={10} onChangeText={(val) => this.setState({ mobileNo: val })} placeholder={'Enter Mobile No'} keyboardType={'numeric'} placeholderTextColor={'#b4b4ac'} style={{ backgroundColor: 'transparent', color: '#fff', top: 5, fontSize: 18 }} />
                                <View style={styles.textInputView} />
                            </View>

                            {isOTPTriggered ? <View style={{ marginTop: 10 }} >
                                <TextInput maxLength={6} onChangeText={(val) => this.setState({ otp: val })} placeholder={'Enter OTP'} keyboardType={'numeric'} placeholderTextColor={'#b4b4ac'} style={{ backgroundColor: 'transparent', top: 5, fontSize: 18, color: '#fff' }} />
                                <View style={styles.textInputView} />
                            </View> : null}

                            {isOTPTriggered ? <View style={styles.resendOTPContainer} >
                                <TouchableOpacity style={styles.textInputView} />

                                <TouchableOpacity onPress={() => this.onResendOTPClicked()}>
                                    <Text style={styles.resendOTPText} >Resend OTP</Text>
                                </TouchableOpacity>
                            </View> : null}

                            <TouchableOpacity style={styles.loginBtnContainer} onPress={() => this.onSubmitClicked()} >
                                <Text style={styles.rateMovieText} >{isOTPTriggered ? 'SUBMIT OTP' : 'SEND OTP'}</Text>
                            </TouchableOpacity>

                            {isOTPTriggered ? <TouchableOpacity style={styles.changeNoContainer} onPress={() => this.changeMobileNo()} >
                                <Text style={styles.changeNoText} >Change Mobile No</Text>
                            </TouchableOpacity> : null}

                            {statusDesc != null ? <Text style={styles.msgInfoText} >{statusDesc}</Text> : null}

                        </View>

                    </View>

                    <TouchableOpacity style={styles.otpInfoContainer} >
                        <Text style={styles.otpInfoText} >{isOTPTriggered ? '' : 'OTP will be sent to this mobile number'}</Text>
                    </TouchableOpacity>

                    {/* */}

                </LinearGradient>

                <Spinner
                    visible={this.props.isLoading}
                    textContent={'Loading...'}
                    animation={'fade'}
                    textStyle={{ color: '#fff' }}
                />

            </LinearGradient>
        );
    }

    onBack() {

        this.props.navigation.state.params.onLogin
        this.props.navigation.pop()

    }

    changeMobileNo() {

        this.setState({ isOTPTriggered: false })

    }

    onSubmitClicked() {

        const mobileNo = this.state.mobileNo
        const isOTPTriggered = this.state.isOTPTriggered

        if (mobileNo.length == 0 || mobileNo.length < 10) {
            alert('Invalid Mobile No')
            return
        }

        if (isOTPTriggered) {
            // submit OTP

            const otp = this.state.otp

            if (otp.length == 0) {
                alert('Enter OTP')
                return
            }

            let params = {
                userId: mobileNo,
                companyId: 'lixo',
                systemId: 'lixo',
                passCode: otp
            }
            this.props.actions.submitOTP(params)

        } else {
            // send OTP
            this.setState({ isOTPTriggered: true })

            let params = { phoneNumber: mobileNo }
            this.props.actions.sendOTP(params)

        }
    }

    onResendOTPClicked() {

        const mobileNo = this.state.mobileNo

        if (mobileNo.length == 0 || mobileNo.length < 10) {
            alert('Invalid Mobile No')
            return
        }

        // send OTP
        let params = { phoneNumber: mobileNo }
        this.props.actions.sendOTP(params)

    }

}

function mapStateToProps(state) {
    return {
        isLoading: state.otpLoginReducer.isLoading,
        statusCode: state.otpLoginReducer.statusCode,
        statusDesc: state.otpLoginReducer.statusDesc,
        isAuthenticated: state.otpLoginReducer.isAuthenticated
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
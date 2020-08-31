/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import * as AppColors from '../AppColors'
import Utils from '../Utils'
import CashfreePG from '../../components/cashfreereactnativepg/index';

const PAYMENT_SUCCESS = 'SUCCESS'
const PAYMENT_FAILURE = 'FAILED'

class Payment extends Component {

    constructor(props) {
        super(props)

        const { navigation } = this.props;
        console.log('Payment ' + JSON.stringify(navigation))
        this.paymentDetails = navigation.state.params

        this.state = {
            tokenData: null,
            isLoading: false
        }

    }

    render() {

        const { key, orderId, orderAmount, customerCurrency, orderNote, customerName, customerPhone, customerEmail, cfToken } = this.paymentDetails

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} >
                <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10 }} >

                    <CashfreePG
                        appId={key}
                        orderId={orderId}
                        orderAmount={orderAmount}
                        orderCurrency={customerCurrency}
                        orderNote={orderNote}
                        source="reactsdk"
                        customerName={customerName}
                        customerEmail={customerEmail}
                        customerPhone={customerPhone}
                        paymentModes=""
                        env="test" //blank for prod
                        tokenData={cfToken}
                        callback={(eventData) => {
                            console.log('eventData ' + eventData)

                            let paymentResponse = JSON.parse(eventData)
                            this.updatePaymentStatus(paymentResponse)

                        }}
                    />

                </View>
            </LinearGradient>
        );
    }

    async updatePaymentStatus(bookingObj) {

        let request = { method: 'POST', headers: await Utils.getPaymentTokenHeader(), body: JSON.stringify(bookingObj) };
        console.log('updatePaymentStatus request ' + JSON.stringify(request))
        let response = await fetch(Utils.endpoint.updatePaymentStatus, request).then(res => res.json());
        console.log('updatePaymentStatus ' + JSON.stringify(response))
        if (response.status && response.status.statusCode && response.status.statusCode == '1001') {
            this.props.navigation.pop(3)
            this.props.navigation.navigate('BookingPreview', response)
        } else {
            this.props.navigation.navigate('BookingPreview', response)
        }

    }

}

function mapStateToProps(state) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        // actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payment);



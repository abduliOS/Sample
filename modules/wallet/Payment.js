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
        console.log('Payment Initiated ' + JSON.stringify(navigation))
        this.orderId = navigation.getParam('orderId', '');
        this.cfToken = navigation.getParam('tokenData', '');
        this.orderAmount = navigation.getParam('orderAmount', '');
        this.orderCurrency = navigation.getParam('customerCurrency', '');
        this.customerName = navigation.getParam('customerName', '');
        this.customerEmail = navigation.getParam('customerEmail', '');
        this.customerPhone = navigation.getParam('customerPhone', '');
        this.notifyUrl = navigation.getParam('notifyUrl', '');
        this.key = navigation.getParam('key', '');
        console.log('orderId ' + this.orderId)
        console.log('cfToken ' + this.cfToken)

        this.state = {
            tokenData: null,
            isLoading: false
        }

    }

    render() {

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} >
                <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10 }} >

                    <CashfreePG
                        appId={this.key}
                        orderId={this.orderId}
                        orderAmount={this.orderAmount}
                        orderCurrency={this.orderCurrency}
                        orderNote="This is an order note"
                        source="reactsdk"
                        customerName={this.customerName}
                        customerEmail={this.customerEmail}
                        customerPhone={this.customerPhone}
                        paymentModes=""
                        notifyUrl={this.notifyUrl}
                        env="test" //blank for prod
                        tokenData={this.cfToken}
                        callback={(eventData) => {

                            console.log('txn status ' + JSON.stringify(eventData))

                            if (eventData.txStatus) {

                                let txStatus = eventData.txStatus
                                let referenceId = eventData.referenceId

                                if (txStatus == PAYMENT_SUCCESS) {

                                } else {

                                }

                            }

                        }}
                    />

                </View>
            </LinearGradient>
        );
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



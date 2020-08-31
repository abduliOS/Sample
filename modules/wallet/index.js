/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, FlatList, TextInput, ScrollView } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as AppColors from '../AppColors'
import * as AppConstants from '../AppConstants'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from '../../components/Header'
import * as actions from './actions'
import Utils from '../Utils'

class Wallet extends Component {

    constructor(props) {
        super(props)

        this.state = {
            amount: null
        }

    }

    render() {

        let walletBalance = this.props.walletBalance
        let walletHistory = this.props.walletHistory
        console.log('walletBalance ' + walletBalance)

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={[styles.container]}>

                <Header navigation={this.props.navigation} />

                <View style={{ flex: 1, padding: 10 }} >

                    <View>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: 15 }} >Available Balance</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: 30 }} >{'₹ ' + walletBalance}</Text>
                        <Text style={{ color: '#000', marginTop: 3, fontSize: 15 }} >MoviePanda Wallet</Text>
                    </View>

                    <View >
                        <TextInput placeholder={'₹ Amount'} keyboardType={'numeric'} style={{ color: '#000', marginTop: 3, fontSize: 40 }} onChangeText={(val) => this.setState({ amount: val })} />
                        <TouchableOpacity style={styles.otpInfoContainer} onPress={() => this.generateOrderId()} >
                            <Text style={styles.otpInfoText} >{'Proceed Payment'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10 }} >
                        <Text style={{ color: '#000', marginTop: 3, fontSize: 20 }} >Wallet History</Text>
                    </View>

                    <FlatList
                        style={{ flex: 1 }}
                        data={walletHistory}
                        keyExtractor={(j, i) => `${j.paymentId}`}
                        renderItem={({ item: j, index }) => {

                            return (
                                <TouchableOpacity style={[styles.cityListItem]} onPress={() => this.onPressLocation(j.name)} >
                                    <Text style={{ fontSize: 15, color: '#000' }} >{j.paymentSource}</Text>
                                </TouchableOpacity>
                            );
                        }}
                    />

                </View>
            </LinearGradient>
        );
    }

    componentDidMount() {

        this.props.actions.walletSummaryRequest()

    }

    // API Calling
    async generateOrderId() {

        const amount = this.state.amount
        if (amount == null) {
            alert('Enter Amount')
            return
        }

        const min = 1;
        const max = 100;
        const orderId = Math.random() * max;
        console.log('OrderId ' + orderId)

        let body = {
            orderId: orderId,
            customerEmail: 'puroshamjath@gmail.com',
            customerName: 'Amjath', customerPhone: '9659228080',
            orderAmount: amount, location: 'Chennai'
        }
        let request = { method: 'POST', headers: await Utils.getHeader(), body: JSON.stringify(body) };
        console.log('generateOrderId request ' + JSON.stringify(request))
        let response = await fetch(Utils.endpoint.walletOrderId, request).then(res => res.json());
        console.log('generateOrderId ' + JSON.stringify(response))

        if (response.orderId) {

            this.generateCFToken(response)

        }

    }

    async generateCFToken(orderObj) {

        const orderId = orderObj.orderId
        console.log('OrderId ' + orderId)

        let body = { orderId: orderId, orderAmount: orderObj.orderAmount, orderCurrency: orderObj.customerCurrency }
        let request = { method: 'POST', headers: await Utils.getPaymentTokenHeader(), body: JSON.stringify(body) };
        console.log('generateCFToken request ' + JSON.stringify(request))
        let response = await fetch(Utils.cashFree.test, request).then(res => res.json());
        console.log('generateCFToken ' + JSON.stringify(response))

        if (response.cftoken) {

            // let paymentObj = {
            //     orderId: orderId,
            //     tokenData: response.cftoken
            // }

            orderObj = {
                ...orderObj,
                tokenData: response.cftoken
            }

            this.props.navigation.navigate('WalletPayment', orderObj)

        }

    }

}

function mapStateToProps(state) {
    return {
        walletBalance: state.walletReducer.walletBalance,
        walletHistory: state.walletReducer.walletHistory
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
)(Wallet);

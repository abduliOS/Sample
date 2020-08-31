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

        this.state = {

        }

    }

    render() {

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} >
                <View style={{ flex: 1, marginLeft: 10, marginRight: 10, marginTop: 10 }} >

                    <CashfreePG
                        appId="90928299dd37d577fc564d032909"
                        orderId={'66'}
                        orderAmount="247.68"
                        orderCurrency="INR"
                        orderNote="Ticket Booking"
                        source="reactsdk"
                        customerName="Amjath"
                        customerEmail="Amjath.tech@gmail.com"
                        customerPhone="9659228080"
                        paymentModes=""
                        env="test" //blank for prod
                        tokenData={'eB9JCN4MzUIJiOicGbhJCLiQ1VKJiOiAXe0Jye.Fy9JCOzMjN4gTYyQzMlVWNiojI0xWYz9lIsADNwQDN1QTO1EjOiAHelJCLiIlTJJiOik3YuVmcyV3QyVGZy9mIsICO24yN0IjI6ICduV3btFkclRmcvJCLiYjNiojIklkclRmcvJye.CJxFPTdV1zrlYf7bDbpizHlPgYTeI8AX0ZJOy_38HmvUVyWMDUweYsXWLB5tKwBxCC'}
                        callback={(eventData) => {

                            console.log('on Payment Done ' + eventData)

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



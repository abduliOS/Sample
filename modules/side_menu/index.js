/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, FlatList, AsyncStorage, ScrollView } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import * as AppColors from '../AppColors'
import * as AppConstants from '../AppConstants'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from '../splash/actions'
import Modal from "react-native-modal";

const searchMoviesIcon = require('../../assets/drawer_search.png')
const upcomingMoviesIcon = require('../../assets/drawer_upcoming.png')
const cinemasIcon = require('../../assets/drawer_cinemas.png')
const sbIcon = require('../../assets/drawer_sb.png')
const myProfileIcon = require('../../assets/drawer_profile.png')
const myBookingsIcon = require('../../assets/drawer_booking.png')
const cancelBookingIcon = require('../../assets/drawer_cancel_booking.png')
const walletIcon = require('../../assets/drawer_wallet.png')

const privacyPolicy = 'The User hereby consents, expresses and agrees that he has read and fully understands the Privacy Policy of Lixo in respect of the Website, The User further consents that the terms and contents of such Privacy Policy are acceptable to him.\n\nAny customer grievances can be reported to the Grievance Officer specifically dedicated to address all customer concerns. You may contact the Grievance Officer at privacypolicy@moviepanda.com'
const termsConditions_1 = 'Acceptance of terms'
const termsConditions_2 = 'The MoviePanda.com website ("Website") is an internet based entertainment ticketing portal owned and operated by Lixo Entertainment Private Limited ("Lixo"), a company incorporated under the laws of India, with its registered office at Gr. Floor, Wajeda House, Gulmohar Cross 7. Juhu Scheme, Mumbai 400049.'
const termsConditions_3 = 'Through the Website, Lixo shall provide you ("User") entertainment-related information, pricing, availability and reservations for ticket for cinemas, plays, concerts, sports events across cities and rural areas throughout India ("Service"), as more particularly described and defined in the terms of service ("TOS") relating to such Service, This Service may be availed by the User, his family members'
const termsConditions_4 = 'This User Agreement ("Agreement") sets out the terms and conditions on which Lixo shall provide the Services to the User through the Website. In addition to this Agreement and depending on the Services opted for by the User, the User shall be required to read and accept the relevant TOS for such Service, which may be updated or modified by Lixo from time to time. Such TOS shall be deemed to be a part of this Agreement and in the event of a conflict between such TOS and this Agreement, the terms of this Agreement shall prevail.'
const termsConditions_5 = 'Use of the Website is offered to the User conditioned on acceptance without modification of all the terms, conditions and notices contained in this Agreement and the TOS, as may be posted on the Website from time to time. For the removal of doubts, it is clarified that use of the Website by the User constitutes an acknowledgement and acceptance by the User of this Agreement and the TOS. If the User does not agree with any part of such terms, conditions and notices, the User must not use the Website.'
const termsConditions_6 = 'Additionally, the Service Provider may provide terms and guidelines that govern particular features, offers or the operating rules and policies applicable to each Service (for example, movie tickets, gift vouchers, Combo?s, etc.). The User shall be responsible for ensuring compliance with the terms and guidelines or operating rules and policies of the Service Provider with whom the User elects to deal, including terms and conditions set forth in a Service Providers. In the event that any of the terms, conditions and notices contained in this Agreement or the TOS conflict with the additional/other terms and guidelines specified by the Service Provider, then the latter terms/guidelines shall prevail.'

class SlideMenu extends Component {

    constructor(props) {
        super(props)

        this.menuList = ['Search Movies', 'Upcoming Movies', 'Cinemas', 'Scheduled Booking', 'Wallet', 'My Profile', 'My Bookings', 'Cancel Booking']
        this.menuIconList = [searchMoviesIcon, upcomingMoviesIcon, cinemasIcon, sbIcon, walletIcon, myProfileIcon, myBookingsIcon, cancelBookingIcon]

        this.guestMenuList = ['Search Movies', 'Upcoming Movies', 'Cinemas']
        this.guestIconList = [searchMoviesIcon, upcomingMoviesIcon, cinemasIcon]


        this.state = {
            isLoggedIn: false,
            selectedMenu: null,
            isDialogVisible: false,
            selectedDialog: null
        }

    }


    render() {

        const { profileData } = this.props
        console.log('profileData @@ ' + JSON.stringify(profileData))

        const isAuthenticated = this.props.isAuthenticated
        const menuList = isAuthenticated ? this.menuList : this.guestMenuList
        const menuIconList = isAuthenticated ? this.menuIconList : this.guestIconList
        const userName = profileData != null ? profileData.firstName ? profileData.firstName : 'Guest' : 'Guest'

        return (
            <View style={styles.container} >
                <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={[styles.container]}>
                    <View style={{ flex: 1 }} >

                        {isAuthenticated ? <View style={styles.nameCardContainer} >

                            <Text style={styles.nameCardTxt1} >Hello</Text>
                            <Text style={styles.nameCardTxt2} >{userName}</Text>

                        </View> : null}

                        <FlatList
                            data={menuList}
                            keyExtractor={(j, i) => `${i}`}
                            renderItem={({ item: j, index }) => {

                                return (
                                    <TouchableOpacity style={[styles.drawerItem, { backgroundColor: index % 2 == 0 ? '#6d5d6d' : 'transparent' }]} onPress={() => this.navigate(j)} >
                                        <Text style={styles.drawerItemText} >{j}</Text>
                                        <Image style={{ width: 30, height: 30, alignSelf: 'center' }} source={menuIconList[index]} />
                                    </TouchableOpacity>
                                );
                            }}
                        />

                    </View>

                    <View style={{}} >

                        <View style={{ flexDirection: 'row', padding: 10, justifyContent: 'space-between' }} >
                            <TouchableOpacity onPress={() => this.setState({ selectedDialog: 1, isDialogVisible: true })} style={{}} >
                                <Text style={styles.bottomOptionText} >Terms and Conditions</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setState({ selectedDialog: 0, isDialogVisible: true })} >
                                <Text style={styles.bottomOptionText} >Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.bottomSignUpContainer} onPress={() => this.onClickLogin()} >
                            <Text style={styles.bottomSignUpText} >{this.props.isAuthenticated ? 'Logout' : 'Login'}</Text>
                        </TouchableOpacity>

                    </View>

                    {this.renderDialog()}

                </LinearGradient>
            </View>
        );
    }

    renderDialog() {

        const selectedDialog = this.state.selectedDialog
        let termsConditions = `${termsConditions_1}\n\n${termsConditions_2}\n\n${termsConditions_3}\n\n${termsConditions_4}\n\n${termsConditions_5}\n\n${termsConditions_6}`

        return (<Modal isVisible={this.state.isDialogVisible} >
            <View style={{ justifyContent: 'center', height: '80%', borderRadius: 10 }}>
                <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={{ padding: 20 }}>

                    <Text style={{ fontSize: 18, textAlign: 'center', color: '#fff' }} >{selectedDialog == 0 ? 'Privacy Policy' : 'Terms and Conditions'}</Text>

                    <ScrollView>
                        <Text style={{ fontSize: 15, textAlign: 'center', color: '#fff', marginTop: 20, paddingLeft: 10, paddingRight: 10 }} >{selectedDialog == 0 ? privacyPolicy : termsConditions}</Text>
                    </ScrollView>

                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20, backgroundColor: '#dee2c7', borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' }} onPress={() => this.setState({ isDialogVisible: false })} >
                        <Text style={{ textAlign: 'center', color: '#39253f' }} >Close</Text>
                    </TouchableOpacity>

                </LinearGradient>
            </View>
        </Modal>)
    }


    navigate(item) {

        this.props.navigation.navigate('SideMenuContainer', { menu: item })

    }

    async onClickLogin() {

        const isAuthenticated = this.props.isAuthenticated

        if (!isAuthenticated) {
            this.props.navigation.navigate('LoginOTP')
            return
        }

        await AsyncStorage.setItem(AppConstants.LOGIN_TYPE, AppConstants.ANONYMOUS_LOGIN)
        this.props.actions.setAuthentication(false)

    }

    async componentDidMount() {

        let loginType = await AsyncStorage.getItem(AppConstants.LOGIN_TYPE)

        if (loginType == AppConstants.ANONYMOUS_LOGIN) {
            this.setState({ isLoggedIn: false })
        } else if (loginType == AppConstants.USER_LOGIN) {
            this.setState({ isLoggedIn: true })
        }

    }

    componentWillReceiveProps(nextProps) {

        const isAuthenticated = nextProps.isAuthenticated
        const selectedMenu = this.state.selectedMenu

        if (isAuthenticated && selectedMenu != null) {
            this.navigate(this.state.selectedMenu)
        }

    }

}

// export default MovieDetail
function mapStateToProps(state) {
    return {
        isAuthenticated: state.otpLoginReducer.isAuthenticated,
        profileData: state.profileReducer.profileData
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
)(SlideMenu);

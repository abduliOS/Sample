/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, ScrollView, Image, Text, Dimensions, TouchableOpacity, TextInput, Alert, FlatList } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import MovieItem from '../../components/MovieItem'
import * as AppColors from '../AppColors'
import Header from '../../components/Header'
import * as AppCosnstants from '../AppConstants'
import { DatePickerDialog } from 'react-native-datepicker-dialog'
import moment from 'moment'
import * as actions from './actions'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modal from "react-native-modal";
import Spinner from 'react-native-loading-spinner-overlay';

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const backIcon = require('../../assets/left_arrow.png')
const closeIcon = require('../../assets/close.png')
const editIcon = require('../../assets/edit.png')
const ratingSelectedIcon = require('../../assets/rating_selected.png')

class Profile extends Component {

    constructor() {
        super()

        this.state = {
            isProfileEditable: false,
            dobDate: null,
            name: '',
            mobile: '',
            email: '',
            birthDate: '',
            location: '',
            married: '',
            anniversaryDate: '',
            selectedCalendarType: '',
            profileData: '',
            isVenueDialogVisible: false,
            isGenreDialogVisible: false,
            isConfirmDialogVisible: false,
            selectedPreference: {}
        }

    }

    render() {

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>
                <Header navigation={this.props.navigation} />
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginLeft: 15, marginRight: 15 }} >
                    {this.renderUserDetails()}
                    {this.renderUserPreferences()}
                    <View style={{ height: 50 }} />
                </ScrollView>

                <DatePickerDialog ref="dpDialog" onDatePicked={this.onDOBDatePicked.bind(this)} />
                <DatePickerDialog ref="adpDialog" onDatePicked={this.onAnnDatePicked.bind(this)} />
                {this.renderVenueListDialog()}
                {this.renderGenreListDialog()}
                {this.renderConfirmDialog()}
                <Spinner
                    visible={this.props.isLoading}
                    textContent={'Loading...'}
                    animation={'fade'}
                    textStyle={{ color: '#fff' }}
                />
            </LinearGradient>
        );
    }

    renderUserDetails() {

        const isEditable = this.state.isProfileEditable

        // const profileData = this.props.profileData
        const profileData = this.state.profileData

        // const name = profileData.firstName ? profileData.firstName : ''
        // const mobile = profileData.primaryPhoneNumber ? profileData.primaryPhoneNumber : ''
        // const email = profileData.primaryEmail ? profileData.primaryEmail : ''
        // const dob = profileData.dateOfBirth ? profileData.dateOfBirth : ''
        // // const location = profileData.firstName ? profileData.firstName : ''
        // const married = profileData.maritalStatus ? profileData.maritalStatus : ''
        // // const anniversaryDate = profileData.firstName ? profileData.firstName : ''

        const name = this.state.name
        const mobile = this.state.mobile
        const email = this.state.email
        const dob = this.state.birthDate
        // const location = profileData.firstName ? profileData.firstName : ''
        const married = this.state.married
        // const anniversaryDate = profileData.firstName ? profileData.firstName : ''

        return (
            <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.gridContainer}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Image source={null} style={{ width: 12, height: 12 }} />
                    <Text style={styles.headerTitle} >Profile</Text>
                    {!isEditable ? <TouchableOpacity onPress={() => this.editProfile()} style={{ justifyContent: 'center', paddingLeft: 10, paddingRight: 10 }} >
                        <Image source={editIcon} style={styles.editIcon} />
                    </TouchableOpacity> : <View />}
                </View>

                <View style={{ flexDirection: 'column' }} >

                    <View style={{ marginTop: 10 }} >
                        <Text style={styles.profileLabel} >Name:</Text>
                        {/* <Text style={styles.profileValue} >Bhuvaneshwaran Duraisamy</Text> */}
                        <TextInput editable={isEditable} value={name} style={styles.profileValueInput} onChangeText={val => this.setState({ name: val })} />
                        <View style={styles.profileView} />
                    </View>

                    <View style={{ marginTop: 10 }} >
                        <Text style={styles.profileLabel} >Mobile:</Text>
                        <Text style={styles.profileValue} >{mobile}</Text>
                        <View style={styles.profileView} />
                    </View>

                    <View style={{ marginTop: 10 }} >
                        <Text style={styles.profileLabel} >Email:</Text>
                        <TextInput editable={isEditable} value={email} style={styles.profileValueInput} onChangeText={val => this.setState({ email: val })} />
                        <View style={styles.profileView} />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }} >

                        <TouchableOpacity onPress={isEditable ? this.onDOBPress.bind(this) : null} style={{ width: '45%' }} >
                            <Text style={styles.profileLabel} >Birth Date:</Text>
                            <Text style={styles.profileValue} >{dob}</Text>
                            <View style={styles.profileView} />
                        </TouchableOpacity>

                        <View style={{ width: '45%' }} >
                            <Text style={styles.profileLabel} >Location:</Text>
                            <Text style={styles.profileValue} >Chennai</Text>
                            <View style={styles.profileView} />
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }} >

                        <TouchableOpacity onPress={isEditable ? () => this.onClickMarried() : null} style={{ width: '45%' }} >
                            <Text style={styles.profileLabel} >Married?</Text>
                            <Text style={styles.profileValue} >{married}</Text>
                            <View style={styles.profileView} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={isEditable ? this.onAnniversaryPress.bind(this) : null} style={{ width: '45%' }} >
                            <Text style={styles.profileLabel} >Anniversary Date:</Text>
                            <Text style={styles.profileValue} >{this.state.anniversaryDate}</Text>
                            <View style={styles.profileView} />
                        </TouchableOpacity>

                    </View>

                    {isEditable ? <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-end' }} >

                        <TouchableOpacity onPress={() => this.setState({ isProfileEditable: false })} style={{ padding: 10 }} >
                            <Text style={styles.cancelText} >Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.saveProfile()} style={{ marginLeft: 10, padding: 10 }} >
                            <Text style={styles.saveText} >Save</Text>
                        </TouchableOpacity>

                    </View> : null}

                </View>

            </LinearGradient>
        )
    }

    editProfile() {

        const isProfileEditable = this.state.isProfileEditable
        this.setState({ isProfileEditable: !isProfileEditable })

    }

    saveProfile() {

        let profileObj = {

            dateOfBirth: this.state.birthDate,
            firstName: this.state.name,
            maritalStatus: this.state.married,
            marriageDate: this.state.anniversaryDate,
            primaryEmail: this.state.email,
            primaryPhoneNumber: this.state.mobile

        }

        this.props.actions.updateProfile(profileObj)

    }

    renderUserPreferences() {

        const userVenues = this.props.userVenues
        const userGenres = this.props.userGenres

        return (
            <LinearGradient colors={AppColors.PREFERENCE_GRADIENT} style={styles.preferenceContainer}>

                <Text style={{ fontSize: 18, textAlign: 'center', color: '#ced2c3', elevation: 10 }} >Preferences</Text>

                <View style={{ flexDirection: 'column' }} >

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                        <Text style={{ color: '#3a2b3c', textDecorationLine: 'underline', textDecorationColor: '#3a2b3c', fontSize: 15 }} >Venues</Text>
                        <TouchableOpacity onPress={() => this.onClickAddVenue()} >
                            <Text style={{ color: '#3a2b3c' }} >Add</Text>
                        </TouchableOpacity>
                    </View>

                    {userVenues.map(item => {

                        const venueName = item.venues[0].venueName

                        return (<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }} >
                            <Image source={ratingSelectedIcon} style={{ width: 12, height: 12 }} />
                            <Text style={{ flex: 1, marginLeft: 10, color: '#3a2b3c', fontSize: 15 }} >{venueName}</Text>
                            <TouchableOpacity onPress={() => this.removeVenue(item)} style={{ padding: 10 }} >
                                <Image source={closeIcon} style={{ width: 10, height: 10 }} />
                            </TouchableOpacity>
                        </View>)
                    })}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }} >
                        <Text style={{ color: '#3a2b3c', textDecorationLine: 'underline', textDecorationColor: '#3a2b3c', fontSize: 15 }} >Genres</Text>
                        <TouchableOpacity onPress={() => this.onClickAddGenre()} >
                            <Text style={{ color: '#3a2b3c' }} >Add</Text>
                        </TouchableOpacity>

                    </View>

                    {userGenres.map(item => {

                        const genreName = item.genres[0].genreName

                        return (<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }} >
                            <Image source={ratingSelectedIcon} style={{ width: 12, height: 12 }} />
                            <Text style={{ flex: 1, marginLeft: 10, color: '#3a2b3c', fontSize: 15 }} >{genreName}</Text>
                            <TouchableOpacity onPress={() => this.removeGenre(item)} style={{ padding: 10 }} >
                                <Image source={closeIcon} style={{ width: 10, height: 10 }} />
                            </TouchableOpacity>
                        </View>)
                    })}

                </View>

            </LinearGradient>
        )

    }

    renderVenueListDialog() {

        const venuesList = this.props.venuesList

        return (
            <View style={{}} >
                <Modal isVisible={this.state.isVenueDialogVisible} >
                    <View style={{ flex: 1, justifyContent: 'center' }}>

                        <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={{ borderRadius: 10, padding: 20 }}>
                            <Text style={{ textAlign: 'center', color: '#c6c9bc', fontSize: 18 }} >Venues</Text>
                            <ScrollView>
                                {venuesList.map(item => {

                                    const venueName = item.venueName

                                    return (<TouchableOpacity onPress={() => this.addVenue(item)} style={styles.venueItemView} >
                                        <Text style={{ color: '#fff', fontSize: 15, marginTop: 10 }} >{`${venueName}`}</Text>
                                    </TouchableOpacity>)
                                })}
                            </ScrollView>
                            <TouchableOpacity style={styles.venueItemView} onPress={() => this.setState({ isVenueDialogVisible: false })} >
                                <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 20 }} >{`CLOSE`}</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </Modal>
            </View>
        )
    }

    renderGenreListDialog() {

        const genresList = this.props.genresList

        return (
            <View style={{}} >
                <Modal isVisible={this.state.isGenreDialogVisible} >
                    <View style={{ flex: 1, justifyContent: 'center' }}>

                        <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={{ borderRadius: 10, padding: 20 }}>
                            <Text style={{ textAlign: 'center', color: '#c6c9bc', fontSize: 18 }} >Genre</Text>
                            <ScrollView>
                                {genresList.map(item => {

                                    const genreName = item.genreName

                                    return (<TouchableOpacity onPress={() => this.addGenre(item)} style={styles.venueItemView} >
                                        <Text style={{ color: '#fff', fontSize: 15, marginTop: 10 }} >{`${genreName}`}</Text>
                                    </TouchableOpacity>)
                                })}
                            </ScrollView>
                            <TouchableOpacity style={styles.venueItemView} onPress={() => this.setState({ isGenreDialogVisible: false })} >
                                <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center', marginTop: 20 }} >{`CLOSE`}</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </View>
                </Modal>
            </View>
        )
    }

    renderConfirmDialog() {

        return (
            <View style={{}} >
                <Modal isVisible={this.state.isConfirmDialogVisible} >
                    <View style={{ flex: 1, justifyContent: 'center' }}>

                        <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={{ borderRadius: 10, padding: 20 }}>
                            <View style={{ flexDirection: 'row' }} >
                                <TouchableOpacity style={{ flex: 0.2, alignSelf: 'center' }} onPress={() => this.setState({ isConfirmDialogVisible: false })} >
                                    <Image source={backIcon} style={{ width: 25, height: 25, tintColor: '#fefefe' }} />
                                </TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }} >
                                <Text style={{ textAlign: 'center', fontSize: 18, color: '#c5c8bb', alignSelf: 'center', justifyContent: 'center' }} >Are you sure, you want to remove preferences?</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 40, marginRight: 40 }} >

                                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 40, backgroundColor: '#dee2c7', borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '45%' }} onPress={() => this.setState({ isConfirmDialogVisible: false })} >
                                    <Text style={{ textAlign: 'center', color: '#39253f' }} >NO</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ alignSelf: 'center', marginTop: 40, backgroundColor: '#dee2c7', borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '45%' }} onPress={() => this.onRemovePreference()} >
                                    <Text style={{ textAlign: 'center', color: '#39253f' }} >YES</Text>
                                </TouchableOpacity>

                            </View>

                        </LinearGradient>
                    </View>
                </Modal>
            </View>
        )
    }

    onRemovePreference() {

        this.setState({ isConfirmDialogVisible: false })

        let selectedPreference = this.state.selectedPreference
        if (selectedPreference.type == 'Venue') {
            this.removeVenueConfirm()
        } else {
            this.removeGenreConfirm()
        }

    }

    onClickAddVenue() { this.props.actions.venuesListRequest(); this.setState({ isVenueDialogVisible: true }) }
    addVenue(venue) { this.setState({ isVenueDialogVisible: false }); this.props.actions.addVenueRequest(venue.venueId) }
    removeVenue(venue) { let selectedPreference = { ...venue, type: 'Venue' }; this.setState({ selectedPreference: selectedPreference, isConfirmDialogVisible: true }) }
    removeVenueConfirm() {

        let selectedPreference = this.state.selectedPreference
        let reqObj = {
            venueId: selectedPreference.venues[0].venueId,
            userCredentialId: this.props.userCredentialId,
            userVenuePreferenceId: this.props.userVenuePreferenceId
        }
        this.props.actions.removeVenueRequest(reqObj)

    }

    // Genre
    onClickAddGenre() {
        this.props.actions.genreListRequest()
        this.setState({ isGenreDialogVisible: true })
    }

    addGenre(genre) {
        this.setState({ isGenreDialogVisible: false })
        this.props.actions.addGenreRequest(genre.genreId)
    }

    removeGenre(genre) {

        let selectedPreference = { ...genre, type: 'Genre' };
        this.setState({ selectedPreference: selectedPreference, isConfirmDialogVisible: true })

    }

    removeGenreConfirm() {

        let selectedPreference = this.state.selectedPreference
        let reqObj = {
            genreId: selectedPreference.genres[0].genreId,
            userCredentialId: this.props.userCredentialId,
            userPreferenceGenreId: this.props.userPreferenceGenreId
        }
        this.props.actions.removeGenreRequest(reqObj)

    }

    async componentDidMount() {

        this.props.actions.fetchProfile()
        this.props.actions.userVenuesRequest()
        this.props.actions.userGenresRequest()

    }

    onDOBPress = () => {

        let dobDate = this.state.dobDate;

        if (!dobDate || dobDate == null) {
            dobDate = new Date();
            this.setState({
                dobDate: dobDate
            });
        }

        //To open the dialog
        this.refs.dpDialog.open({
            date: dobDate,
            maxDate: new Date() //To restirct future date
        });

    }

    onAnniversaryPress = () => {

        let dobDate = this.state.dobDate;

        if (!dobDate || dobDate == null) {
            dobDate = new Date();
            this.setState({
                dobDate: dobDate
            });
        }

        //To open the dialog
        this.refs.adpDialog.open({
            date: dobDate,
            maxDate: new Date() //To restirct future date
        });

    }

    onDOBDatePicked = (dateSelected) => {

        let displayDate = moment(Math.floor(new Date(dateSelected))).format('DD-MMM-YY')

        this.setState({ birthDate: displayDate })

    }

    onAnnDatePicked = (dateSelected) => {

        let displayDate = moment(Math.floor(new Date(dateSelected))).format('DD-MMM-YY')

        this.setState({ anniversaryDate: displayDate })

    }

    onClickMarried() {

        Alert.alert(
            '',
            'Are you Married ?',
            [
                {
                    text: 'Yes', onPress: () => this.setState({ married: 'Yes' }),
                },
                { text: 'No', onPress: () => this.setState({ married: 'No' }) },
            ],
            { cancelable: false },
        );

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.profileData != '') {

            const profileData = nextProps.profileData

            const name = profileData.firstName ? profileData.firstName : ''
            const mobile = profileData.primaryPhoneNumber ? profileData.primaryPhoneNumber : ''
            const email = profileData.primaryEmail ? profileData.primaryEmail : ''
            const dob = profileData.dateOfBirth ? profileData.dateOfBirth : ''
            // const location = profileData.firstName ? profileData.firstName : ''
            const married = profileData.maritalStatus ? profileData.maritalStatus : ''
            // const anniversaryDate = profileData.firstName ? profileData.firstName : ''

            this.setState({
                name: name,
                mobile: mobile,
                email: email,
                birthDate: dob,
                married: married,
                isProfileEditable: false
            })
        }

    }

}

// export default MovieDetail
function mapStateToProps(state) {
    return {
        isLoading: state.profileReducer.isLoading,
        profileData: state.profileReducer.profileData,
        venuesList: state.profileReducer.venuesList,
        genresList: state.profileReducer.genresList,
        userVenues: state.profileReducer.userVenues,
        userGenres: state.profileReducer.userGenres,
        userVenuePreferenceId: state.profileReducer.userVenuePreferenceId,
        userPreferenceGenreId: state.profileReducer.userPreferenceGenreId,
        userCredentialId: state.profileReducer.userCredentialId,
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
)(Profile);


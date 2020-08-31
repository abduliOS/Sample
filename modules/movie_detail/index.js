/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AppColors from '../AppColors'
import Modal from "react-native-modal";
import Header from '../../components/Header'
import * as actions from '../cast_crew/actions'
import * as reviewActions from './actions'

const upArrowIcon = require('../../assets/up_arrow.png')
const downArrowIcon = require('../../assets/down_arrow.png')
const playIcon = require('../../assets/play.png')

import MovieShows from '../movie_shows'
import MovieSchedules from '../movie_shows/ScheduleTimeSlot'
import MovieOtherDetails from '../cast_crew'
import { ScrollView } from 'react-native-gesture-handler';

const upVotesIcon = require('../../assets/upvotes_heart.png')

const youTubeStatus = ['started', 'buffering', 'playing']

class MovieDetail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            open: false,
            isMoreDetailActive: false,
            isRatingDialogVisible: false,
            videoId: '',
            youTubeState: null,
            playVideo: false,
            selectedRating: 1,
            reviewTitle: null,
            reviewComments: null
        }

    }

    render() {

        const { youTubeState } = this.state

        const { navigation } = this.props;
        const movieData = navigation.state.params
        const movieId = navigation.getParam('movieId', 'NO-ID');
        const movieName = navigation.getParam('movieName', 'NO-ID');
        const isUpcoming = navigation.getParam('isUpcoming', false);

        const isExpanded = this.state.open

        const isVideoFullScreen = youTubeStatus.indexOf(youTubeState) != -1 ? true : false
        const playVideo = this.state.playVideo

        return (
            <LinearGradient colors={AppColors.BACKGROUND_GRADIENT} style={styles.container}>

                <Header enableBack={true} navigation={this.props.navigation} />

                <ScrollView contentContainerStyle={{}} >
                    <View style={styles.topViewContainer} >
                        <View style={styles.videoViewContainer} >

                            <View style={styles.videoViewBackground} ></View>

                            <View style={styles.videoViewForeground} >

                                <Image source={{ uri: `https://img.youtube.com/vi/eBw8SPPvGXQ/hqdefault.jpg` }} style={styles.videoPreviewImage} />

                                <TouchableOpacity style={styles.videoPlayContainer} onPress={() => this.props.navigation.navigate('VideoPlayer')}  >
                                    <Image source={playIcon} style={styles.videoPlayIcon} />
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={styles.moreDetailContainer} >
                            <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.moreDetailView} >
                                <View style={styles.titleView} >
                                    <Text style={styles.movieName} >{movieName}</Text>
                                    <TouchableOpacity style={styles.expandIconView} onPress={() => this.openCloseView()} >
                                        <Image source={isExpanded ? upArrowIcon : downArrowIcon} style={styles.expandDetailIcon} />
                                    </TouchableOpacity>
                                </View>

                                {this.state.open ? <View style={{ flex: 1 }} >
                                    {this.renderMoreDetail()}
                                </View> : <View />}

                            </LinearGradient>
                            {isUpcoming ? this.renderScheduleTimeSlot(movieData) : this.renderBody(movieId, movieName)}
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        );
    }

    openCloseView() {
        const isOpen = !this.state.open
        this.setState({ open: isOpen })
    }

    renderScheduleTimeSlot(movieData) {

        const movieId = movieData.movieId

        return (<View style={styles.bodyContainer} >
            {this.state.isMoreDetailActive ? <MovieOtherDetails movieId={movieId} movieName={movieData.movieName} navigation={this.props.navigation} /> : <MovieSchedules movieId={movieId} movieData={movieData} navigation={this.props.navigation} />}
        </View>)
    }

    onPlayerStateChange(e) { }

    onChangeFullscreen(e) {
        if (!e.isFullscreen) { this.setState({ youTubeState: null }) }
    }

    renderMoreDetail() {

        const { navigation } = this.props;

        const movieName = navigation.getParam('movieName', 'NO-ID');
        const language = navigation.getParam('language', 'NA');
        const dimension = navigation.getParam('dimension', 'NA');
        const censor = navigation.getParam('censorCertificate', 'NA');
        const releaseDate = navigation.getParam('releaseDate', 'NA');
        const duration = navigation.getParam('duration', 'NA');
        const category = navigation.getParam('', 'No Category');
        const favoritePercent = navigation.getParam('upVotes', 'NA');
        const votes = navigation.getParam('overAllRating', 'NA');
        const synopsis = navigation.getParam('synopsis', 'NA');
        const isUpcoming = navigation.getParam('isUpcoming', false);

        const userReviewCount = this.props.userReview.length

        let selectedRating = this.state.selectedRating + 1
        const reviewComments = this.state.reviewComments
        const reviewCommentsLength = reviewComments != null ? reviewComments.length : 0

        return (
            <View style={styles.container} >
                <Text style={styles.moreDetailText} >{language + "   " + dimension}</Text>
                <View style={styles.moreDetailSubView} >
                    <View style={styles.moreDetailViewLeft} >
                        <Text style={styles.moreDetailText} >{censor + " | " + releaseDate}</Text>
                        <Text style={styles.moreDetailText} >{duration + " | " + category}</Text>
                    </View>

                    <View style={styles.moreDetailViewRight} >
                        <View style={[styles.infoItems, styles.upVotesContainer]} >
                            <Image source={upVotesIcon} style={styles.upVotesIcon} />
                            <Text style={styles.moreDetailText} >{favoritePercent}</Text>
                        </View>

                        <Text style={styles.moreDetailText} >{`${votes} votes`}</Text>
                    </View>
                </View>

                <Text style={styles.moreDetailTitle} >Synopsis</Text>
                <Text style={styles.moreDetailText} >{synopsis}</Text>

                <View style={styles.moreDetailBottomViewContainer} >
                    <View style={styles.moreDetailBottomView} >
                        {isUpcoming ? null :
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Reviews', { movieName: movieName })} >
                                <Text style={styles.reviewsText} >{`${userReviewCount} Reviews`}</Text>
                            </TouchableOpacity>}
                    </View>
                    <TouchableOpacity style={styles.moreDetailBottomView} onPress={() => this.switchDetail()} >
                        <Text style={styles.moreDetailBottomViewText} >{this.state.isMoreDetailActive == true ? 'close details' : 'more details'}</Text>
                    </TouchableOpacity>
                    <View style={styles.moreDetailBottomView} >
                        {isUpcoming ? null : <TouchableOpacity style={styles.rateMovieContainer} onPress={() => this.onClickRateMovie()} >
                            <Text style={styles.rateMovieText} >Rate Movie</Text>
                        </TouchableOpacity>}
                    </View>
                </View>

                <Modal isVisible={this.state.isRatingDialogVisible} >
                    <View style={styles.ratingContainer}>

                        <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={styles.ratingGradientContainer}>
                            <Text style={styles.ratingText} >How was the movie?</Text>
                            <View style={styles.ratingStarContainer} >
                                {this.renderRatingStar()}
                                <Text style={styles.ratingStarText} >{`${selectedRating * 20} %`}</Text>
                            </View>

                            <View style={{ marginTop: 20 }} >
                                <TextInput onChangeText={(val) => this.setState({ reviewTitle: val })} placeholder={'Title: One Liner'} placeholderTextColor={'#c9cdbf'} style={styles.ratingInput} />
                                <View style={styles.ratingInputView} />
                            </View>

                            <View style={{ marginTop: 20 }} >
                                <TextInput maxLength={500} onChangeText={(val) => this.setState({ reviewComments: val })} placeholder={'Description'} placeholderTextColor={'#c9cdbf'} style={styles.ratingInput} />
                                <View style={styles.ratingInputView} />
                                <Text style={styles.ratingHintText} >{`${500 - reviewCommentsLength} characters left`}</Text>
                            </View>

                            <TouchableOpacity style={styles.ratingSubmitContainer} onPress={() => this.submitRating()} >
                                <Text style={styles.ratingButtonText} >SUBMIT</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.ratingCancelContainer} onPress={() => this.setState({ isRatingDialogVisible: false })} >
                                <Text style={styles.ratingButtonText} >CLOSE</Text>
                            </TouchableOpacity>

                        </LinearGradient>
                    </View>
                </Modal>
            </View>
        )
    }

    onClickRateMovie() {

        let isAuthenticated = this.props.isAuthenticated

        if (isAuthenticated) {
            this.setState({ isRatingDialogVisible: true })
        } else {
            this.props.navigation.navigate('LoginOTP')
        }

    }

    submitRating() {

        const { navigation } = this.props;
        const movieId = navigation.getParam('movieId', 'NO-ID');

        const { selectedRating, reviewTitle, reviewComments } = this.state

        // this.setState({ isRatingDialogVisible: false })
        // moment(Math.floor(new Date(this.movieData.releaseDate))).format('MMM')

        console.log('submitRating ' + selectedRating + ' ' + reviewTitle + ' ' + reviewComments)

        let reqParam = {
            comments: reviewComments,
            movieId: movieId,
            rating: selectedRating,
            reviewDate: '31-Jan-1992',
            title: reviewTitle,
            userId: ''
        }

        this.props.reviewActions.addReviewRequest(reqParam)

    }

    renderRatingStar() {

        let arr = [0, 1, 2, 3, 4]

        let selectedRating = this.state.selectedRating

        return (
            <View style={{ flexDirection: 'row' }} >
                {arr.map((val, index) => {

                    let tintColor = selectedRating >= index ? null : '#ff9999'

                    return (<TouchableOpacity style={styles.ratingHeartContainer} onPress={() => this.setState({ selectedRating: index })}  >
                        <Image source={upVotesIcon} style={[styles.ratingHeartIcon, { tintColor: tintColor }]} />
                    </TouchableOpacity>)

                })}
            </View>
        )
    }

    switchDetail() {

        const isDetail = this.state.isMoreDetailActive
        this.setState({ isMoreDetailActive: !isDetail })

    }

    renderBody(movieId, movieName) {

        const navigation = this.props.navigation
        const movieData = navigation.state.params

        return (
            <View style={styles.bodyContainer} >
                {this.state.isMoreDetailActive ? <MovieOtherDetails movieId={movieId} movieName={movieName} navigation={navigation} /> : <MovieShows movieId={movieId} movieData={movieData} navigation={navigation} />}
            </View>
        )
    }

    componentDidMount() {
        const { navigation } = this.props;
        const movieId = navigation.getParam('movieId', '');
        let reqObj = { movieId: movieId }
        this.props.actions.userReviewRequest(reqObj)
    }

}

function mapStateToProps(state) {
    return {
        userReview: state.castCrewReducer.userReviews,
        isAuthenticated: state.otpLoginReducer.isAuthenticated
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        reviewActions: bindActionCreators(reviewActions, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MovieDetail);

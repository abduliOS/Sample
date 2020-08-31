/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, ScrollView, AsyncStorage } from 'react-native';
import styles from './styles'
import * as actions from "./actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MovieItem from '../../components/MovieItem'
import Swiper from 'react-native-swiper'
import Spinner from 'react-native-loading-spinner-overlay';

const userPlaceholder = require('../../assets/user_place_holder.png')

class App extends Component {

  render() {

    const casts = this.props.casts
    const crews = this.props.crews
    const relatedMovies = this.props.relatedMovies
    const userReview = this.props.userReview
    const criticReview = this.props.criticReview

    let userReviewPreview = []
    if (userReview && userReview.length > 3) {
      userReviewPreview.push(userReview[0])
      userReviewPreview.push(userReview[1])
      userReviewPreview.push(userReview[2])
    } else {
      userReviewPreview = userReview
    }

    let criticReviewPreview = []
    if (criticReview && criticReview.length > 3) {
      criticReviewPreview.push(userReview[0])
      criticReviewPreview.push(userReview[1])
      criticReviewPreview.push(userReview[2])
    } else {
      criticReviewPreview = criticReview
    }

    return (
      <View style={[styles.container]}>

        <ScrollView style={{ flex: 1, }} >
          {casts.length > 0 ? this.renderCastCrew('Cast', casts) : null}
          {crews.length > 0 ? this.renderCastCrew('Crew', crews) : null}
          {criticReview.length > 0 ? this.renderCriticReview() : null}
          {userReview.length > 0 ? this.renderUserReview() : null}

          {relatedMovies.length > 0 ? <Text style={{ color: '#f2f1f1', textDecorationLine: 'underline', textDecorationColor: '#fff', marginTop: 10 }} >Recommended Movies</Text> : null}
          <ScrollView style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }} horizontal={true} >
            {relatedMovies.map((item, index) => {

              return (
                <View style={{ marginRight: 10 }} >
                  <TouchableOpacity key={index} style={styles.movieItemView} onPress={() => this.props.navigation.push('MovieDetail', item)} >
                    <MovieItem isRecommended={true} movieId={item.movieId} movieName={item.movieName} posterUrl={item.posterUrl} language={item.language} dimension={item.dimension} censorCertificate={item.censorCertificate} upVotes={item.upVotes} />
                  </TouchableOpacity>
                </View>
              )

            })}

          </ScrollView>
        </ScrollView>
        <Spinner
          visible={this.props.isLoading}
          textContent={'Loading...'}
          animation={'fade'}
          textStyle={{ color: '#fff' }}
        />
      </View>
    );
  }

  renderCastCrew(title, casts) {

    return (
      <View>
        <Text style={{ color: '#f2f1f1', textDecorationLine: 'underline', textDecorationColor: '#fff' }} >{title}</Text>
        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10 }} horizontal={true} >
          {casts.map((item, index) => {
            return (
              <View style={{ marginRight: 10 }} >
                <Image source={{ uri: item.imgURL }} style={{ width: 80, height: 80, borderRadius: 10, elevation: 10, alignSelf: 'center' }} />
                <Text style={{ textAlign: 'center', padding: 2, color: '#f2f1f1', width: 80 }} >{item.cineastName}</Text>
              </View>
            )
          })}
        </View>
        <View style={{ height: 1, backgroundColor: '#4a364d' }} />
      </View>
    )
  }

  renderCriticReview() {

    const criticReview = this.props.criticReview

    let criticReviewPreview = []
    if (criticReview && criticReview.length > 3) {
      criticReviewPreview.push(userReview[0])
      criticReviewPreview.push(userReview[1])
      criticReviewPreview.push(userReview[2])
    } else {
      criticReviewPreview = criticReview
    }

    return (
      <View>
        <View style={{ flexDirection: 'column' }} >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
            <Text style={{ color: '#f2f1f1', textDecorationLine: 'underline', textDecorationColor: '#fff', marginTop: 10 }} >Critics Reviews</Text>
            {criticReview && criticReview.length > 3 ?
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Reviews', { movieName: this.props.movieName })} >
                <Text style={{ color: '#f2f1f1', marginTop: 10 }} >View all ({criticReview.length})</Text>
              </TouchableOpacity> : <View />}
          </View>

        </View>

        <View style={{ height: 200 }} >
          {/* <Text style={styles.text}>Hello Swiper</Text> */}
          <Swiper style={{ marginTop: 5 }} showsButtons={false} loop={false} >
            {criticReviewPreview.map((item, index) => {
              let title = item.title ? item.title : ''
              return (
                <View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                    <Image source={userPlaceholder} resizeMode={'contain'} style={{ flex: 0.1, width: 25, height: 25, borderRadius: 10, elevation: 10 }} />
                    <Text style={{ flex: 0.7, padding: 2, color: '#f2f1f1', marginLeft: 5 }} >The Indian</Text>
                    <Text style={{ flex: 0.2, padding: 2, color: '#f2f1f1', textAlign: 'right' }} >{item.rating}%</Text>
                  </View>

                  <View style={{ marginTop: 10 }} >
                    <Text style={{ color: '#4b3852', fontSize: 15 }} >{title}</Text>
                    <Text style={{ color: '#4b3852', fontSize: 12, marginTop: 5 }} >{item.comments}</Text>
                  </View>
                </View>
              )
            })}
          </Swiper>
        </View>

        <View style={{ height: 1, backgroundColor: '#4a364d' }} />
      </View>
    )
  }

  renderUserReview() {

    const userReview = this.props.userReview

    let userReviewPreview = []
    if (userReview && userReview.length > 3) {
      userReviewPreview.push(userReview[0])
      userReviewPreview.push(userReview[1])
      userReviewPreview.push(userReview[2])
    } else {
      userReviewPreview = userReview
    }

    return (<View>
      <View style={{ flexDirection: 'column' }} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
          <Text style={{ color: '#f2f1f1', textDecorationLine: 'underline', textDecorationColor: '#fff', marginTop: 10 }} >User Reviews</Text>
          {userReview && userReview.length > 3 ?
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Reviews', { movieName: this.props.movieName })} >
              <Text style={{ color: '#f2f1f1', marginTop: 10 }} >View all ({userReview.length})</Text>
            </TouchableOpacity> : <View />}
        </View>

      </View>

      <View style={{ height: 200 }} >
        {/* <Text style={styles.text}>Hello Swiper</Text> */}
        <Swiper style={{ marginTop: 5 }} showsButtons={false} loop={false} >
          {userReviewPreview.map((item, index) => {

            let title = item.title ? item.title : ''

            return (
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                  <Image source={userPlaceholder} resizeMode={'contain'} style={{ flex: 0.1, width: 25, height: 25, borderRadius: 10, elevation: 10 }} />
                  <Text style={{ flex: 0.7, padding: 2, color: '#f2f1f1', marginLeft: 5 }} >The Indian</Text>
                  <Text style={{ flex: 0.2, padding: 2, color: '#f2f1f1', textAlign: 'right' }} >{item.rating}%</Text>
                </View>

                <View style={{ marginTop: 10 }} >
                  <Text style={{ color: '#4b3852', fontSize: 15 }} >{title}</Text>
                  <Text style={{ color: '#4b3852', fontSize: 12, marginTop: 5 }} >{item.comments}</Text>
                </View>

              </View>
            )

          })}
        </Swiper>
      </View>

      <View style={{ height: 1, backgroundColor: '#4a364d' }} />
    </View>)
  }

  async componentDidMount() {

    let reqObj = { movieId: this.props.movieId }
    this.props.actions.castCrewRequest(reqObj)
    this.props.actions.criticsReviewRequest(reqObj)
    this.props.actions.userReviewRequest(reqObj)

    let relatedMoviesObj = { movie_id: this.props.movieId }
    this.props.actions.relatedMoviesRequest(relatedMoviesObj)

  }

}

function mapStateToProps(state) {
  return {
    isLoading: state.castCrewReducer.isLoading,
    casts: state.castCrewReducer.casts,
    crews: state.castCrewReducer.crews,
    relatedMovies: state.castCrewReducer.relatedMovies,
    criticReview: state.castCrewReducer.criticsReviews,
    userReview: state.castCrewReducer.userReviews,
    castStatus: state.castCrewReducer.castStatus
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
)(App);

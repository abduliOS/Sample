/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import * as AppColors from '../modules/AppColors'
import TextTicker from 'react-native-text-ticker'

const upVotesIcon = require('../assets/upvotes_heart.png')
const likeIcon = require('../assets/like.png')

class MovieItem extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    var data = this.props

    const isUpcoming = this.props.isUpcoming
    const upVoteIcon = isUpcoming == true ? likeIcon : upVotesIcon
    const ratingValue = isUpcoming == true ? data.upVotes : data.overAllRating

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer} >
          <Image resizeMode={'cover'} source={{ uri: data.posterUrl }} style={styles.coverImage} />
        </View>

        <View style={styles.labelContainer} >
          <Text style={data.isRecommended && data.isRecommended == true ? styles.recommendedTitle : styles.title} >{data.movieName}</Text>
          {data.isRecommended && data.isRecommended == true ? <View /> :
            <View style={styles.info} >
              {/* <Text style={styles.languageTxt} >{data.language}</Text> */}
              <View style={styles.languageTxt} >
                <TextTicker
                  style={styles.ratingTxt}
                  duration={5000}
                  loop
                  bounce
                  repeatSpacer={50}
                  marqueeDelay={1000}
                >{data.language}</TextTicker>
              </View>
              <Text style={styles.dimensionTxt} >{data.dimension}</Text>
              <Text style={styles.censorTxt} >{data.censorCertificate}</Text>
              <View style={[styles.infoItems, { flexDirection: 'row' }]} >
                <Image source={upVoteIcon} style={styles.upVoteImage} />
                <Text style={styles.ratingTxt} >{ratingValue + '%'}</Text>
              </View>
            </View>}

        </View>

      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 5
  },
  imageContainer: {
    flex: 0.85,
  },
  coverImage: {
    flex: 1,
    borderRadius: 10
  },
  labelContainer: {
    flex: 0.15,
    paddingLeft: 5,
    marginTop: 5
  },
  title: {
    flex: 1,
    fontSize: 15,
    color: AppColors.DARK_PURPLE
  },
  recommendedTitle: {
    flex: 1,
    fontSize: 15,
    color: AppColors.SHADE_GREEN
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: 10
  },
  infoItems: {
    flex: 0.2,
    marginRight: 0
  },
  upVoteImage: { width: 12, height: 12, marginRight: 3, marginTop: 2 },
  languageTxt: { flex: 0.4, fontSize: 12, marginRight: 5 },
  dimensionTxt: { flex: 0.2, fontSize: 12 },
  censorTxt: { flex: 0.2, fontSize: 12 },
  ratingTxt: { fontSize: 12 },

})

export default MovieItem

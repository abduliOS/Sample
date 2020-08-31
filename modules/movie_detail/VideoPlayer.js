/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, BackHandler } from 'react-native';
import styles from './styles'
import YouTube from 'react-native-youtube'
import Orientation from 'react-native-orientation';

class VideoPlayer extends Component {

    constructor(props) {
        super(props)

    }

    render() {

        const { navigation } = this.props;
        const videoId = navigation.getParam('videoId', 'NO-ID');

        return (
            <View style={styles.container}>
                <YouTube
                    apiKey={'AIzaSyDtL-H16QrPcKYlL56NOkIjEDnuUHPN76U'}
                    // videoId="KVZ-P-ZI6W4"   // The YouTube video ID
                    videoId="eBw8SPPvGXQ"
                    play={true}                    // control playback of video with true/false
                    fullscreen={true}              // control whether the video should play in fullscreen or inline
                    loop
                    controls={1}                // control whether the video should loop when ended
                    onReady={e => this.setState({ isReady: true })}
                    onChangeState={e => this.setState({ youTubeState: e.state })}
                    style={{ alignSelf: 'stretch', flex: 1 }}
                    onError={e => console.log('onError' + JSON.stringify(e))}
                    showFullscreenButton={false}
                    // onChangeFullscreen={e => this.onChangeFullscreen(e)}
                />
            </View>
        );
    }

    componentDidMount(){

        Orientation.lockToLandscape()

    }

    componentWillUnmount() {
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackBçut
        Orientation.lockToPortrait()
    }

}

export default VideoPlayer

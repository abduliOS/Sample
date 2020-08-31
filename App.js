/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import configureStore from "./config-store";
import { Provider } from "react-redux";
import AppContainer from './modules/AppContainer'

export default class App extends Component {

  render() {

    const store = configureStore(window.__INITIAL_STATE__);

    return (
      <Provider store={store}>
          <AppContainer />
      </Provider>
    );
  }

}

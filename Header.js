/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Text, View} from 'react-native';

export default class Header extends Component {

    constructor(props){
        super(props)

    }

  render() {

    const val = this.props.val

    return(
        <View style={{ flex: 0.15, flexDirection: 'row' }} >
       
       <View style={{ flex: 0.1, backgroundColor: 'pink' }} >
       {val == 0 ? <View style={{ width: 10, height: 10, backgroundColor: 'red' }} /> : <View style={{ width: 10, height: 10, backgroundColor: 'yellow' }} /> }
       </View>

       <View style={{ flex: 0.8 }} >
       </View>

       <View style={{ flex: 0.1, backgroundColor: 'pink' }} >
       </View>

       </View>
        )
  }
}


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import * as AppColors from './AppColors'
import { TextInput } from 'react-native-gesture-handler';

const backIcon = require('../assets/left_arrow.png')

class MovieDetail extends Component {

    constructor(props) {
        super(props)

    }


    // render() {

    //     return (

    //         <View style={{}} >

    //             <Modal isVisible={true} >
    //                 <View style={{ flex: 1, justifyContent: 'center' }}>

    //                     <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={{ borderRadius: 10, padding: 20 }}>

    //                         <Text style={{ textAlign: 'center', color: '#c6c9bc', fontSize: 18 }} >How was the movie?</Text>

    //                         <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', width: '50%', alignSelf: 'center' }} >

    //                             <Text>Rating</Text>

    //                             <Text style={{ textAlign: 'center', color: '#c6c9bc', fontSize: 18 }} >60%</Text>

    //                         </View>

    //                         <View style={{ marginTop: 20 }} >
    //                             <TextInput placeholder={'Title: One Liner'} placeholderTextColor={'#c9cdbf'} style={{ backgroundColor: 'none', fontSize: 18 }} />
    //                             <View style={{ height: 0.5, backgroundColor: '#a8a5a2' }} />
    //                         </View>

    //                         <View style={{ marginTop: 20 }} >
    //                             <TextInput placeholder={'Description'} placeholderTextColor={'#c9cdbf'} style={{ backgroundColor: 'none', fontSize: 18 }} />
    //                             <View style={{ height: 0.5, backgroundColor: '#a8a5a2' }} />
    //                             <Text style={{ textAlign: 'right', color: '#c6c9bc', fontSize: 12, marginTop: 5 }} >500 characters left</Text>
    //                         </View>

    //                         <TouchableOpacity style={{ alignSelf: 'center', marginTop: 40, backgroundColor: '#dee2c7', borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' }} >
    //                             <Text style={{ textAlign: 'center', color: '#39253f' }} >SUBMIT</Text>
    //                         </TouchableOpacity>

    //                     </LinearGradient>

    //                     {/* <Text style={{ textAlign: 'center' }} >I am the modal content!</Text> */}
    //                 </View>
    //             </Modal>

    //         </View>
    //     );
    // }

    // render() {

    //     let content = "This movie has been rated 'A' and is for audience above the age of 18. Please carry valid photo ID/ age proof to the theatre. No refund of tickets once bought."

    //     return (

    //         <View style={{}} >

    //             <Modal isVisible={true} >
    //                 <View style={{ flex: 1, justifyContent: 'center' }}>

    //                     <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={{ borderRadius: 10, padding: 20 }}>

    //                         <View style={{ flexDirection: 'row', justifyContent: 'center' }} >

    //                             <TouchableOpacity style={{ flex: 0.2, alignSelf: 'center' }} >
    //                                 <Image source={backIcon} style={{ width: 25, height: 25, tintColor: '#fefefe' }} />
    //                             </TouchableOpacity>

    //                             <Text style={{ flex: 0.6, textAlign: 'center', fontSize: 18, color: '#c5c8bb', alignSelf: 'center', justifyContent: 'center' }} >Content Warning</Text>

    //                             <View style={{ flex: 0.2 }} />

    //                         </View>

    //                         <View style={{ height: 0.5, backgroundColor: '#a8a5a2', marginTop: 10 }} />

    //                         <Text style={{ textAlign: 'center', color: '#c6c9bc', fontSize: 15, marginTop: 40 }} >{content}</Text>

    //                         <TouchableOpacity style={{ alignSelf: 'center', marginTop: 40, backgroundColor: '#dee2c7', borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' }} >
    //                             <Text style={{ textAlign: 'center', color: '#39253f' }} >CONTINUE</Text>
    //                         </TouchableOpacity>

    //                     </LinearGradient>

    //                     {/* <Text style={{ textAlign: 'center' }} >I am the modal content!</Text> */}
    //                 </View>
    //             </Modal>

    //         </View>
    //     );
    // }


    // render() {

    //     let content = "This movie has been rated 'A' and is for audience above the age of 18. Please carry valid photo ID/ age proof to the theatre. No refund of tickets once bought."

    //     return (

    //         <View style={{}} >

    //             <Modal isVisible={true} >
    //                 <View style={{ flex: 1, justifyContent: 'center' }}>

    //                     <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={{ borderRadius: 10, padding: 20 }}>

    //                         <View style={{ flexDirection: 'row', justifyContent: 'center' }} >

    //                             <TouchableOpacity style={{ flex: 0.2, alignSelf: 'center' }} >
    //                                 <Image source={backIcon} style={{ width: 25, height: 25, tintColor: '#fefefe' }} />
    //                             </TouchableOpacity>

    //                             <Text style={{ flex: 0.6, textAlign: 'center', fontSize: 18, color: '#c5c8bb', alignSelf: 'center', justifyContent: 'center' }} >Content Warning</Text>

    //                             <View style={{ flex: 0.2 }} />

    //                         </View>

    //                         <View style={{ height: 0.5, backgroundColor: '#a8a5a2', marginTop: 10 }} />

    //                         <Text style={{ textAlign: 'center', color: '#c6c9bc', fontSize: 15, marginTop: 40 }} >{content}</Text>

    //                         <TouchableOpacity style={{ alignSelf: 'center', marginTop: 40, backgroundColor: '#dee2c7', borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' }} >
    //                             <Text style={{ textAlign: 'center', color: '#39253f' }} >CONTINUE</Text>
    //                         </TouchableOpacity>

    //                     </LinearGradient>

    //                     {/* <Text style={{ textAlign: 'center' }} >I am the modal content!</Text> */}
    //                 </View>
    //             </Modal>

    //         </View>
    //     );
    // }

    render() {

        let content = "This movie has been rated 'A' and is for audience above the age of 18. Please carry valid photo ID/ age proof to the theatre. No refund of tickets once bought."

        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        return (

            <View style={{}} >

                <Modal isVisible={true} >
                    <View style={{ flex: 1, justifyContent: 'center' }}>

                        <LinearGradient colors={AppColors.DIALOG_GRADIENT} style={{ borderRadius: 10, padding: 20 }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'center' }} >

                                <TouchableOpacity style={{ flex: 0.2, alignSelf: 'center' }} >
                                    <Image source={backIcon} style={{ width: 25, height: 25, tintColor: '#fefefe' }} />
                                </TouchableOpacity>

                                <Text style={{ flex: 0.6, textAlign: 'center', fontSize: 18, color: '#c5c8bb', alignSelf: 'center', justifyContent: 'center' }} >How many seats?</Text>

                                <View style={{ flex: 0.2 }} />

                            </View>

                            <View style={{ flexDirection: 'row', marginTop: 40, justifyContent: 'center' }} >
                                {array.map((item, index) => {

                                    return (< View style={{ width: 25, height: 25, marginLeft: 2, borderRadius: 5, backgroundColor: '#cfd3c4', justifyContent: 'center', elevation: 5 }} >
                                        <Text style={{ fontSize: 12, textAlign: 'center' }} key={index} >{index + 1}</Text>
                                    </View>)


                                })}
                            </View>

                            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 40, backgroundColor: '#dee2c7', borderRadius: 5, paddingTop: 10, paddingBottom: 10, width: '90%' }} >
                                <Text style={{ textAlign: 'center', color: '#39253f' }} >CONTINUE</Text>
                            </TouchableOpacity>

                        </LinearGradient>

                        {/* <Text style={{ textAlign: 'center' }} >I am the modal content!</Text> */}
                    </View>
                </Modal>

            </View >
        );
    }




    componentDidMount() {



    }

}



export default MovieDetail

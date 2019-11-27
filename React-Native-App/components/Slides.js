import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableHighlight } from 'react-native';
import Colors from '../constants/Colors';
import Translator from './Translator';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Slides = (props) => {

    state = props.loadLanguage

    const renderLastSlide = (index) => {
        if (index === props.data.length - 1){
            return(
                <TouchableHighlight
                    style={styles.slideButton}
                    underlayColor={Colors.hoverColor} 
                    onPress={props.onComplete}
                >
                    <Translator loadText={('I\'m ready, let\'s go!')} loadLanguage={this.state.lang} />
                </TouchableHighlight>
            );
        }
    }


    const renderSlides = () => {
        return props.data.map( (slide, index) => {
            return (
                <View key= {slide.text} style={styles.slide} >
                    <Translator style={styles.slideText} loadText={slide.text} loadLanguage={this.state.lang} />
                    <Image source={slide.image} style={styles.slide1img} />
                    {renderLastSlide(index)}
                </View>
            )
        })
    }





    return(
        <ScrollView 
            horizontal 
            pagingEnabled
            style= {{flex: 1}}
            >
            {renderSlides()}
        </ScrollView>
    );
};

            

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    slide1img: {
        position: 'absolute',
        width: 400,
        height: 400,
        resizeMode:'contain',
        justifyContent: 'center', 
        alignItems: 'center',
    },
    slideText: {
        paddingBottom: '130%',
        fontSize: 25,
        color: '#9BB5F0', 
        fontWeight: 'bold',
        shadowOffset:{  width: 2,  height: 2, },
        shadowColor: '#FDED97',
        shadowOpacity: 1.0,
        padding: 3,
        textAlign: 'center'
    }, 
    slideButton: {
        backgroundColor: Colors.buttonColor,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        shadowOffset:{  width: 2,  height: 3, },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
    }
});

export default Slides;
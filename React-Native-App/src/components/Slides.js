import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableHighlight, Button} from 'react-native';
import Colors from '../constants/Colors';
import Translator from './Translator';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const Slides = (props) => {

    state = props.loadLanguage;

    const renderSlides = () => {
        return props.data.map( (slide, index) => {
            return (
                <View key= {slide.text} style={styles.slide} >
                    <Translator style={styles.slideTitle} loadText={slide.text} loadLanguage={this.state.lang} />
                    <Image source={slide.image} style={styles.slideImage} />
                    {
                        props.data.length - 1 !== index &&
                            <Icon style={styles.icon} name='arrow-right' size={24} color='lightgrey'/>
                    }
                    {
                        props.data.length - 1 === index &&
                            <TouchableHighlight
                            onPress={props.onComplete}
                            >
                                <Translator style={styles.footer} loadText={('SIGN UP NOW')} loadLanguage={this.state.lang} />
                            </TouchableHighlight>
                        }
                </View>
            )
        })
    };

    return(
        <ScrollView horizontal pagingEnabled style={{flex: 1}}>
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
        height: SCREEN_HEIGHT,
        backgroundColor: Colors.background
    },
    slideTitle:{
        marginBottom: '110%',
        fontSize: 22,
        color: 'purple',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    slideImage: {
        position: 'absolute',
        width: 350,
        height: 450,
    },
    slideText: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center'
    },

    footer: {
        backgroundColor: Colors.buttonColor,
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        shadowOffset:{  width: 2,  height: 3, },
        shadowColor: 'grey',
        shadowOpacity: 0.5,
    },

    icon: {
        paddingTop: 100
    }
});

export default Slides;
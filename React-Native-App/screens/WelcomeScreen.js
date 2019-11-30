import React from 'react';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    //here we will create the slides to display in our app
    { text: 'Keeping Moms and Infants Healthy', image: require('../assets/images/mother-holding-baby.png')},
    { text: 'Register to learn all related to childcare', image: require('../assets/images/classes-example.png')}
];


const Welcome = ({navigation}) => {

    let lang = navigation.getParam('language')
    console.log(lang)

    onSlidesComplete = () => {
        navigation.navigate('Signin', {language: lang})
    }

    return (
        <Slides data = {SLIDE_DATA} onComplete = {onSlidesComplete} loadLanguage={lang}/>
    );
};


export default Welcome;
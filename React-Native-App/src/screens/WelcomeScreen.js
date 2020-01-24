import React from 'react';
import Slides from '../components/Slides';
import Colors from '../constants/Colors';

const SLIDE_DATA = [
    //here we will create the slides to display in our app
    { text: 'Keeping Moms and Infants Healthy', image: require('../../assets/images/mother.png')},
    { text: 'This is only the beginning...', image: require('../../assets/images/tutorial-info.png')}
];


const Welcome = ({navigation}) => {

    let lang = navigation.getParam('language')

    console.log("Welcome Screen Language: ", lang)

    onSlidesComplete = () => {
        navigation.navigate('Signin', {language: lang})
    }

    return (
        <Slides data={SLIDE_DATA} onComplete={onSlidesComplete} loadLanguage={lang}/>
    );
};


export default Welcome;
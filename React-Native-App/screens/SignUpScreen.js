import React, {useState} from 'react';
import { View, Image, StyleSheet, TextInput, Text, TouchableHighlight } from 'react-native';

import Colors from '../constants/Colors';

const SignUp = props => {

    const [name,setName] = useState('');
    const [middleName,setMiddleName] = useState('');
    const [lastName,setLastName] = useState('');
    const [birthdate,setBirthDate] = useState('');
    const [email,setEmail] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');
    const [pregnant,setPregnant] = useState('');
    const [pregnantMonths,setPregnantMonths] = useState('');
    const [childAge,setChildAge] = useState('');
    const [textNotification,setTextNotification] = useState('');
    const [frequency,setFrequency] = useState('');

    const signUpHandler = () => {

    }
    return (
        <View style={styles.screen}>
            <View>
                <Image source={require('../assets/mom-and-baby-icon.png')} />
            </View>
            <View style={styles.box}>
                <TextInput
                    placeholder={'First Name'}
                    onChangeText={text => setName(text)}
                    style={styles.textInput}
                />
                <View style={styles.seperatorLine} />
                <TextInput
                    placeholder={'Middle Name'}
                    onChangeText={text => setMiddleName(text)}
                    style={styles.textInput}
                />
                <View style={styles.seperatorLine} />
                <TextInput
                    placeholder={'Last Name'}
                    onChangeText={text => setLastName(text)}
                    style={styles.textInput}
                />
            </View>
            <View>
                <TouchableHighlight style={styles.button} onPress={() => signUpHandler()} underlayColor={'rgba(213, 170, 255, 0.8)'} >
                    <Text style={{ fontSize: 18, color: 'black' }}>Sign Up</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    box: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        height: '60%',
        width: '80%',
        borderColor: 'transparent',
        borderRadius: 5,
        backgroundColor: Colors.boxBackground,
        margin: 10,
        padding: 10,
    },
    button: {
        marginTop: 50,
        padding: 10,
        backgroundColor: Colors.boxBackground,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    textInput: {
        margin: 5,
        fontSize: 15,
        width: '80%',
    },
    seperatorLine: {
        width: '100%',
        borderBottomColor: Colors.PurpleBackground,
        borderBottomWidth: 1,
    },
})

export default SignUp;
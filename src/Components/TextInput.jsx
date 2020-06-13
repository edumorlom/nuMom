import React from "react";
import {TextInput as TextBox, View, AsyncStorage} from 'react-native'
import appStyles from "./AppStyles";

export default class TextInput extends React.Component {

    state = {date: null, babyDOB: null};

    convertTextToDate = (text) => {
        let initialText = 'MM/DD/YYYY';
        let date = '';

        for (let i = 0; i < text.length; i++) {
            if (i % 2 === 0 && i !== 0 && i !== 6) date += '/';
            date += text[i]
        }

        return date + initialText.substring(date.length, initialText.length)
    };

    onChangeDate = (text) => {
        let cleanedText = text.split('/').join('');
        cleanedText = cleanedText.split('M').join('');
        cleanedText = cleanedText.split('D').join('');
        cleanedText = cleanedText.split('Y').join('');

        if (this.state.date > text){
            cleanedText = cleanedText.substring(0, cleanedText.length - 1);
        }

        if (!isNaN(cleanedText) && cleanedText.length <= 8) {
            let date = this.convertTextToDate(cleanedText);
            this.setState({date: date});
            this.props.onChangeText(date);
            //We differenciate between mother's DOB and baby's DOB
            AsyncStorage.setItem(this.props.dob === "mother" ? 'dob' : 'babyDOB', date);
               
            
        }
    };

    onChangeText = (text) => {
        if (this.props.type === 'date') this.onChangeDate(text);
        else this.props.onChangeText(text);
    };

    componentDidMount() {
        AsyncStorage.getItem(this.props.dob === "mother" ? 'dob' : 'babyDOB').then((value) => {
          if (value !== null && value !== ''){
          // saved input is available
          this.setState({ date: value }); // Note: update state with last entered value
          this.props.onChangeText(value);
        }
        }).done();

      }

    render() {
        return (
            <View style={appStyles.TextInput.View}>
                <TextBox style={appStyles.TextInput.TextInput}
                         keyboardType={this.props.keyboardType || "default"}
                         secureTextEntry={this.props.type === 'password'}
                         autoCapitalize='none'
                         placeholder={this.props.placeholder}
                         onChangeText={this.onChangeText} value={this.state.date || null}
                         caretHidden={this.props.type === 'date'}
                         value= {!this.props.value && this.props.type === 'date' ? this.state.date : this.props.value}/>
            </View>
        )
    }
}
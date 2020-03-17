import React from "react";
import {TextInput as TextBox, View} from 'react-native'
import appStyles from "./AppStyles";

export default class TextInput extends React.Component {

    state = {date: ''};

    onChangeDate = (text) => {

        let cleanedText = text.split('/').join('');
        cleanedText = cleanedText.split('M').join('');
        cleanedText = cleanedText.split('D').join('');
        cleanedText = cleanedText.split('Y').join('');

        if (this.state.date > text) cleanedText = cleanedText.substring(0, cleanedText.length - 1);

        if (!isNaN(cleanedText) && cleanedText.length <= 8) {
            let date = this.convertTextToDate(cleanedText);
            this.props.onChangeText(date);
            this.setState({date: date})
        }
    };

    convertTextToDate = (text) => {
        let initialText = 'MM/DD/YYYY';
        let date = '';

        for (let i = 0; i < text.length; i++) {
            if (i % 2 === 0 && i !== 0 && i !== 6) date += '/';
            date += text[i]
        }

        return date + initialText.substring(date.length, initialText.length)
    };

    render() {

        if (this.props.type === 'date') {
            return (
                <View style={appStyles.TextInput.View}>
                    <TextBox style={appStyles.TextInput.TextInput}
                             keyboardType={this.props.keyboardType ? this.props.keyboardType : "default"}
                             autoCapitalize='none'
                             placeholder={this.props.placeholder}
                             onChangeText={this.onChangeDate}
                             value={this.state.date}/>
                </View>
            )
        } else {

            return (
                <View style={appStyles.TextInput.View}>
                    <TextBox style={appStyles.TextInput.TextInput}
                             keyboardType={this.props.keyboardType ? this.props.keyboardType : "default"}
                             secureTextEntry={this.props.type === 'password'}
                             autoCapitalize='none'
                             placeholder={this.props.placeholder}
                             onChangeText={this.props.onChangeText}/>
                </View>
            )
        }
    }
}
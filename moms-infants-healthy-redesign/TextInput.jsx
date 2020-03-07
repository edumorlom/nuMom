import React from "react";
import {TextInput as TextBox, View} from 'react-native'
import appStyles from "./AppStyles";

export default class TextInput extends React.Component {

    state = {date: ''};

    onChangeDate = (text) => {
        let cleanedText = text.split('/').join('');
        if (!isNaN(cleanedText) && cleanedText.length <= 6) {
            let date = this.convertTextToDate(cleanedText);
            this.props.onChangeText(date);
            this.setState({date: date})
        }
    };

    convertTextToDate = (text) => {
        let date = '';

        for (let i = 0; i < text.length; i++) {
            if (i % 2 === 0 && i !== 0) date += '/';
            date += text[i]
        }
        return date
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
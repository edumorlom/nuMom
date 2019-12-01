import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { TranslatorFactory } from 'react-native-power-translator';

export default class Translator extends Component {
    translatedText;

    static propTypes = {
        style: PropTypes.object,
    };

    static defaultProps = {
        translatedText: '',
        style: {},
    };

    constructor(props) {
        super(props);
        this.state = {
            translatedText: '',
        };
    }
    
    componentDidMount() {
        this.getTranslation();
    }

    componentWillReceiveProps() {
        this.getTranslation();
    }

    getTranslation() {
        const translator = TranslatorFactory.createTranslator();
        translator.translate(this.props.loadText, this.state.language).then(translated => {
            if (translated[0] === '\'' || translated[0] === '\"') {
                translated = translated.slice(1);
            }
            if (translated[translated.length - 1] === '\'' || translated[translated.length - 1] === '\"') {
                translated = translated.slice(0, translated.length - 1);
            }
            this.setState({ translatedText: translated })
        });
    }

    render() {
        return (
            <View>
                <Text style={{ ...this.props.style }}>
                    {this.state.translatedText}
                </Text>
            </View>
        );
    }
}
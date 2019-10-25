import React from 'react';
import { View, StyleSheet, Picker } from 'react-native';
import { TranslatorFactory } from 'react-native-power-translator';

export default class MyPicker extends React.Component {
    // easy translations 
    constructor(props) {
        super(props)
        this.state = {
            lang: this.props.loadLanguage,
            pickerType: this.props.loadPickerType,
            screen: null,
            picker: 'N/A',
            month: null,
            months: null,
            bi_weekly: null,
            weekly: null,
            monthly: null,
        }
    }
    render() {
        // Pick what type of Picker you want, can always add more array's of options for more options
        let availablePicks = []
        if (this.state.pickerType === 'Monthly') {
            availablePicks = [
                'N/A',
                '1 ' + this.state.month,
                '2 ' + this.state.months,
                '3 ' + this.state.months,
                '4 ' + this.state.months,
                '5 ' + this.state.months,
                '6 ' + this.state.months,
                '7 ' + this.state.months,
                '8 ' + this.state.months,
                '9 ' + this.state.months,
                '10 ' + this.state.months,
            ];
        };
        if (this.state.pickerType === 'Notification') {
            availablePicks = [
                'N/A',
                this.state.weekly,
                this.state.bi_weekly,
                this.state.monthly,
            ];
        };
        // loop available Picks values
        let getItems = availablePicks.map((pick, index) => {
            return <Picker.Item key={index} value={index} label={pick} />
        })

        return (
            <View>
                <Picker style={{ ...styles.picker, ...this.props.style }}
                    itemStyle={{ height: 80 }}
                    selectedValue={this.state.picker}
                    onValueChange={text => this.exporterPicker(text)}>
                    {getItems}
                </Picker>
            </View>
        )
    }
    componentDidMount() {
        this.setState({ picker: this.props.loadValue})
        this.getTranslations();
    }
    // export values on renderings
    exporterPicker = (value) => {
        this.setState({ picker: value });
        this.props.getPickerValue(value);
    }
    // gets translations
    getTranslations = () => {
        const translator = TranslatorFactory.createTranslator();
        (translator.translate('Month', this.state.lang).then(translated => {
            var value = this.removeQuotes(translated)
            this.setState({ month: value })
        }));
        (translator.translate('Months', this.state.lang).then(translated => {
            var value = this.removeQuotes(translated)
            this.setState({ months: value })
        }));
        (translator.translate('Bi-weekly', this.state.lang).then(translated => {
            var value = this.removeQuotes(translated)
            this.setState({ bi_weekly: value })
        }));
        (translator.translate('Weekly', this.state.lang).then(translated => {
            var value = this.removeQuotes(translated)
            this.setState({ weekly: value })
        }));
        (translator.translate('Monthly', this.state.lang).then(translated => {
            var value = this.removeQuotes(translated)
            this.setState({ monthly: value })
        }));
    }
    removeQuotes = (value) => {
        var translated = value;
        if (translated[0] === '\'') {
            translated = translated.slice(1);
        }
        if (translated[translated.length - 1] === '\'') {
            translated = translated.slice(0, translated.length - 1);
        }
        return translated
    }
}

const styles = StyleSheet.create({
    picker: {
        width: '100%',
        paddingRight: 20,
        height: 80
    },
});
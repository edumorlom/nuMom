import * as React from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ActionSheet from 'react-native-actionsheet';
import { TranslatorFactory } from 'react-native-power-translator';

export default class ImagePickerProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            lang: this.props.passLang,
            title: null,
            photo: '',
            library: '',
            cancel: '',
        }
    }
    showActionSheet = () => {
        this.ActionSheet.show()
    }
    render() {
        let { image } = this.state;

        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.showActionSheet}>
                    {image ?
                        // user image
                        <Image source={{ uri: image }} style={{ ...styles.image, ...this.props.style }} /> :
                        // default iamge or old user image
                        this.decideImage(this.props.passPicture)
                    }
                </TouchableOpacity>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={this.state.title}
                    options={[this.state.photo, this.state.library, this.state.cancel]}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => { this._pickImage(index) }}
                />
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
        this.getTranslations();
    }
    // gets translations
    getTranslations = () => {
        const translator = TranslatorFactory.createTranslator();
        (translator.translate('Title', this.state.lang).then(translated => {
            var value = this.removeQuotes(translated)
            this.setState({ title: value })
        }));
        (translator.translate('Take Photo...', this.state.lang).then(translated => {
            var value = this.removeQuotes(translated)
            this.setState({ photo: value })
        }));
        (translator.translate('Choose from library...', this.state.lang).then(translated => {
            var value = this.removeQuotes(translated)
            this.setState({ library: value })
        }));
        (translator.translate('Cancel', this.state.lang).then(translated => {
            var value = this.removeQuotes(translated)
            this.setState({ cancel: value })
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
    // camera permissions
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
            await Permissions.askAsync(Permissions.CAMERA);
        }
    }
    _pickImage = async (input) => {
        //take picture with camera 
        if (input === 0) {
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3]
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
                this.pictureExporter(this.state.image);
            }
        }
        // choose from library
        else if (input === 1) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
                this.pictureExporter(this.state.image);
            }
        }
        else {
            //do nothing for cancel
        }
    };

    pictureExporter = (pic) => {
        this.props.getPicture(pic);
    }

    decideImage = (input) => {
        if (input === '../assets/mom-and-baby-icon-editable.png') {
            return (<Image source={require('../assets/mom-and-baby-icon-editable.png')} />)
        }
        else {
            return (<Image source={{ uri: this.props.passPicture }} style={{ width: 125, height: 125, borderRadius: 125 / 2 }} />)
        }
    }
}

const styles = StyleSheet.create({
    image: {
        width: 125, 
        height: 125, 
        borderRadius: 125 / 2
    }
})
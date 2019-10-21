import * as React from 'react';
import { Image, View, TouchableOpacity, TouchableHighlightBase } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import ActionSheet from 'react-native-actionsheet';
import { PowerTranslator, ProviderTypes, TranslatorConfiguration, TranslatorFactory } from 'react-native-power-translator';

export default class ImagePickerProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            lang: this.props.passLang,
        }
    }
    showActionSheet = () => {
        this.ActionSheet.show()
    }

    render() {
        let { image } = this.state;
        // to make translations
        let { lang } = this.state;
        TranslatorConfiguration.setConfig(ProviderTypes.Microsoft, 'de6f9f5aaa86420da79a3dc450cd4e6c', lang);
        // handles the translations of labels and options
        var title = '';
        if (lang === 'en') { title = 'Select a Profile Picture' }
        else if (lang === 'es') { title = 'Seleccione una foto de perfil' }
        else { title = 'chwazi yon foto pwofil' }
        var takePhoto = '';
        if (lang === 'en') { takePhoto = 'Take Photo...' }
        else if (lang === 'es') { takePhoto = 'Tomar foto...' }
        else { takePhoto = 'pran foto' }
        var chooseLibrary = '';
        if (lang === 'en') { chooseLibrary = 'Choose from library...' }
        else if (lang === 'es') { chooseLibrary = 'Elige de la biblioteca...' }
        else { chooseLibrary = 'chwazi nan bibliyotèk la' }
        var cancel = '';
        if (lang === 'en') { cancel = 'Cancel' }
        else if (lang === 'es') { cancel = 'Cancelar' }
        else { cancel = 'anile' }

        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.showActionSheet}>
                    {image ?
                        // user image
                        <Image source={{ uri: image }} style={{ width: 125, height: 125, borderRadius: 125 / 2 }} /> :
                        // default iamge or old user image
                        this.decideImage(this.props.passPicture)
                    }
                </TouchableOpacity>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={title}
                    options={[takePhoto, chooseLibrary, cancel]}
                    cancelButtonIndex={2}
                    destructiveButtonIndex={1}
                    onPress={(index) => { this._pickImage(index) }}
                />
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

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
import * as React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ImagePickerProfile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
        }
    }
    render() {
        let { image } = this.state;
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={this._pickImage}>
                    {image ?
                    // user image
                        <Image source={{ uri: image }} style={{ width: 125, height: 125, borderRadius: 125 / 2 }} /> :
                    // default iamge or old user image
                        this.decideImage(this.props.passPicture)
                    }
                    </TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            this.setState({ image: result.uri });
            this.pictureExporter(this.state.image);
        }
    };

    pictureExporter = (pic) => {
        this.props.getPicture(pic);
    }

    decideImage = (input) => {
        if (input === '../assets/mom-and-baby-icon-editable.png') 
        {
            return (<Image source={require('../assets/mom-and-baby-icon-editable.png')} />)
        }
        else {
            return (<Image source={{ uri: this.props.passPicture }} style={{ width: 125, height: 125, borderRadius: 125 / 2 }} />)
        }
    }
}
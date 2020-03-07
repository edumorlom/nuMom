import { RFValue } from "react-native-responsive-fontsize";
import {Dimensions} from "react-native";

export let win = Dimensions.get('window');
export let pinkColor = "#DF2172";
export let blueColor = "#0052A1";
export let greyColor = "#A9A9A9";
export let darkGreyColor = "#5E5E5E";
export let backgroundColor = "white";
export let titleFontSize = RFValue(30);
export let regularFontSize = RFValue(20);
export let borderRadius = 20;
export let shadow = {
    shadowColor: darkGreyColor,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 5
};

export default {
    win: win,
    container: {
        alignItems: 'center',
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row'
    },
    background: {
        color: backgroundColor
    },
    shadow: shadow,
    pinkColor: pinkColor,
    blueColor: blueColor,
    greyColor: greyColor,
    darkGreyColor: darkGreyColor,
    titleFontSize: titleFontSize,
    regularFontSize: regularFontSize,
    titleBlue: {
        fontSize: titleFontSize,
        fontWeight: 'bold',
        color: blueColor,
        textAlign: 'center'
    },
    titlePink: {
        fontSize: titleFontSize,
        fontWeight: 'bold',
        color: pinkColor,
        textAlign: 'center'
    },
    titleBlack: {
        fontSize: titleFontSize,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    titleWhite: {
        fontSize: titleFontSize,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center'
    },
    paragraphText: {
        color: greyColor,
        fontSize: regularFontSize,
        fontWeight: 'bold'
    },
    button: {
        TouchableHighlight: {
            ...shadow,
            margin: win.height * 0.01,
            alignItems: 'center',
            backgroundColor: pinkColor,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 30,
            paddingRight: 30,
            borderRadius: borderRadius,
        },
        text: {
            color: 'white',
            fontSize: regularFontSize,
            fontWeight: 'normal'
        }
    },
    TextInput: {
        View: {
            ...shadow,
            height: 60,
            width: win.width * 0.8,
            margin: 9,
            borderColor: 'white',
            borderWidth: 0.5,
            borderRadius: borderRadius,
            justifyContent: 'center',
            backgroundColor: 'white'

        },
        TextInput: {
            fontSize: regularFontSize,
            textAlign: 'center',
        }
    },
    ClickableText: {
        color: blueColor,
        fontSize: regularFontSize,
        fontWeight: 'bold',
    },
    WelcomeUserBanner: {
        TouchableHighlight: {
            ...shadow,
            backgroundColor: blueColor,
            borderBottomRightRadius: borderRadius,
            justifyContent: 'center',
            borderTopRightRadius: borderRadius,
            flexDirection: 'row',
            marginRight: '30%',
            padding: '5%',
            marginBottom: '5%'
        }
    },
    WhitePanelButton: {
        ...shadow,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: borderRadius,
        marginTop: 30,
        marginLeft: 30,
        height: 55,
        width: 170,
        flexDirection: 'row',
    },
    lowerPanel: {
        ...shadow,
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: borderRadius,
        width: '100%',
        height: '70%',
        bottom: 0 - Math.ceil(win.height * 0.4 / 100) * 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    }
};
import { RFValue } from "react-native-responsive-fontsize";
import {Dimensions, Text} from "react-native";

export let win = Dimensions.get('window');
export let pinkColor = "#DF2172";
export let blueColor = "#0052A1";
export let greyColor = "#A9A9A9";
export let darkGreyColor = "#5E5E5E";
export let backgroundColor = "white";
export let titleFontSize = RFValue(30);
export let regularFontSize = RFValue(20);
export let borderRadius = 15;
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
            margin: 10,
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
            height: 50,
            width: 300,
            margin: 10,
            borderColor: greyColor,
            borderWidth: 0.5,
            borderRadius: borderRadius,
            justifyContent: 'center',

        },
        TextInput: {
            fontSize: regularFontSize,
            textAlign: 'center',
            color: 'black'
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
        shadowColor: shadow.shadowColor,
        shadowOffset: shadow.shadowOffset,
        shadowOpacity: shadow.shadowOpacity,
        shadowRadius: 5,
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
        shadowColor: shadow.shadowColor,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowRadius: 15,
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
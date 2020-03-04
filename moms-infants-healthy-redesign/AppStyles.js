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
            fontSize: RFValue(20),
            fontWeight: 'normal'
        }
    },
    TextInput: {
        View: {
            shadowColor: shadow.shadowColor,
            shadowOffset: shadow.shadowOffset,
            shadowOpacity: 0.4,
            shadowRadius: shadow.shadowRadius,
            height: 50,
            width: 300,
            padding: 5,
            margin: 9,
            borderColor: greyColor,
            borderWidth: 0.5,
            borderRadius: borderRadius,
        },
        TextInput: {
            fontSize: RFValue(22),
            textAlign: 'center',
            alignItems: 'center',
            color: 'black',
        }
    },
    ClickableText: {
        color: blueColor,
        fontSize: RFValue(18),
        fontWeight: 'bold',
    },
    WelcomeUserBanner: {
        TouchableHighlight: {
            backgroundColor: blueColor,
            shadowColor: shadow.shadowColor,
            shadowOffset: shadow.shadowOffset,
            shadowOpacity: shadow.shadowOpacity,
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
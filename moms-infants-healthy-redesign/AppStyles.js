export let pinkColor = "#DF2172";
export let blueColor = "#0052A1";
export let greyColor = "#A9A9A9";
export let darkGreyColor = "#5E5E5E";
export let backgroundColor = "white";
export let titleFontSize = 35;
export let borderRadius = 12;
export let shadow = {
    shadowColor: darkGreyColor,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 7
};

export default {
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
            shadowColor: shadow.shadowColor,
            shadowOffset: shadow.shadowOffset,
            shadowOpacity: shadow.shadowOpacity,
            shadowRadius: shadow.shadowRadius
        },
        text: {
            color: 'white',
            fontSize: 25,
            fontWeight: 'normal'
        }
    },
    TextInput: {
        View: {
            shadowColor: shadow.shadowColor,
            shadowOffset: {width: 10, height: 10},
            shadowOpacity: 1,
            shadowRadius: 10,
            height: 50,
            width: 300,
            margin: 10,
            borderColor: greyColor,
            borderWidth: 0.5,
            borderRadius: borderRadius,
        },
        TextInput: {
            fontSize: 25,
            textAlign: 'center',
            color: 'black',
            paddingTop:7
        }
    },
    ClickableText: {
        color: blueColor,
        fontSize: 20,
        fontWeight: 'bold',
    },
    WhitePanelButton: {
        shadowColor: shadow.shadowColor,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 1,
        shadowRadius: 10,
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
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: borderRadius,
        width: '100%',
        height: '55%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    }
};
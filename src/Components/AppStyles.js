
import { RFValue } from "react-native-responsive-fontsize";
import { Dimensions } from "react-native";

export let win = Dimensions.get('window');
export let pinkColor = "#DF2172";
export let blueColor = "#0052A1";
export let greyColor = "#A9A9A9";
export let darkGreyColor = "#5E5E5E";
export let backgroundColor = "white";
export let titleFontSize = RFValue(30);
export let regularFontSize = RFValue(20);
export let title = {
    fontSize: titleFontSize,
    fontWeight: 'bold',
    textAlign: 'center'
};
export let borderRadius = 20;
export let shadow = {
    shadowColor: darkGreyColor,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 1
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
    title: title,
    titleBlue: {
        color: blueColor,
        ...title
    },
    titlePink: {
        ...title,
        color: pinkColor,
    },
    titleBlack: {
        ...title,
        color: 'black'
    },
    titleGrey: {
        ...title,
        color: greyColor
    },
    titleWhite: {
        ...title,
        color: 'white',
    },
    paragraphText: {
        color: greyColor,
        fontSize: regularFontSize,
        fontWeight: 'bold'
    },
    underlayColor: 'grey',
    button: {
        Touchable: {
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
        Text: {
            color: 'white',
            fontSize: regularFontSize,
            fontWeight: 'normal'
        },
        underlayColor: blueColor
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
    TextInputMask: {
        ...shadow,
        height: 60,
        width: win.width * 0.8,
        margin: 9,
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: borderRadius,
        justifyContent: 'center',
        backgroundColor: 'white',
        fontSize: regularFontSize,
        textAlign: 'center'

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
            borderTopRightRadius: borderRadius,
            justifyContent: 'center',
            flexDirection: 'row',
            marginRight: '30%',
            //marginTop: win.height * 0.015,
            padding: win.height * 0.025,
            marginBottom: win.height * 0.02,
            width: '75%'
        }
    },
    WhitePanelButton: {
        ...shadow,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: borderRadius,
        height: 40,
        width: 40,

    },

    lowerPanel: {
        overflow: 'hidden',
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: borderRadius,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        width: '100%',
        height: '70%',
        bottom: 0 - win.height * 0.20,
        //bottom: 0 - Math.ceil(win.height * 0.3 / 100) * 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },

    PanelSelectionButton: {
        Touchable: {
            margin: win.height * 0.009,
            backgroundColor: 'white',
            ...shadow,
            height: win.height * 0.15,
            width: '85%',
            borderColor: greyColor,
            borderRadius: borderRadius
        },
        View: {
            flexDirection: 'row',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginLeft: '14%'
        },
        Image: {
            width: win.height * 0.07,
            height: win.height * 0.07,
            marginRight: win.width * 0.105
        },
        Text: {
            fontSize: regularFontSize,
            fontWeight: 'bold'
        }
    },
    ImageOnRightSelectionButton: {
        Touchable: {
            margin: 5,
            padding: 20,
            backgroundColor: "white",
            ...shadow,
            minHeight: win.height * 0.2,
            maxHeight: win.height * 0.3,
            width: win.width * 0.95,
            borderColor: greyColor,
            borderRadius: borderRadius,
            alignItems: "center",
            flexDirection: "row",
        },
        View: {
            height: "100%",
            width: "70%",
            marginRight: 20
        },
        ImageView: {
            height: "100%",
            width: "7%",
            justifyContent: "center"
        },
        ImageInView: {
            width: 65,
            height: 65
        },
        Text: {
            color: blueColor,
            fontSize: regularFontSize,
            fontWeight: "bold",
        },
        Subtext: {
            color: greyColor,
            fontSize: regularFontSize,
        }
    },
    STDSelectionButton: {
        Touchable: {
            margin: 5,
            padding: 20,
            backgroundColor: "white",
            ...shadow,
            minHeight: win.height * 0.002,
            maxHeight: win.height * 0.08,
            width: win.width * 0.8,
            borderColor: greyColor,
            borderRadius: borderRadius,
            alignItems: "center",
            flexDirection: "column",

        },
        View: {
            height: "100%",
            width: "90%",
            marginRight: 50
        },
        Text: {
            color: blueColor,
            fontSize: regularFontSize,
            fontWeight: "bold",

        }

    },
    FCSelectionButton: {
        Touchable: {
            margin: 5,
            padding: 20,
            backgroundColor: "white",
            ...shadow,
            width: win.width,
            borderColor: greyColor,
            borderRadius: borderRadius,
            alignItems: "center",
            flexDirection: "column",

        },
        Text: {
            color: blueColor,
            fontSize: regularFontSize,
            fontWeight: "bold",

        }

    },
    ClinicSelectionButton: {
        Touchable: {
            margin: 5,
            padding: 20,
            backgroundColor: 'white',
            ...shadow,
            minHeight: win.height * 0.2,
            maxHeight: win.height * 0.3,
            width: win.width * 0.95,
            borderColor: greyColor,
            borderRadius: borderRadius,
            alignItems: 'center',
            flexDirection: 'row'
        },
        View: {
            height: '100%',
            width: '80%'
        },
        ImageView: {
            height: '100%',
            width: '7%',
            justifyContent: 'center'
        },
        ImageInView: {
            width: 40,
            height: 40
        },

        Text: {
            color: blueColor,
            fontSize: regularFontSize,
            fontWeight: 'bold'

        },
        Subtext: {
            color: greyColor,
            fontSize: regularFontSize

        },
    },
    CancelFilterButton: {
        Touchable: {
            position: 'absolute',
            right: '2%',
            top: '2%',
            width: '13%',
            flexDirection: 'row-reverse',
            marginTop: 30
        },
        View: {
            ...shadow,
            justifyContent: 'center',
            backgroundColor: 'white',
            borderColor: 'white',
            borderWidth: 0.5,
            borderRadius: borderRadius,
            height: 40,
            width: 40,
        },

        Image: {
            width: 30,
            height: 30,
            marginLeft: 'auto',
            marginRight: 'auto'

        },
    },
    ActionButton: {
        Touchable: {
            margin: 4,
            paddingLeft: 20,
            justifyContent: 'center',
            backgroundColor: 'white',
            ...shadow,
            height: win.height * 0.11,
            width: win.width * 0.95,
            borderRadius: borderRadius

        },
        View: {
            alignItems: 'center',
            flexDirection: 'row'
        },

        Image: {
            width: 40,
            height: 40,
            marginRight: 20
        },
        TextView: {

        },
        TextInView: {
            color: blueColor,
            fontSize: regularFontSize,
            fontWeight: 'bold'
        },
        SubtextInView: {
            color: greyColor,
            fontSize: regularFontSize
        }
    },
    MultipleChoiceButton: {
        Touchable: {
            alignItems: 'center',
            justifyContent: 'center',
            height: win.height * 0.11,
            width: win.width * 0.24,
            margin: 20,
            borderRadius: borderRadius,
            ...shadow

        },
        Text: {
            fontSize: RFValue(45)
        }
    },
    viewPlus: {

        height: 50,
        width: 50,
        backgroundColor: '#2E66E7',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        zIndex: 999,
        marginRight: 25
    
      },

    BackButton: {
        Touchable: {
            height: win.height * 0.04,
            marginTop: "12%",
            marginLeft: "3%",
            marginBottom: '5%',
            width: win.width * 0.07,

        },
        Image: {
            height: win.width * 0.06,
            width: win.width * 0.06,

        },
        underlayColor: "transparent"
    }

};
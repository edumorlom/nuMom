export let pinkColor = "#DF2172";
export let blueColor = "#0052A1"
export let greyColor = "#A9A9A9";
export let backgroundColor = "white";
export let titleFontSize = 25;
export let borderRadius = 15;

export default {
    container: {
        alignItems: 'center',
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row'
    },
    background: {
        color:backgroundColor
    },
    pinkColor: pinkColor,
    blueColor: blueColor,
    greyColor: greyColor,
    titleFontSize: titleFontSize,
    titleBlue: {
        fontSize: 35,
        fontWeight: 'bold',
        color: blueColor,
        textAlign: 'center'
    },
    titlePink: {
        fontSize: 35,
        fontWeight: 'bold',
        color: pinkColor,
        textAlign: 'center'
    },
    titleBlack: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center'
    },
    titleWhite: {
        fontSize: 35,
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
            fontSize: titleFontSize,
            fontWeight: 'normal'
        }
    },
    TextBox: {
        height: 50,
        width: 300,
        color: 'black',
        margin: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderColor: greyColor,
        borderWidth: 0.5,
        borderRadius: borderRadius,
        fontSize: titleFontSize,
        textAlign: 'center'
    },
    ClickableText:{
        color: blueColor,
        fontSize: 19,
        fontWeight: 'bold',
    },
};
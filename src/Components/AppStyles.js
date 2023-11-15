// This file provides the styles for the whole App
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions, Platform} from 'react-native';

export const win = Dimensions.get('window');
export const pinkColor = '#DF2172';
export const blueColor = '#0052A1';
export const greyColor = '#A9A9A9';
export const darkGreyColor = '#5E5E5E';
export const greenColor = '#298000';
export const blackColor = '#000000'; // export black color
export const backgroundColor = 'white';
export const titleFontSize = RFValue(30);
export const regularFontSize = RFValue(20);
export const smallFontSize = RFValue(13);
export const settingsPageLabelsFontSize = RFValue(16);
export const title = {
  fontSize: titleFontSize,
  fontWeight: 'bold',
  textAlign: 'center',
};
export const borderRadius = 20;
export const shadow = {
  shadowColor: blackColor, // change darkgrey color to black color for shadow
  shadowOffset: {width: 1, height: 1},
  shadowOpacity: 0.3, // increase the opacity of shadow color from 0.25 to 0.3
  shadowRadius: 5,
  elevation: 1,
};

export default {
  win,
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  signupContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'center',
    maxWidth: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  learnAndResourceTabContentContainer: {
    alignItems: 'center',
    maxWidth: '100%',
    backgroundColor: 'white',
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  background: {
    color: backgroundColor,
  },
  shadow,
  pinkColor,
  blueColor,
  blackColor, // add black color
  greyColor,
  darkGreyColor,
  titleFontSize,
  regularFontSize,
  title,
  titleBlue: {
    color: blueColor,
    ...title,
  },
  titlePink: {
    ...title,
    color: pinkColor,
  },
  titleBlack: {
    ...title,
    color: 'black',
  },
  titleGrey: {
    ...title,
    color: greyColor,
  },
  titleWhite: {
    ...title,
    color: 'white',
  },
  paragraphText: {
    color: greyColor,
    fontSize: regularFontSize,
    fontWeight: 'bold',
  },
  descriptionText: {
    color: blueColor,
    fontSize: smallFontSize,
    fontWeight: 'bold',
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
      borderRadius,
    },
    Text: {
      color: 'white',
      fontSize: regularFontSize,
      fontWeight: 'normal',
    },
    underlayColor: blueColor,
  },
  logbutton: {
    Touchable: {
      margin: win.height * 0.01,
      alignItems: 'center',
      backgroundColor: 'transparent',
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 15,
      paddingRight: 10,
      borderRadius,
    },
    underlayColor: 'transparent',
  },
  TextInput: {
    View: {
      ...shadow,
      height: 60,
      width: win.width * 0.8,
      margin: 9,
      borderColor: 'white',
      borderWidth: 0.5,
      borderRadius,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    TextInput: {
      fontSize: regularFontSize,
      fontWeight: 'bold', // add new line fontweight for text input for login and signup to make text more visible
      textAlign: 'center',
    },
  },
    DefaultPlaceholderTextColor: "#adb5bd",
  TextInputMask: {
    ...shadow,
    height: 60,
    width: win.width * 0.8,
    margin: 9,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius,
    justifyContent: 'center',
    backgroundColor: 'white',
    fontSize: regularFontSize,
    fontWeight: 'bold', // add new line fontweight for text input mask class for login and signup to make text more visible
    textAlign: 'center',
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
      // marginTop: win.height * 0.015,
      padding: win.height * 0.025,
      marginBottom: win.height * 0.02,
      width: '75%',
    },
  },
  WhitePanelButton: {
    ...shadow,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius,
    height: 40,
    width: 40,
  },

  lowerPanel: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },

  // The styles for the Buttons dictate which type of button will be displayed
  // For instance if you don't include a Text property there won't be any text

  PanelSelectionButton: {
    Touchable: {
      margin: win.height * 0.009,
      backgroundColor: 'white',
      ...shadow,
      height: win.height * 0.13,
      width: '90%',
      borderColor: greyColor,
      borderRadius,
    },
    View: {
      flexDirection: 'row',
      height: '100%',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginLeft: '14%',
    },
    Image: {
      width: win.height * 0.07,
      height: win.height * 0.07,
      marginRight: win.width * 0.105,
    },
    Text: {
      fontSize: regularFontSize,
      fontWeight: 'bold',
    },
  },
  Notes: {
    Touchable: {
      margin: 5,
      padding: 10,
      backgroundColor: 'white',
      ...shadow,
      width: win.width * 0.95,
      borderColor: greyColor,
      borderRadius,
      alignItems: 'center',
      flexDirection: 'row',
    },
    View: {
      width: '100%',
      height: '100%',
    },
    Text: {
      color: greyColor,
      fontSize: regularFontSize,
      textAlign: 'justify',
    },
  },
  FeedingNotes: {
    Touchable: {
      margin: 5,
      padding: 20,
      backgroundColor: 'white',
      ...shadow,
      width: win.width * 0.95,
      borderColor: greyColor,
      borderRadius,
      alignItems: 'center',
      flexDirection: 'row',
    },
    View: {
      width: '100%',
      height: '100%',
    },
    Text: {
      color: darkGreyColor,
      fontSize: regularFontSize,
      letterSpacing: .25,
    },
  },
  ImageOnRightSelectionButton: {
    Touchable: {
      margin: 5,
      padding: 20,
      backgroundColor: 'white',
      ...shadow,
      minHeight: win.height * 0.2,
      maxHeight: win.height * 0.4,
      width: win.width * 0.95,
      borderColor: greyColor,
      borderRadius,
      alignItems: 'center',
      flexDirection: 'row',
    },
    View: {
      height: '100%',
      width: '70%',
      marginRight: 20,
    },
    ImageView: {
      height: '100%',
      width: '7%',
      justifyContent: 'center',
    },
    ImageInView: {
      width: 65,
      height: 65,
    },
    Text: {
      color: blueColor,
      fontSize: regularFontSize,
      fontWeight: 'bold',
    },
    Subtext: {
      color: greyColor,
      fontSize: regularFontSize,
    },
  },
  openDocumentButton: {
    Touchable: {
      margin: 5,
      padding: 20,
      backgroundColor: 'white',
      ...shadow,
      minHeight: win.height * 0.2,
      maxHeight: win.height * 0.4,
      width: win.width * 0.4,
      borderColor: greyColor,
      borderRadius,
      alignItems: 'center',
      flexDirection: 'row',
    },
    View: {
      height: '100%',
      width: '70%',
      marginRight: 20,
    },
    ImageView: {
      height: '100%',
      width: '7%',
      justifyContent: 'center',
    },
    ImageInView: {
      width: 65,
      height: 65,
    },
    Text: {
      color: blueColor,
      fontSize: regularFontSize,
      fontWeight: 'bold',
    },
    Subtext: {
      color: greyColor,
      fontSize: regularFontSize,
    },
  },
  deleteButton: {
    Touchable: {
      margin: 5,
      //padding: 20,
      backgroundColor: 'white',
      ...shadow,
      minHeight: win.height * 0.2,
      maxHeight: win.height * 0.4,
      width: win.width * 0.4,
      borderColor: greyColor,
      borderRadius,
      alignItems: 'center',
      flexDirection: 'row',
    },
    View: {
      height: '100%',
      width: '30%',
    },
    ImageView: {
      height: '100%',
      width: '7%',
      justifyContent: 'center',
    },
    ImageInView: {
      width: 65,
      height: 65,
    },
    Text: {
      color: blueColor,
      fontSize: regularFontSize,
      fontWeight: 'bold',
    },
    Subtext: {
      color: greyColor,
      fontSize: regularFontSize,
    },
  },
  ImageDarkOnSelectionButton: {
    Touchable: {
      margin: 5,
      padding: 20,
      backgroundColor: 'white',
      ...shadow,
      minHeight: win.height * 0.2,
      maxHeight: win.height * 0.4,
      width: win.width * 0.95,
      borderColor: greyColor,
      borderRadius,
      alignItems: 'center',
      flexDirection: 'row',
    },
    View: {
      height: '100%',
      width: '70%',
      marginRight: 20,
    },
    ImageView: {
      height: '100%',
      width: '7%',
      justifyContent: 'center',
    },
    ImageInView: {
      width: 65,
      height: 65,
    },
    Text: {
      color: blueColor,
      fontSize: regularFontSize,
      fontWeight: 'bold',
    },
    Subtext: {
      color: darkGreyColor,
      fontSize: regularFontSize,
    },
  },

  STDFemaleCondomSelectionButton: {
    Touchable: {
      margin: 5,
      padding: 20,
      backgroundColor: 'white',
      ...shadow,
      width: win.width * 0.8,
      borderColor: greyColor,
      borderRadius,
      alignItems: 'center',
      flexDirection: 'column',
    },
    Text: {
      color: blueColor,
      fontSize: RFValue(19),
      fontWeight: 'bold',
      textAlign: 'center',
    },
  },
  FemaleCondomDoMenu: {
    Touchable: {
      margin: 5,
      padding: 10,
      justifyContent: 'center',
      backgroundColor: 'white',
      ...shadow,
      width: win.width * 0.95,
      borderRadius,
    },
    Text: {
      color: greenColor,
      fontSize: RFValue(16),
      textAlign: 'justify',
    },
  },
  FemaleCondomDontMenu: {
    Touchable: {
      margin: 5,
      padding: 10,
      justifyContent: 'center',
      backgroundColor: 'white',
      ...shadow,
      width: win.width * 0.95,
      borderRadius,
    },
    Text: {
      color: pinkColor,
      fontSize: RFValue(16),
      textAlign: 'justify',
    },
  },
  FemaleCondomMenuImage: {
    Touchable: {
      margin: 5,
      padding: 20,
      backgroundColor: 'white',
      ...shadow,
      minHeight: win.height * 0.2,
      maxHeight: win.height * 0.3,
      width: win.width * 0.95,
      borderColor: greyColor,
      borderRadius,
      alignItems: 'center',
      flexDirection: 'row',
    },
    View: {
      height: '100%',
      width: '70%',
      marginRight: win.width * 0.02,
    },
    ImageView: {
      height: '100%',
      width: '7%',
      justifyContent: 'center',
    },
    ImageInView: {
      width: 80,
      height: 80,
    },
    Text: {
      color: darkGreyColor,
      fontSize: RFValue(16),
    },
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
      borderRadius,
      alignItems: 'center',
      flexDirection: 'row',
    },
    View: {
      height: '100%',
      width: '80%',
    },
    ImageView: {
      height: '100%',
      width: '7%',
      justifyContent: 'center',
    },
    ImageInView: {
      width: 40,
      height: 40,
    },

    Text: {
      color: blueColor,
      fontSize: regularFontSize,
      fontWeight: 'bold',
    },
    Subtext: {
      color: darkGreyColor,
      fontSize: regularFontSize,
      fontWeight: 'bold',
    },
    SubtextRegular: {
      color: greyColor,
      fontSize: regularFontSize,
    },
  },
  FilterButton: {
    Touchable: {
      width: win.width * 0.15,
      height: win.width * 0.08,
    },
    Image: {
      left: win.width * 0.008,
      height: win.width * 0.085,
      width: win.width * 0.085,
    },
  },
  CancelFilterButton: {
    Touchable: {
      position: 'absolute',
      right: '2%',
      top: '2%',
      width: '13%',
      flexDirection: 'row-reverse',
      marginTop: 30,
    },
    View: {
      ...shadow,
      justifyContent: 'center',
      backgroundColor: 'white',
      borderColor: 'white',
      borderWidth: 0.5,
      borderRadius,
      height: 40,
      width: 40,
    },
    Image: {
      width: 30,
      height: 30,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  ActionButton: {
    Touchable: {
      margin: 10,
      paddingLeft: 20,
      justifyContent: 'center',
      backgroundColor: 'white',
      ...shadow,
      minHeight: win.height * 0.11,
      maxHeight: win.height * 0.22,
      width: win.width * 0.95,
      borderRadius,
    },
    View: {
      alignItems: 'center',
      flexDirection: 'row',
    },

    Image: {
      width: 40,
      height: 40,
      marginRight: 20,
    },
    TextView: {},
    TextInView: {
      color: blueColor,
      fontSize: regularFontSize,
      fontWeight: 'bold',
    },
    SubtextInView: {
      color: greyColor,
      fontSize: regularFontSize,
    },
  },
  MultipleChoiceButton: {
    Touchable: {
      alignItems: 'center',
      justifyContent: 'center',
      height: win.height * 0.11,
      width: win.width * 0.24,
      margin: 20,
      borderRadius,
      ...shadow,
    },
    Text: {
      fontSize: RFValue(45),
    },
  },
  //#2E66E7 original
  //#00529D darker blue
  //#9DCEFF lighter blue
  viewPlus: {
    height: 50,
    width: 50,
    margin: 5,
    backgroundColor: '#00529D',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 999,
    marginVertical: 10,
  },

  BackButton: {
    Touchable: {
      height: win.height * 0.04,
      marginTop: '12%',
      marginLeft: '3%',
      marginBottom: '5%',
      width: win.width * 0.07,
    },
    Image: {
      height: win.width * 0.06,
      width: win.width * 0.06,
    },
    underlayColor: 'transparent',
  },
  buttonProfile: {
    ...Platform.select({
      ios: {
        Touchable: {
          ...shadow,
          margin: win.height * 0.01,
          alignItems: 'center',
          backgroundColor: pinkColor,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
          borderRadius,
        },
        Text: {
          color: 'white',
          fontSize: regularFontSize,
          fontWeight: 'normal',
        },
        underlayColor: blueColor,
      },
      android: {
        Touchable: {
          ...shadow,
          margin: win.height * 0.01,
          margin: win.width * 0.03,
          alignItems: 'center',
          backgroundColor: pinkColor,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 30,
          paddingRight: 30,
          borderRadius,
        },
        Text: {
          color: 'white',
          fontSize: regularFontSize - 5,
          fontWeight: 'normal',
          textAlign: 'center',
        },
        underlayColor: blueColor,
      },
    }),
  },
  TextInputAppointment: {
    View: {
      ...shadow,
      height: win.height * 0.09,
      width: win.width * 0.8,
      margin: 9,
      borderColor: 'white',
      borderWidth: 0.5,
      borderRadius,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    TextInput: {
      fontSize: regularFontSize,
      fontWeight: 'bold', // add new line text input font weight to make text more visible and darker
      textAlign: 'center',
    },
  },
  TextInputImmunization: {
    ...shadow,
    height: win.height * 0.2,
    width: win.width * 0.8,
    margin: 9,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius,
    justifyContent: 'center',
    backgroundColor: 'white',
    fontSize: regularFontSize,
    textAlign: 'center',
  },
  Dropdown: {
    backgroundColor: 'white',
    ...shadow,
    borderColor: greyColor,
    borderRadius: 5,
    width: '42%',
    bottom: 5,
  },
  Picker: {
    backgroundColor: 'white',
    ...shadow,
    borderColor: greyColor,
    borderRadius: 15,
  },

  Icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
};

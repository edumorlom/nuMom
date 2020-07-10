import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import appStyles, { borderRadius, shadow } from "./AppStyles";
import { Feather } from "@expo/vector-icons";
import translate from "app/Components/getLocalizedText";

function ReferenceInfo(props) {
    const { name, phone, email, specialities } = props.references?.val();

    AsyncAlert = () => {
      return new Promise((resolve, reject) => {
        Alert.alert(
          translate("RemoveReference"),
          translate("WantToRemoveReference"),
          [
            { text: translate("Yes"), onPress: () => resolve(true) },
            { text: translate("No"), onPress: () => resolve(false) },
          ],
          { cancelable: false }
        );
      });
    };
   

  return (
    <TouchableHighlight
      style={{
        margin: 15,
        paddingLeft: 10,
        justifyContent: "center",
        backgroundColor: "white",
        ...shadow,
        width: appStyles.win.width * 0.95,
        borderRadius: borderRadius,
      }}
      underlayColor={appStyles.underlayColor}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <View>
        <View style={{position: "absolute", top: 20 }}>
          <Image source={{uri:`https://ui-avatars.com/api/?name=${name}?rounded=true`}}
                  style={styles.iconStyle} />
        </View>
            <View style={{marginHorizontal: 65}}>
              <Text style={styles.TextName}>Name: {name}</Text>
              <Text style={styles.TextInfo}>Specialties:</Text>
              <Text style={styles.TextInfo}>{specialities}</Text>
              <Text style={styles.TextInfo}>Phone: {phone}</Text>
              <Text style={styles.TextInfo}>Email:</Text>
              <Text style={styles.TextInfo}>{email}</Text>
            </View>
        </View>
        <TouchableHighlight
          underlayColor='transparent'
          onPress={() => {
            AsyncAlert().then((response) => {
              response ? props.removeReference(props.references?.key) : null;
            });
          }}
        >
          <Feather name='trash' size={40} color='#eb1800' style={{ position: 'absolute', right: 15, bottom: -20}} />
        </TouchableHighlight>
      </View>
    </TouchableHighlight>
  );
}

export default ReferenceInfo;

const styles = StyleSheet.create({
    TextName: {
        fontWeight: "700",
        fontSize: appStyles.regularFontSize,
        color: appStyles.blueColor
        
    },
    TextInfo: {
      color: appStyles.greyColor,
      fontWeight: "500",
      fontSize: appStyles.regularFontSize - 4,
     
    },
    iconStyle: {
      width: 60,
      height: 60,
      borderRadius: 100,
      top: 20,
      right: 10
      

    }
});
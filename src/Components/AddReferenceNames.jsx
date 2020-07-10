import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import appStyles from "./AppStyles";
import translate from "app/Components/getLocalizedText";
import Button from "./Button";
import { useState } from 'react';


function AddReferenceNames(props) {
    const [name, setName ] = useState(null);
    const [phone, setPhone ] = useState(null);
    const [email, setEmail ] = useState(null);
    const [specialities, setSpecialities ] = useState(null);


    // ReferenceInfo = {
    //     name: name,
    //     phone: phone,
    //     email: email
    //   };

    onPress = async () => {
        if (!name || !phone || email) {
          alert(translate("fillOutAllFields"));
        } else {
        //   await SynchronizeCalendar();
        //   await addAppointment(uid, appointmentInfo);
          props.setLowerPanelContent("ReferenceNames");
        }
      };

    return (
        <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          maxWidth: "100%",
        }}
        scrollEnabled
      >
        <View style={appStyles.TextInput.View}>
          <TextInput
            placeholder={translate("referenceName")}
            onChangeText={setName}
            value={name}
            style={appStyles.TextInput.TextInput}
          />
        </View>
        <View style={appStyles.TextInput.View}>
          <TextInput
            placeholder={translate("MedicalSpecialities")}
            onChangeText={setSpecialities}
            value={specialities}
            style={appStyles.TextInput.TextInput}
          />
        </View>
        <View style={appStyles.TextInput.View}>
          <TextInput
            placeholder={translate("referencePhone")}
            onChangeText={setPhone}
            value={phone}
            style={appStyles.TextInput.TextInput}
          />
        </View>
        <View style={appStyles.TextInput.View}>
          <TextInput
            placeholder={translate("referenceEmail")}
            onChangeText={setEmail}
            value={email}
            style={appStyles.TextInput.TextInput}
          />
        </View>
        <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: appStyles.win.height * 0.05,
        }}
      >
        <Button
          style={appStyles.button}
          text={translate("save")}
          onPress={onPress}
        />
      </View>
      </KeyboardAwareScrollView>
    )
}

export default AddReferenceNames

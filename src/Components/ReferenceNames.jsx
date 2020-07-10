import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import appStyles, { shadow, borderRadius } from "./AppStyles";
import Plus from "../../assets/plus.png";
import ReferenceInfo from "./ReferenceInfo";

function ReferenceNames(props) {

  const Reference = [ //{ id: 0, name: "Alex", phone: "78656455577", email: "alex12@gmail.com", specialties: "Doctor" },
                      { id: 1, name: "Kevin", phone: "78657778577", email: "Kevin15@gmail.com", specialties: "Cardiologists"},
                      { id: 2, name: "Jorge", phone: "78655555555", email: "Jorge17@gmail.com", specialties: "Dermatologist" },
                      { id: 3, name: "Julia", phone: "78655555555", email: "Jorge17@gmail.com", specialties: "Endocrinologist"},
                      { id: 4, name: "Carmelo", phone: "78655555555", email: "Jorge17@gmail.com", specialties: "Neurologiest"}]
  return (
    <ScrollView
    contentContainerStyle={{ alignItems: "flex-end", maxWidth: "100%" }}
    showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={appStyles.viewPlusReference}
        onPress={() => {
          props.setLowerPanelContent("AddReferenceNames");
        }}
      >
        <Image source={Plus} style={{ height: 25, width: 25 }} />
      </TouchableOpacity>
      <View>
        {Reference.map(( references, index ) => {
          return(
            <ReferenceInfo key={index} references={references} />
          )
        })}
      </View>
    </ScrollView>
  );
}

export default ReferenceNames;

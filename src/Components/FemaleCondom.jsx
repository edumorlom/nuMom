import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import Menu from "./Menu";
import translate from "app/Components/getLocalizedText";
import FC from "../../assets/FemaleCondom.png"

export default function FemaleCondom(props) {

    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
        >

            <Text
                style={{
                    fontSize: appStyles.regularFontSize,
                }}>
                {translate("WhatIsFC")}</Text>
            <Menu
                title={"hi"}
            //info={translate()}
            />
        </ScrollView>
    );
}

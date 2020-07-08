import React, { useState, useEffect } from "react";
import { TouchableHighlight, Text, View, ScrollView, Image } from "react-native";
import appStyles from "./AppStyles";
import SelectionButton from "./SelectionButton";
import translate from "app/Components/getLocalizedText";
import FC from "../../assets/FemaleCondom.png"

export default function FemaleCondom(props) {

    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
        >
            <Image style={{ justifyContent: "center" }} source={FC}></Image>
            <Text
                style={{
                    fontSize: appStyles.regularFontSize,
                    justifyContent: "center"
                }}>
                {translate("WhatIsFC")}</Text>

            <SelectionButton
                style={appStyles.FCSelectionButton}
                text={translate("FCDoDont")}
                onPress={() => {
                    props.getNextScreen(1);
                }}
            />
            <SelectionButton
                style={appStyles.FCSelectionButton}
                text={translate("FCHowTo")}
                onPress={() => {
                    props.getNextScreen(2);
                }}
            />
        </ScrollView>
    );
}
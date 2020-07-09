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
            <Image style={{ justifyContent: "center", width: 300, height: 140 }} source={FC}></Image>
            <Text
                style={{
                    fontSize: appStyles.regularFontSize - 5,
                    justifyContent: "center",
                    paddingHorizontal: 20,
                    paddingBottom: 5,
                    paddingTop: 5
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
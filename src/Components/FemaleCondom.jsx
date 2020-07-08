import React, { useState, useEffect } from "react";
import { TouchableHighlight, Text, View, ScrollView, Image } from "react-native";
import appStyles from "./AppStyles";
import SelectionButton from "./SelectionButton";
import translate from "app/Components/getLocalizedText";
import FC from "../../assets/FemaleCondom.png"
import FCDoDont from "./FCDoDont"
import FCSteps from "./FCSteps"
import FCMain from "./FCMain"

export default function FemaleCondom(props) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < 0) {
            props.setLowerPanelContent("FCMain");
        }
    });


    let getNextScreen = (value) => {
        setIndex(value);
    };

    let screens = [
        <FCMain
            getNextScreen={getNextScreen}
        />,
        <FCDoDont
            getNextScreen={getNextScreen}
        />,
        <FCSteps
            getNextScreen={getNextScreen}
        />
    ];
    return (
        <ScrollView style={{ height: "100%" }}>
            {/* <SignUpHeader goBack= {goBack} male = {male} female = {female} index = {index}/> */}
            {screens[index]}
        </ScrollView>
    );
}

import React, { useState, useEffect } from "react";
import { TouchableHighlight, Text, View, ScrollView, Image } from "react-native";
import appStyles from "./AppStyles";
import SelectionButton from "./SelectionButton";
import translate from "app/Components/getLocalizedText";
import FC from "../../assets/FemaleCondom.png"
import FCDoDont from "./FCDoDont"
import FCSteps from "./FCSteps"
<<<<<<< HEAD
=======
import FCMain from "./FCMain"
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1

export default function FemaleCondom(props) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < 0) {
<<<<<<< HEAD
            props.setLowerPanelContent("FemaleCondom");
        }
    });

    let getNextScreen = () => {
        let currentIndex = index;

        if (currentIndex < screens.length - 1) {
            currentIndex++;
        }
        setIndex(currentIndex);
    };

    let goBack = () => {
        let currentIndex = index;

        if (currentIndex === 3) {
            currentIndex--;
        }
        currentIndex--;

        setIndex(currentIndex);
    };

    let screens = [
        <FCMain></FCMain>,
=======
            props.setLowerPanelContent("FCMain");
        }
    });

    /*let goBack = () => {
        if (index == 0) {
            props.setLowerPanelContent("learn")
        } else {
            setIndex(0);
        }
    };
    */

    let getNextScreen = (value) => {
        setIndex(value);
    };

    let screens = [
        <FCMain
            getNextScreen={getNextScreen}
        />,
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
        <FCDoDont
            getNextScreen={getNextScreen}
        />,
        <FCSteps
            getNextScreen={getNextScreen}
        />
    ];
    return (
<<<<<<< HEAD
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
                    props.getNextScreen();
                }}
            />
            <SelectionButton
                style={appStyles.FCSelectionButton}
                text={translate("FCHowTo")}
                onPress={() => {
                    props.getNextScreen();
                }}
            />
=======
        <ScrollView style={{ height: "100%" }}>
            {screens[index]}
>>>>>>> 7de06b158b4696b0c2ca9c5a46ddc6b57dec0ad1
        </ScrollView>
    );
}

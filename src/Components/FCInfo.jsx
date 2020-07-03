import React from "react";
import { TouchableHighlight, Text, View, ScrollView } from "react-native";
import appStyles from "./AppStyles";
import Menu from "./Menu";
import STD from "./STD";
import translate from "app/Components/getLocalizedText";

export default function FemaleCondom(props) {

    return (
        <ScrollView
            contentContainerStyle={{ alignItems: "center", maxWidth: "100%" }}
        >
            <Menu
                title={translate()}
                info={translate()}
            />
        </ScrollView>
    );
}
